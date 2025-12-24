// Vercel serverless function to create GitHub issues
// Load environment variables from .env.local for local development
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local if it exists (for local development)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const envPath = path.join(__dirname, '..', '.env.local');
    
    if (fs.existsSync(envPath)) {
      const envFile = fs.readFileSync(envPath, 'utf8');
      envFile.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            const value = match[2].trim();
            // Only set if not already set (don't override existing env vars)
            if (!process.env[key]) {
              process.env[key] = value;
            }
          }
        }
      });
      console.log('Loaded .env.local file');
    }
  } catch (error) {
    console.log('Could not load .env.local:', error.message);
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Get GitHub token and repository from environment variables
    // Set these in Vercel dashboard: Settings > Environment Variables
    // For local dev, these should be in .env.local
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'your-username/odowatch';

    // Debug logging (remove in production)
    console.log('Environment check:', {
      hasToken: !!githubToken,
      tokenPrefix: githubToken ? githubToken.substring(0, 15) + '...' : 'none',
      githubRepo: githubRepo,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('GITHUB'))
    });

    if (!githubToken) {
      console.error('GitHub token not configured');
      res.status(500).json({ error: 'Server configuration error: GITHUB_TOKEN not found' });
      return;
    }

    if (githubRepo === 'your-username/odowatch') {
      console.error('GitHub repo not configured, using default');
      const isVercel = !!process.env.VERCEL;
      res.status(500).json({ 
        error: 'Server configuration error: GITHUB_REPO not set.',
        message: isVercel 
          ? 'Please set GITHUB_REPO in Vercel Dashboard > Settings > Environment Variables and redeploy.'
          : 'Please set GITHUB_REPO in .env.local file for local development.'
      });
      return;
    }

    // Format the issue body
    const issueBody = `**Contact Form Submission**

**From:** ${name} (${email})

**Subject:** ${subject}

**Message:**
${message}

---
*This issue was automatically created from the OdoWatch contact form.*`;

    // Determine authorization header format
    // Fine-grained tokens start with github_pat_ and use Bearer
    // Classic tokens use token
    const authHeader = githubToken.startsWith('github_pat_') 
      ? `Bearer ${githubToken}`
      : `token ${githubToken}`;

    // Prepare issue data (labels are optional - will fail silently if they don't exist)
    const issueData = {
      title: `[Contact] ${subject}`,
      body: issueBody
    };

    // Try to add labels, but don't fail if they don't exist
    // Labels will only be added if they exist in the repository
    try {
      // First, try to create the issue with labels
      const response = await fetch(
        `https://api.github.com/repos/${githubRepo}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'User-Agent': 'OdoWatch-Contact-Form'
          },
          body: JSON.stringify({
            ...issueData,
            labels: ['contact-form', 'user-feedback']
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // If error is about labels, try again without labels
        if (errorData.errors && errorData.errors.some(err => err.code === 'invalid')) {
          console.log('Labels not found, creating issue without labels');
          const retryResponse = await fetch(
            `https://api.github.com/repos/${githubRepo}/issues`,
            {
              method: 'POST',
              headers: {
                'Authorization': authHeader,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': 'OdoWatch-Contact-Form'
              },
              body: JSON.stringify(issueData)
            }
          );

          if (!retryResponse.ok) {
            const retryErrorData = await retryResponse.json().catch(() => ({}));
            throw new Error(retryErrorData.message || `GitHub API error: ${retryResponse.status} ${retryResponse.statusText}`);
          }

          const retryData = await retryResponse.json();
          res.status(200).json({
            success: true,
            issueUrl: retryData.html_url,
            issueNumber: retryData.number,
            note: 'Issue created without labels (labels may not exist in repository)'
          });
          return;
        }

        throw new Error(errorData.message || `GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      res.status(200).json({
        success: true,
        issueUrl: data.html_url,
        issueNumber: data.number
      });
    } catch (fetchError) {
      // Enhanced error logging
      console.error('Error details:', {
        message: fetchError.message,
        githubRepo,
        hasToken: !!githubToken,
        tokenPrefix: githubToken ? githubToken.substring(0, 10) + '...' : 'none'
      });
      throw fetchError;
    }
  } catch (error) {
    console.error('Error creating GitHub issue:', {
      message: error.message,
      stack: error.stack,
      githubRepo: process.env.GITHUB_REPO,
      hasToken: !!process.env.GITHUB_TOKEN
    });
    res.status(500).json({
      error: 'Failed to create issue',
      message: error.message || 'Unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

