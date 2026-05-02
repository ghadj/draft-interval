# GitHub Pages Deployment Guide

## Prerequisites

1. A GitHub repository for this project
2. Push access to the repository
3. Repository set up with GitHub Pages enabled

## Setup Instructions

### Step 1: Initialize Git Repository

```bash
cd /Users/george/Desktop/draft-interval
git init
git add .
git commit -m "Initial commit: draft-interval scaffolding"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository named `draft-interval`
2. Do NOT initialize with README (we already have files)
3. Copy the repository URL (HTTPS or SSH)

### Step 3: Connect Local Repository to GitHub

```bash
git remote add origin <YOUR_GITHUB_REPO_URL>
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions" (recommended)
   - The workflow will deploy automatically on push to `main`
4. Save settings

### Step 5: Configure Repository (Optional)

For better security, you can restrict the Pages deployment:

1. Go to **Settings** → **Pages**
2. Under "GitHub Pages environment", restrict deployment to `github-pages` (already configured in workflow)

## Automated Deployment

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

✅ Triggers on push to `main` branch
✅ Installs dependencies
✅ Builds the Vite project
✅ Deploys to GitHub Pages

### Workflow Details

- **Trigger**: Pushes to `main` branch
- **Build**: Node.js 20 environment with npm cache
- **Output**: Artifact from `dist/` folder
- **Deployment**: GitHub Pages environment
- **URL**: `https://<username>.github.io/draft-interval/`

## Manual Deployment (Alternative)

If you prefer to manage deployment manually:

```bash
# Build the project
npm run build

# Deploy using GitHub CLI (if installed)
gh release create v1.0.0 dist/**
```

Or use any static hosting service:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3

## Testing Deployment Locally

Before pushing, test the production build:

```bash
npm run build
npm run preview
```

Then open: `http://localhost:4173/draft-interval/`

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Run `npm install` locally to verify
- Check workflow logs in GitHub Actions tab

### Page Not Found at Deployment URL
- Verify the repository name matches the `base` URL in `vite.config.js`
- Ensure `.nojekyll` file is present in the repository
- Check GitHub Pages settings (Source should be "GitHub Actions")

### Styles Not Loading
- The base URL in `vite.config.js` must match the repo name
- Current: `base: '/draft-interval/'`
- Update if repo name changes

### 404 on Routes
- This is a SPA (Single Page Application)
- Routes are handled by JavaScript
- GitHub Pages should automatically fall back to `index.html`

## Security Notes

- Repository is public (GitHub Pages requires this)
- No sensitive data should be committed
- Images are loaded from user's local filesystem (not uploaded)
- All processing happens in the browser

## File Structure for Deployment

```
.github/workflows/
├── deploy.yml              # GitHub Actions workflow

.nojekyll                    # Tells GitHub to skip Jekyll processing

vite.config.js              # Base URL for GitHub Pages: '/draft-interval/'

dist/                       # Built files (generated on build)
├── index.html
├── assets/
│   ├── *.js
│   └── *.css
```

## Deployment Status

You can monitor deployment status:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select the workflow run to see logs
4. Look for "Deploy to GitHub Pages" step status

## Environment Variables

If you need to add environment variables for production:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add any needed environment variables
3. Reference in `.github/workflows/deploy.yml` using `${{ secrets.VARIABLE_NAME }}`

## Future Enhancements

- [ ] Add custom domain support (CNAME file)
- [ ] Add PWA manifest for installable app
- [ ] Add auto-deployment on release tags
- [ ] Add staging environment for pull request previews
- [ ] Add performance monitoring

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `git push origin main` | Trigger automatic deployment |

---

**Deployment Ready**: Your app is configured and ready to deploy to GitHub Pages!
