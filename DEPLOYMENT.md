# GitHub Pages Deployment Guide

This application is configured to deploy to GitHub Pages using GitHub Actions.

## Prerequisites

- A GitHub account
- A GitHub repository for this project

## Setup Steps

### 1. Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Codesmotech Offer Letter Generator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 3. Deploy

The deployment will happen automatically when you push to the `main` branch.

To manually trigger a deployment:
1. Go to the **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### 4. Access Your Application

After successful deployment, your application will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Local Testing

To test the production build locally:

```bash
# Build the static site
npx vite build

# Preview the build
npx vite preview
```

## Configuration

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is pre-configured to:
- Build on every push to `main` branch
- Automatically set the correct base path for your repository
- Deploy to GitHub Pages

## Troubleshooting

### Build Fails

- Check the **Actions** tab for detailed error logs
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility (uses Node 20)

### 404 Errors

- Ensure GitHub Pages is set to use **GitHub Actions** as the source
- Wait a few minutes after deployment for changes to propagate
- Check the repository name matches the base path

### Assets Not Loading

- The workflow automatically configures the base path
- Ensure you're using the correct repository URL

## Features

This is a completely static application with:
- ✅ No backend required
- ✅ Client-side PDF generation
- ✅ Form validation and state management
- ✅ Signature capture with touchscreen support
- ✅ Responsive design
- ✅ Works 100% offline after initial load

## Updating

To update the deployed application:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

The GitHub Actions workflow will automatically rebuild and redeploy.
