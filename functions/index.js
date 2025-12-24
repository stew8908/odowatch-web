const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// Cloud Function to create GitHub issue
exports.createIssue = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
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
    // Set these using: firebase functions:config:set github.token="your-token" github.repo="owner/repo"
    const githubToken = functions.config().github?.token;
    const githubRepo = functions.config().github?.repo || 'your-username/odowatch';

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

    // Create GitHub issue
    const response = await axios.post(
      `https://api.github.com/repos/${githubRepo}/issues`,
      {
        title: `[Contact] ${subject}`,
        body: issueBody,
        labels: ['contact-form', 'user-feedback']
      },
      {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      success: true,
      issueUrl: response.data.html_url,
      issueNumber: response.data.number
    });
  } catch (error) {
    console.error('Error creating GitHub issue:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to create issue',
      message: error.response?.data?.message || error.message
    });
  }
});

