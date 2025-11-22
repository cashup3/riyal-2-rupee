# Setup script for Riyal 2 Rupee
Write-Host "🚀 Setting up Riyal 2 Rupee..." -ForegroundColor Green

# Check if Node.js is installed
Write-Host "`n📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Install dependencies
Write-Host "`n📥 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Check for Telegram bot token
Write-Host "`n🤖 Telegram Bot Setup:" -ForegroundColor Yellow
Write-Host "1. Open Telegram and search for @BotFather" -ForegroundColor Cyan
Write-Host "2. Send /newbot command" -ForegroundColor Cyan
Write-Host "3. Follow instructions to create your bot" -ForegroundColor Cyan
Write-Host "4. Copy the bot token you receive" -ForegroundColor Cyan
Write-Host "`nTo set the bot token, run:" -ForegroundColor Yellow
Write-Host '  $env:TELEGRAM_BOT_TOKEN="YOUR_BOT_TOKEN_HERE"' -ForegroundColor White
Write-Host "`nOr edit server.js and replace YOUR_BOT_TOKEN_HERE" -ForegroundColor Yellow

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`nTo start the server, run:" -ForegroundColor Yellow
Write-Host "  npm start" -ForegroundColor White
Write-Host "`nThe server will run on http://localhost:3000" -ForegroundColor Cyan
Write-Host "The website will be available at http://localhost:8000" -ForegroundColor Cyan



