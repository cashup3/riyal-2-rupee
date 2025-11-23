# Vercel Environment Variables Setup

## ⚠️ IMPORTANT: Telegram Bot Token Configuration

Your Telegram bot token **MUST** be set as an environment variable in Vercel for the bot to work.

## Step-by-Step Setup:

### 1. Go to Vercel Dashboard
1. Visit https://vercel.com
2. Sign in and go to your project: **riyal-2-rupee**

### 2. Add Environment Variable
1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar
3. Click **Add New**

### 3. Configure the Variable
- **Key**: `TELEGRAM_BOT_TOKEN`
- **Value**: `8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc`
- **Environment**: Select all three:
  - ✅ Production
  - ✅ Preview  
  - ✅ Development

### 4. Save and Redeploy
1. Click **Save**
2. Go to **Deployments** tab
3. Click the **⋯** (three dots) on the latest deployment
4. Click **Redeploy**

Or simply push a new commit to trigger auto-deployment.

## Verify Token is Set:

After redeploying, you can verify by:

1. **Check Vercel Function Logs:**
   - Go to your deployment
   - Click on **Functions** tab
   - Check if there are any errors about missing token

2. **Test the Webhook:**
   - Try sending `/start` to your bot
   - If it responds, the token is working!

## Current Token:

Your bot token is: `8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc`

⚠️ **Security Note**: This token is visible in the code for local development. For production, always use environment variables.

## Troubleshooting:

### Bot not responding?
1. ✅ Check environment variable is set in Vercel
2. ✅ Verify webhook is configured (see WEBHOOK_SETUP.md)
3. ✅ Check Vercel function logs for errors
4. ✅ Make sure you redeployed after setting the variable

### How to check if token is set:
Visit: `https://your-project.vercel.app/api/webhook-info`

If you see an error about "Bot not initialized", the token is missing.

