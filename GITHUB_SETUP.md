# Upload to GitHub - Instructions

Your code is ready to be pushed to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in:
   - **Repository name**: `riyal-2-rupee` (or any name you prefer)
   - **Description**: "Currency exchange website with Telegram bot integration"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```powershell
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/riyal-2-rupee.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```powershell
git remote add origin git@github.com:YOUR_USERNAME/riyal-2-rupee.git
git branch -M main
git push -u origin main
```

## Step 3: Update Git Config (Optional but Recommended)

Set your actual name and email:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Important Notes:

- ✅ Your bot token is **NOT** included (server.js is in .gitignore)
- ✅ Use `server.js.example` as a template (it has placeholder token)
- ✅ Sensitive files are excluded via .gitignore
- ✅ All project files are committed and ready

## After Pushing:

Your repository will be live at:
`https://github.com/YOUR_USERNAME/riyal-2-rupee`

You can share this link, and others can clone and use your project!

