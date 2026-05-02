#!/bin/bash

# GitHub Setup Script for draft-interval
# This script helps initialize the Git repository and push to GitHub

set -e

echo "🚀 Draft-Interval GitHub Setup"
echo "================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if node_modules exist
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Ask for GitHub repository URL
echo ""
echo "📝 Enter your GitHub repository URL"
echo "   Example: https://github.com/username/draft-interval.git"
read -p "Repository URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ Repository URL cannot be empty"
    exit 1
fi

# Add files to git
echo ""
echo "📦 Adding files to git..."
git add .
git commit -m "Initial commit: draft-interval - minimal gesture study tool" 2>/dev/null || echo "⚠️  Nothing new to commit"

# Add remote
echo "🔗 Setting up remote origin..."
git remote remove origin 2>/dev/null || true
git remote add origin "$repo_url"

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main 2>/dev/null || true

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Go to: $repo_url/settings/pages"
echo "   2. Select 'GitHub Actions' as the source"
echo "   3. Wait for the first deployment to complete"
echo "   4. Your site will be available at: https://$(echo $repo_url | sed 's/.*\///' | sed 's/\.git$//').github.io/draft-interval/"
echo ""
echo "💡 To make future changes:"
echo "   git add ."
echo "   git commit -m 'Your message'"
echo "   git push origin main"
echo ""
