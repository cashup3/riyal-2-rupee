// Vercel serverless function wrapper for the Telegram bot API
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File path for storing rates
const RATES_FILE = path.join('/tmp', 'exchange-rates.json');

// Default exchange rates
const defaultRates = {
    AED: { 
        TOM: 11500,
        PKR: 76.25,
        CNY: 1.98,
        EUR: 0.25
    },
    TOM: { 
        AED: 0.000087,
        PKR: 0.0066,
        CNY: 0.00017,
        EUR: 0.000022
    },
    PKR: { 
        AED: 0.013,
        TOM: 151,
        CNY: 0.026,
        EUR: 0.0033
    },
    CNY: { 
        AED: 0.51,
        TOM: 5865,
        PKR: 38.46,
        EUR: 0.13
    },
    EUR: { 
        AED: 4.0,
        TOM: 46000,
        PKR: 303.05,
        CNY: 7.88
    }
};

// Load rates from cache or file (for persistence across cold starts)
async function loadRates() {
    // If cache exists, use it
    if (ratesCache) {
        return ratesCache;
    }
    
    // Try to load from file (for persistence)
    try {
        const data = await fs.readFile(RATES_FILE, 'utf8');
        ratesCache = JSON.parse(data);
        return ratesCache;
    } catch (error) {
        // Use defaults and cache them
        ratesCache = { ...defaultRates };
        return ratesCache;
    }
}

// Save rates to cache and file
async function saveRates(rates) {
    // Update cache
    ratesCache = { ...rates };
    
    // Try to save to file (may fail on Vercel, but that's okay)
    try {
        await fs.writeFile(RATES_FILE, JSON.stringify(rates, null, 2), 'utf8');
    } catch (error) {
        // File write may fail on Vercel, but cache will work
        console.log('Note: File write failed (expected on Vercel), using in-memory cache');
    }
}

// Initialize Telegram Bot
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;
let adminChatIds = new Set();

// In-memory storage (will reset on cold start, but works for demo)
// For production, use a database like MongoDB, Supabase, or Vercel KV
let ratesCache = null;

if (TELEGRAM_BOT_TOKEN) {
    // Initialize bot without polling (webhook mode)
    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    
    // Initialize rates cache with defaults
    ratesCache = { ...defaultRates };
    
    console.log('Telegram bot initialized (webhook mode)');
}

// API Routes

// Get exchange rates
app.get('/api/rates', async (req, res) => {
    try {
        const rates = await loadRates();
        res.json({ success: true, rates });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update exchange rates
app.post('/api/rates', async (req, res) => {
    try {
        const { rates } = req.body;
        if (!rates) {
            return res.status(400).json({ success: false, error: 'Rates are required' });
        }
        await saveRates(rates);
        res.json({ success: true, message: 'Rates updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Telegram webhook endpoint
app.post('/api/webhook', async (req, res) => {
    if (!bot) {
        return res.status(503).json({ error: 'Bot not initialized' });
    }
    
    try {
        const update = req.body;
        
        // Handle webhook verification (Telegram sends this on setup)
        if (update.message) {
            await bot.processUpdate(update);
        }
        
        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

// Webhook info endpoint (to check webhook status)
app.get('/api/webhook-info', async (req, res) => {
    if (!bot || !TELEGRAM_BOT_TOKEN) {
        return res.status(503).json({ error: 'Bot not initialized' });
    }
    
    try {
        const info = await bot.getWebHookInfo();
        res.json({ success: true, webhook: info });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Set webhook endpoint (helper endpoint)
app.post('/api/set-webhook', async (req, res) => {
    if (!bot || !TELEGRAM_BOT_TOKEN) {
        return res.status(503).json({ error: 'Bot not initialized' });
    }
    
    try {
        const { url } = req.body;
        const webhookUrl = url || process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}/api/webhook`
            : req.headers.host 
                ? `https://${req.headers.host}/api/webhook`
                : null;
        
        if (!webhookUrl) {
            return res.status(400).json({ 
                error: 'Webhook URL is required. Provide it in the request body or set VERCEL_URL environment variable.' 
            });
        }
        
        const result = await bot.setWebHook(webhookUrl);
        res.json({ 
            success: true, 
            message: 'Webhook set successfully',
            url: webhookUrl,
            result 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Telegram Bot Commands Handler
if (bot) {
    // Command: /start
    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 
            `🤖 Welcome to Riyal 2 Rupee Exchange Rate Bot!\n\n` +
            `Commands:\n` +
            `/rates - View current exchange rates\n` +
            `/setrate FROM TO VALUE - Update exchange rate\n` +
            `Example: /setrate AED EUR 0.25\n\n` +
            `/admin - Get admin access (first user only)`
        );
    });

    // Command: /rates
    bot.onText(/\/rates/, async (msg) => {
        try {
            const rates = await loadRates();
            let message = '📊 Current Exchange Rates:\n\n';
            
            for (const [from, toRates] of Object.entries(rates)) {
                for (const [to, rate] of Object.entries(toRates)) {
                    message += `1 ${from} = ${rate} ${to}\n`;
                }
            }
            
            await bot.sendMessage(msg.chat.id, message);
        } catch (error) {
            await bot.sendMessage(msg.chat.id, `Error: ${error.message}`);
        }
    });

    // Command: /setrate
    bot.onText(/\/setrate (.+) (.+) (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        
        if (adminChatIds.size === 0) {
            adminChatIds.add(chatId);
            await bot.sendMessage(chatId, '✅ You are now an admin!');
        }
        
        if (!adminChatIds.has(chatId)) {
            return bot.sendMessage(chatId, '❌ You do not have permission to update rates.');
        }

        const from = match[1].toUpperCase();
        const to = match[2].toUpperCase();
        const value = parseFloat(match[3]);

        if (isNaN(value) || value <= 0) {
            return bot.sendMessage(chatId, '❌ Invalid rate value. Please provide a positive number.');
        }

        try {
            const rates = await loadRates();
            
            if (!rates[from]) {
                rates[from] = {};
            }
            
            rates[from][to] = value;
            await saveRates(rates);
            
            await bot.sendMessage(chatId, 
                `✅ Rate updated successfully!\n` +
                `1 ${from} = ${value} ${to}`
            );
        } catch (error) {
            await bot.sendMessage(chatId, `❌ Error: ${error.message}`);
        }
    });

    // Command: /admin
    bot.onText(/\/admin/, async (msg) => {
        const chatId = msg.chat.id;
        if (adminChatIds.size === 0) {
            adminChatIds.add(chatId);
            await bot.sendMessage(chatId, '✅ You are now an admin! You can update exchange rates.');
        } else if (adminChatIds.has(chatId)) {
            await bot.sendMessage(chatId, '✅ You already have admin access.');
        } else {
            await bot.sendMessage(chatId, '❌ Admin access is already assigned to another user.');
        }
    });

    // Command: /help
    bot.onText(/\/help/, async (msg) => {
        await bot.sendMessage(msg.chat.id,
            `📖 Bot Commands:\n\n` +
            `/start - Start the bot\n` +
            `/rates - View all exchange rates\n` +
            `/setrate FROM TO VALUE - Update exchange rate\n` +
            `Example: /setrate AED EUR 0.25\n` +
            `/admin - Get admin access\n` +
            `/help - Show this help message`
        );
    });
}

// Export for Vercel
module.exports = app;

