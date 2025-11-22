# Riyal 2 Rupee - Currency Exchange Website

A currency exchange website with Telegram bot integration for updating exchange rates.

## Features

- 💱 Real-time currency exchange calculator
- 🤖 Telegram bot for updating rates
- 🌍 Multi-language support (English/Farsi)
- 📱 Responsive design
- 🔄 Auto-updating exchange rates

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the instructions to create your bot
4. Copy the bot token you receive

### 3. Configure Bot Token

**Option A: Environment Variable (Recommended)**
```bash
# Windows PowerShell
$env:TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"

# Windows CMD
set TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE

# Linux/Mac
export TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"
```

**Option B: Edit server.js**
Replace `YOUR_BOT_TOKEN_HERE` in server.js with your actual bot token.

### 4. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 5. Start the Frontend Server

In a separate terminal, start the frontend server (port 8000):

```bash
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

Or use any static file server on port 8000.

## Telegram Bot Commands

Once your bot is running, you can use these commands in Telegram:

- `/start` - Start the bot and see available commands
- `/rates` - View all current exchange rates
- `/setrate FROM TO VALUE` - Update an exchange rate
  - Example: `/setrate AED EUR 0.25`
- `/admin` - Get admin access (first user becomes admin)
- `/help` - Show help message

### Example Usage

```
/setrate AED EUR 0.25
/setrate EUR PKR 303.05
/setrate TOM AED 0.000087
```

## API Endpoints

### GET /api/rates
Get current exchange rates
```json
{
  "success": true,
  "rates": {
    "AED": {
      "EUR": 0.25,
      "PKR": 76.25
    }
  }
}
```

### POST /api/rates
Update exchange rates (requires admin access)
```json
{
  "rates": {
    "AED": {
      "EUR": 0.25
    }
  }
}
```

## File Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # Frontend JavaScript
├── server.js           # Backend server with Telegram bot
├── package.json        # Node.js dependencies
├── exchange-rates.json # Stored exchange rates (auto-generated)
└── README.md           # This file
```

## Notes

- Exchange rates are stored in `exchange-rates.json`
- The first user to use `/admin` command becomes the admin
- Rates are automatically fetched by the frontend every 30 seconds
- The website will use default rates if the API is unavailable

## Troubleshooting

**Bot not responding?**
- Check that TELEGRAM_BOT_TOKEN is set correctly
- Make sure the server is running
- Verify your bot token is valid

**Rates not updating?**
- Check browser console for errors
- Verify API_URL in script.js matches your server URL
- Ensure server is running on port 3000

**Permission denied?**
- Only admin users can update rates
- Use `/admin` command to get admin access (first user only)



