# Install Node.js

To run the Telegram bot server, you need to install Node.js first.

## Quick Install:

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the LTS (Long Term Support) version for Windows
   - Choose the Windows Installer (.msi) - 64-bit

2. **Install Node.js:**
   - Run the downloaded installer
   - Follow the installation wizard
   - Make sure to check "Add to PATH" option
   - Click "Install"

3. **Verify Installation:**
   - Open a NEW PowerShell window (important - close and reopen)
   - Run: `node --version`
   - Run: `npm --version`
   - Both should show version numbers

4. **After Installation:**
   - Close and reopen your terminal/PowerShell
   - Navigate to your project folder
   - Run: `npm install`
   - Run: `npm start`

## Alternative: Using Chocolatey (if you have it)

```powershell
choco install nodejs
```

## After Node.js is Installed:

1. Install dependencies:
   ```powershell
   npm install
   ```

2. Start the server:
   ```powershell
   npm start
   ```

3. The server will run on `http://localhost:3000`
4. Your Telegram bot will be active and ready to receive commands!

## Test Your Bot:

1. Open Telegram
2. Search for your bot (the username you gave it)
3. Send `/start` command
4. Send `/admin` to get admin access
5. Try updating a rate: `/setrate AED EUR 0.25`



