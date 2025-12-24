# OdoWatch Website

This is the website for the OdoWatch iOS app, hosted on Firebase.

## Features

- **Home Page**: Brief summary of what the OdoWatch app does
- **Contact Form**: Submit issues that automatically create GitHub issues
- **Privacy Policy**: Complete privacy policy for the app

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project created

### Installation

1. Install dependencies for the web app:
```bash
cd web
npm install
```

2. Install dependencies for Firebase Functions:
```bash
cd ../functions
npm install
```

3. Build the web app:
```bash
cd ../web
npm run build
```

### Firebase Configuration

1. Login to Firebase:
```bash
firebase login
```

2. Initialize Firebase (if not already done):
```bash
firebase init
```

3. Update `.firebaserc` with your Firebase project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

4. Set GitHub credentials for the contact form:
```bash
firebase functions:config:set github.token="your-github-personal-access-token"
firebase functions:config:set github.repo="your-username/odowatch"
```

To get a GitHub personal access token:
- Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
- Generate a new token with `repo` scope
- Use this token in the command above

5. Deploy Firebase Functions first to get the function URL:
```bash
firebase deploy --only functions
```

6. Update the Functions URL in the web app:
   - After deploying, note the function URL from the output (e.g., `https://us-central1-PROJECT_ID.cloudfunctions.net/createIssue`)
   - Create a `.env` file in the `web/` directory:
   ```bash
   cd web
   cp .env.example .env
   ```
   - Edit `.env` and replace `your-project-id` with your actual Firebase project ID
   - Or update `web/src/config.js` directly with the correct URL

### Development

1. Start the development server:
```bash
cd web
npm run dev
```

2. For testing Firebase Functions locally:
```bash
cd functions
npm run serve
```

### Deployment

1. Build the web app:
```bash
cd web
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

Or deploy only hosting:
```bash
firebase deploy --only hosting
```

Or deploy only functions:
```bash
firebase deploy --only functions
```

## Project Structure

```
.
├── web/                 # React web application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── ...
│   └── package.json
├── functions/           # Firebase Cloud Functions
│   └── index.js        # GitHub issue creation function
├── public/             # Built static files (generated)
├── firebase.json       # Firebase configuration
└── .firebaserc        # Firebase project configuration
```

## Contact Form

The contact form creates GitHub issues automatically. Make sure to:
1. Set up the GitHub token and repository in Firebase Functions config
2. The repository should have issues enabled
3. The token needs `repo` scope to create issues

