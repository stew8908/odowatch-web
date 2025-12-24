# OdoWatch Website Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
# Install web app dependencies
cd web
npm install

# Install Firebase Functions dependencies
cd ../functions
npm install
```

### 2. Configure Firebase

1. Login to Firebase:
```bash
firebase login
```

2. Initialize Firebase (if not already done):
```bash
firebase init
```
   - Select: Hosting and Functions
   - Use existing project or create new one
   - For hosting: use `public` as public directory
   - For functions: use `functions` directory

3. Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

### 3. Configure GitHub Integration

1. Get a GitHub Personal Access Token:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Give it a name like "OdoWatch Contact Form"
   - Select scope: `repo` (full control of private repositories)
   - Generate and copy the token

2. Set Firebase Functions config:
```bash
firebase functions:config:set github.token="your-github-token-here"
firebase functions:config:set github.repo="your-username/odowatch"
```

   Replace:
   - `your-github-token-here` with your actual token
   - `your-username/odowatch` with your actual GitHub repository (e.g., `brandonroth/odowatch`)

### 4. Deploy Functions

Deploy the Cloud Function first to get its URL:
```bash
firebase deploy --only functions
```

After deployment, you'll see output like:
```
✔  functions[createIssue(us-central1)]: Successful create operation.
Function URL (createIssue): https://us-central1-PROJECT_ID.cloudfunctions.net/createIssue
```

### 5. Configure Web App

Update the Functions URL in the web app:

**Option 1: Using environment variable (recommended)**
1. Create `web/.env` file:
```bash
cd web
echo 'VITE_FUNCTIONS_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createIssue' > .env
```
   Replace `YOUR-PROJECT-ID` with your actual Firebase project ID.

**Option 2: Direct edit**
Edit `web/src/config.js` and replace `your-project-id` with your actual Firebase project ID.

### 6. Build and Deploy

1. Build the web app:
```bash
cd web
npm run build
```

2. Deploy everything:
```bash
cd ..
firebase deploy
```

Or deploy separately:
```bash
# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

## Development

### Run locally

1. Start the dev server:
```bash
cd web
npm run dev
```

2. Test functions locally (optional):
```bash
cd functions
npm run serve
```

Note: The contact form will only work in production or when testing with the emulator and proper configuration.

## Troubleshooting

### Contact form not working

1. Check that functions are deployed:
```bash
firebase functions:list
```

2. Verify the Functions URL in `web/src/config.js` matches your deployed function URL

3. Check Firebase Functions logs:
```bash
firebase functions:log
```

4. Verify GitHub token has `repo` scope and the repository name is correct

### Build errors

- Make sure all dependencies are installed in both `web/` and `functions/` directories
- Check Node.js version (should be 18+)

### GitHub issues not being created

- Verify the GitHub token is set correctly: `firebase functions:config:get`
- Check that issues are enabled in your GitHub repository
- Verify the repository name format is correct: `owner/repo-name`

