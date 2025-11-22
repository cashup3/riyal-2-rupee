# Deploy to Vercel - Step by Step Guide

Your project is now configured for Vercel deployment! Follow these steps:

## Option 1: Deploy via Vercel CLI (Recommended)

### 1. Install Vercel CLI
```powershell
npm install -g vercel
```

### 2. Login to Vercel
```powershell
vercel login
```

### 3. Deploy
```powershell
cd C:\Users\pouya\.cursor
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **riyal-2-rupee** (or press Enter)
- Directory? **./** (press Enter)
- Override settings? **No**

### 4. Set Environment Variables
After deployment, set your Telegram bot token:

```powershell
vercel env add TELEGRAM_BOT_TOKEN
```

Enter your bot token when prompted.

Or via Vercel Dashboard:
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add: `TELEGRAM_BOT_TOKEN` = `your-bot-token-here`

### 5. Redeploy
```powershell
vercel --prod
```

## Option 2: Deploy via GitHub (Easier)

### 1. Push your code to GitHub (already done!)
Your code is at: https://github.com/cashup3/riyal-2-rupee

### 2. Import to Vercel
1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Import from GitHub: **cashup3/riyal-2-rupee**
4. Click **"Import"**

### 3. Configure Project
- **Framework Preset**: Other
- **Root Directory**: `./` (leave as is)
- **Build Command**: Leave empty (or `echo "No build needed"`)
- **Output Directory**: Leave empty

### 4. Add Environment Variable
- Click **"Environment Variables"**
- Add:
  - **Name**: `TELEGRAM_BOT_TOKEN`
  - **Value**: `8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc`
  - **Environment**: Production, Preview, Development (select all)

### 5. Deploy
Click **"Deploy"**

## Important Notes:

⚠️ **Telegram Bot on Vercel:**
- Vercel uses serverless functions (not persistent servers)
- Telegram bot polling won't work on Vercel
- You'll need to set up a webhook instead

### Setting up Telegram Webhook (After Deployment):

Once deployed, your API will be at: `https://your-project.vercel.app/api`

Set the webhook:
```powershell
# Replace YOUR_PROJECT_URL with your Vercel URL
curl -X POST "https://api.telegram.org/bot8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc/setWebhook?url=https://YOUR_PROJECT_URL.vercel.app/api/webhook"
```

Or use this in your browser:
```
https://api.telegram.org/bot8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc/setWebhook?url=https://YOUR_PROJECT_URL.vercel.app/api/webhook
```

## After Deployment:

✅ Your website will be live at: `https://your-project.vercel.app`
✅ API endpoint: `https://your-project.vercel.app/api/rates`
✅ Webhook: `https://your-project.vercel.app/api/webhook`

## Troubleshooting:

- **Bot not responding?** Make sure webhook is set correctly
- **Rates not updating?** Check environment variables are set
- **Build fails?** Make sure all dependencies are in package.json

