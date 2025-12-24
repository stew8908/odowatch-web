# Local Testing Guide

## Prerequisites

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel (optional, but recommended):
```bash
vercel login
```

## Setup

1. **Create local environment file:**
```bash
cp .env.local.example .env.local
```

2. **Edit `.env.local` and add your values:**
```bash
GITHUB_TOKEN=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
GITHUB_REPO=your-username/odowatch
```

Replace `your-username/odowatch` with your actual GitHub repository.

## Running Locally

### Option 1: Using Vercel Dev (Recommended)

This runs both the frontend and API functions together:

```bash
# From the root directory
vercel dev
```

This will:
- Start the Vite dev server for the frontend
- Start the API functions at `/api/*`
- Automatically load `.env.local` for environment variables
- Usually runs on `http://localhost:3000`

### Option 2: Separate Frontend and API

If you prefer to run them separately:

**Terminal 1 - Frontend:**
```bash
cd web
npm run dev
```
This runs on `http://localhost:5173` (or similar)

**Terminal 2 - API Functions:**
```bash
vercel dev
```
This runs the API on `http://localhost:3000`

Then update `web/src/config.js` to point to `http://localhost:3000/api/createIssue` for local testing.

## Testing the Contact Form

1. Make sure Vercel dev is running
2. Open your browser to the local URL (usually `http://localhost:3000`)
3. Navigate to the Contact page
4. Fill out the form and submit
5. Check:
   - Browser console for any errors
   - Terminal running `vercel dev` for API logs
   - Your GitHub repository for the new issue

## Troubleshooting

### API endpoint not found
- Make sure `vercel dev` is running
- Check that `api/createIssue.js` exists in the root directory
- Verify the URL in browser console matches `/api/createIssue`

### Environment variables not loading
- Make sure `.env.local` exists in the root directory
- Restart `vercel dev` after changing `.env.local`
- Check that variable names match exactly: `GITHUB_TOKEN` and `GITHUB_REPO`

### GitHub API errors
- Verify your token is correct in `.env.local`
- Check that `GITHUB_REPO` format is `username/repo-name`
- Make sure the token has the right permissions (Issues: Read and write for fine-grained tokens)
- Check the terminal logs for detailed error messages

### Port conflicts
If port 3000 is already in use:
```bash
vercel dev --listen 3001
```

## Quick Test Script

You can also test the API directly with curl:

```bash
curl -X POST http://localhost:3000/api/createIssue \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Issue",
    "message": "This is a test message"
  }'
```

