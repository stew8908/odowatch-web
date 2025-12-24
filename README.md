# OdoWatch Website

This is the website for the OdoWatch iOS app, hosted on Vercel.

## Features

- **Home Page**: Brief summary of what the OdoWatch app does
- **Contact Form**: Submit issues that automatically create GitHub issues
- **Privacy Policy**: Complete privacy policy for the app

## Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Vercel account (free tier available)
- GitHub account with a personal access token

### Installation

1. Install dependencies for the web app:
```bash
cd web
npm install
```

2. Run the development server:
```bash
npm run dev
```

Or from the root directory:
```bash
yarn web
```

### Vercel Configuration

1. Install Vercel CLI (optional, for local development):
```bash
npm install -g vercel
```

2. Deploy to Vercel:
   - **Option A: Using Vercel Dashboard (Recommended)**
     - Go to [vercel.com](https://vercel.com)
     - Click "New Project"
     - Import your Git repository
     - Vercel will auto-detect the settings
     - Add environment variables (see below)
     - Deploy!

   - **Option B: Using Vercel CLI**
     ```bash
     vercel
     ```

3. Set Environment Variables in Vercel Dashboard:
   - Go to your project settings > Environment Variables
   - Add the following:
     - `GITHUB_TOKEN`: Your GitHub personal access token
     - `GITHUB_REPO`: Your repository in format `username/repo-name` (e.g., `brandonroth/odowatch`)

   To get a GitHub personal access token:
   - **Classic Token**: Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
     - Generate a new token with `repo` scope (required - there's no standalone "issues" scope)
   - **Fine-Grained Token**: Go to GitHub Settings > Developer settings > Personal access tokens
     - Generate new token (fine-grained)
     - Set repository permissions: Issues → Read and write
   - Copy the token and add it to Vercel environment variables

### Development

1. Start the development server:
```bash
cd web
npm run dev
```

2. For testing the API locally, use Vercel CLI:
```bash
vercel dev
```

This will start both the frontend and API functions locally.

### Deployment

The site will automatically deploy when you push to your connected Git repository. You can also deploy manually:

```bash
vercel --prod
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
├── api/                 # Vercel serverless functions
│   └── createIssue.js   # GitHub issue creation function
├── public/             # Built static files (generated)
├── vercel.json         # Vercel configuration
└── README.md
```

## Contact Form

The contact form creates GitHub issues automatically. Make sure to:
1. Set up the GitHub token and repository in Vercel environment variables
2. The repository should have issues enabled
3. The token needs `repo` scope to create issues

## Free Hosting with Vercel

Vercel offers a generous free tier that includes:
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Serverless functions (100GB-hours/month)
- Custom domains
- No credit card required

Perfect for hosting this website!
