// Vercel serverless function to create GitHub issues
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
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'your-username/odowatch';

    if (!githubToken) {
      console.error('GitHub token not configured');
      res.status(500).json({ error: 'Server configuration error' });
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

    // Create GitHub issue using fetch (Node.js 18+)
    const response = await fetch(
      `https://api.github.com/repos/${githubRepo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'OdoWatch-Contact-Form'
        },
        body: JSON.stringify({
          title: `[Contact] ${subject}`,
          body: issueBody,
          labels: ['contact-form', 'user-feedback']
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json({
      success: true,
      issueUrl: data.html_url,
      issueNumber: data.number
    });
  } catch (error) {
    console.error('Error creating GitHub issue:', error.message);
    res.status(500).json({
      error: 'Failed to create issue',
      message: error.message
    });
  }
}

