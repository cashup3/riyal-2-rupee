# Telegram Webhook Setup Guide

## What is a Webhook?

A webhook allows Telegram to send bot updates directly to your server instead of polling. This is required for Vercel (serverless) deployments.

## Step 1: Deploy to Vercel

First, make sure your project is deployed on Vercel and you have your deployment URL.

Your URL will be something like: `https://riyal-2-rupee.vercel.app`

## Step 2: Set the Webhook

After deployment, you need to tell Telegram where to send updates.

### Option A: Using the API Endpoint (Easiest)

1. Go to your Vercel deployment URL
2. Visit: `https://YOUR_URL.vercel.app/api/set-webhook`
3. Or use curl:

```bash
curl -X POST "https://YOUR_URL.vercel.app/api/set-webhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://YOUR_URL.vercel.app/api/webhook"}'
```

### Option B: Direct Telegram API Call

Replace `YOUR_URL` with your Vercel URL and `YOUR_BOT_TOKEN` with your bot token:

```bash
curl -X POST "https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook?url=https://YOUR_URL.vercel.app/api/webhook"
```

Or visit this URL in your browser:
```
https://api.telegram.org/bot8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc/setWebhook?url=https://YOUR_URL.vercel.app/api/webhook
```

### Option C: Using PowerShell

```powershell
$url = "https://YOUR_URL.vercel.app/api/webhook"
$token = "8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc"
$webhookUrl = "https://api.telegram.org/bot$token/setWebhook?url=$url"

Invoke-WebRequest -Uri $webhookUrl -Method POST
```

## Step 3: Verify Webhook is Set

### Check via API Endpoint:
Visit: `https://YOUR_URL.vercel.app/api/webhook-info`

### Or use Telegram API:
```
https://api.telegram.org/bot8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc/getWebhookInfo
```

You should see:
```json
{
  "ok": true,
  "result": {
    "url": "https://YOUR_URL.vercel.app/api/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0
  }
}
```

## Step 4: Test Your Bot

1. Open Telegram
2. Find your bot
3. Send `/start`
4. The bot should respond!

## Troubleshooting

### Bot not responding?

1. **Check webhook is set:**
   - Visit `/api/webhook-info` endpoint
   - Make sure `url` matches your Vercel URL

2. **Check Vercel logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Check for any errors

3. **Verify environment variable:**
   - Make sure `TELEGRAM_BOT_TOKEN` is set in Vercel
   - Go to: Project Settings → Environment Variables

4. **Test webhook manually:**
   ```bash
   curl -X POST "https://YOUR_URL.vercel.app/api/webhook" \
     -H "Content-Type: application/json" \
     -d '{"message":{"chat":{"id":123},"text":"/start"}}'
   ```

### Webhook URL not working?

- Make sure your Vercel deployment is live
- Check that `/api/webhook` endpoint exists
- Verify HTTPS is enabled (Telegram requires HTTPS)

### Remove Webhook (if needed):

To switch back to polling (for local development):
```
https://api.telegram.org/bot8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc/deleteWebhook
```

## Quick Setup Script

After deploying to Vercel, replace `YOUR_URL` and run:

```powershell
$vercelUrl = "https://YOUR_URL.vercel.app"
$token = "8512770089:AAHzZsJiDjM8q2-g5JZDOcvZnOLAbicyEoc"
$webhookUrl = "$vercelUrl/api/webhook"
$setWebhook = "https://api.telegram.org/bot$token/setWebhook?url=$webhookUrl"

Write-Host "Setting webhook to: $webhookUrl" -ForegroundColor Yellow
$response = Invoke-WebRequest -Uri $setWebhook -Method POST
Write-Host "Response: $($response.Content)" -ForegroundColor Green
```

## After Setup

Once webhook is set:
- ✅ Bot will receive all updates via webhook
- ✅ You can use `/start`, `/rates`, `/setrate` commands
- ✅ Updates will appear in real-time
- ✅ No polling needed (saves resources)


