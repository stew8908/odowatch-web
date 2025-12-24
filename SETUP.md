# OdoWatch Website Setup Guide (Vercel)

## Quick Start

### 1. Install Dependencies

```bash
# Install web app dependencies
cd web
npm install
```

### 2. Get GitHub Personal Access Token

**Option A: Classic Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "OdoWatch Contact Form"
4. Select scope: **`repo`** (this is required to create issues - there's no standalone "issues" scope)
5. Generate and copy the token (you'll need it for Vercel)

**Option B: Fine-Grained Token (Beta)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" (fine-grained)
3. Give it a name like "OdoWatch Contact Form"
4. Select your repository
5. Under "Repository permissions", set **Issues** to **Read and write**
6. Generate and copy the token

### 3. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your Git repository (GitHub, GitLab, or Bitbucket)
4. Vercel will auto-detect:
   - Framework Preset: Vite
   - Root Directory: `web`
   - Build Command: `npm run build`
   - Output Directory: `public`
5. Click "Deploy"

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

Follow the prompts to link your project.

### 4. Configure Environment Variables

After deployment, configure the GitHub integration:

1. Go to your Vercel project dashboard
2. Navigate to: Settings > Environment Variables
3. Add the following variables:

   **GITHUB_TOKEN**
   - Value: Your GitHub personal access token (from step 2)
   - Environment: Production, Preview, Development (select all)

   **GITHUB_REPO**
   - Value: Your repository in format `username/repo-name`
   - Example: `brandonroth/odowatch`
   - Environment: Production, Preview, Development (select all)

4. Click "Save"
5. Redeploy your project for changes to take effect:
   - Go to Deployments tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

### 5. Verify Deployment

1. Visit your deployed site (Vercel will provide a URL like `your-project.vercel.app`)
2. Test the contact form
3. Check your GitHub repository - a new issue should be created!

## Development

### Run Locally

1. Start the dev server:
```bash
cd web
npm run dev
```

2. For testing API functions locally:
```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Run Vercel dev server (handles both frontend and API)
vercel dev
```

This will start:
- Frontend at `http://localhost:5173` (or similar)
- API functions at `http://localhost:3000/api/*`

### Build for Production

```bash
cd web
npm run build
```

The built files will be in `web/public/`

## Troubleshooting

### Contact form not working

1. **Check environment variables:**
   - Go to Vercel Dashboard > Settings > Environment Variables
   - Verify `GITHUB_TOKEN` and `GITHUB_REPO` are set
   - Make sure they're enabled for the correct environments

2. **Check Vercel Function logs:**
   - Go to Vercel Dashboard > Deployments
   - Click on a deployment
   - Go to "Functions" tab
   - Check logs for errors

3. **Verify GitHub token:**
   - Make sure the token has `repo` scope
   - Verify the token hasn't expired
   - Test the token manually with GitHub API

4. **Check repository name:**
   - Format should be: `username/repo-name`
   - Make sure issues are enabled in the repository
   - Verify the repository exists and is accessible

### Build errors

- Make sure all dependencies are installed: `cd web && npm install`
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf web/node_modules web/package-lock.json && npm install`

### API endpoint not found

- Make sure `api/createIssue.js` exists in the root directory
- Verify `vercel.json` configuration
- Check that the function is deployed (Vercel Dashboard > Functions)

## Custom Domain (Optional)

1. Go to Vercel Dashboard > Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

## Why Vercel?

- ✅ **Free tier** - Perfect for personal projects
- ✅ **Easy deployment** - Connect Git repo, auto-deploy on push
- ✅ **Serverless functions** - Handle API calls without managing servers
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Automatic HTTPS** - SSL certificates included
- ✅ **Great developer experience** - Simple setup, great docs

## Next Steps

- Customize the design in `web/src/`
- Update privacy policy content
- Add analytics (optional)
- Set up custom domain (optional)
