// Telegram webhook endpoint - /api/webhook
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs').promises;
const path = require('path');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const RATES_FILE = path.join('/tmp', 'exchange-rates.json');

const defaultRates = {
    AED: { TOM: 11500, PKR: 76.25, CNY: 1.98, EUR: 0.25 },
    TOM: { AED: 0.000087, PKR: 0.0066, CNY: 0.00017, EUR: 0.000022 },
    PKR: { AED: 0.013, TOM: 151, CNY: 0.026, EUR: 0.0033 },
    CNY: { AED: 0.51, TOM: 5865, PKR: 38.46, EUR: 0.13 },
    EUR: { AED: 4.0, TOM: 46000, PKR: 303.05, CNY: 7.88 }
};

let bot = null;
let adminChatIds = new Set();
let ratesCache = null;

if (TELEGRAM_BOT_TOKEN) {
    bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    ratesCache = { ...defaultRates };
}

async function loadRates() {
    if (ratesCache) return ratesCache;
    try {
        const data = await fs.readFile(RATES_FILE, 'utf8');
        ratesCache = JSON.parse(data);
        return ratesCache;
    } catch (error) {
        ratesCache = { ...defaultRates };
        return ratesCache;
    }
}

async function saveRates(rates) {
    ratesCache = { ...rates };
    try {
        await fs.writeFile(RATES_FILE, JSON.stringify(rates, null, 2), 'utf8');
    } catch (error) {
        console.log('File write failed, using cache');
    }
}

// Initialize bot commands
if (bot) {
    bot.onText(/\/start/, async (msg) => {
        await bot.sendMessage(msg.chat.id, 
            `🤖 Welcome to Riyal 2 Rupee Exchange Rate Bot!\n\n` +
            `Commands:\n` +
            `/rates - View current exchange rates\n` +
            `/setrate FROM TO VALUE - Update exchange rate\n` +
            `Example: /setrate AED EUR 0.25\n\n` +
            `/admin - Get admin access (first user only)`
        );
    });

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
            return bot.sendMessage(chatId, '❌ Invalid rate value.');
        }
        try {
            const rates = await loadRates();
            if (!rates[from]) rates[from] = {};
            rates[from][to] = value;
            await saveRates(rates);
            await bot.sendMessage(chatId, `✅ Rate updated!\n1 ${from} = ${value} ${to}`);
        } catch (error) {
            await bot.sendMessage(chatId, `❌ Error: ${error.message}`);
        }
    });

    bot.onText(/\/admin/, async (msg) => {
        const chatId = msg.chat.id;
        if (adminChatIds.size === 0) {
            adminChatIds.add(chatId);
            await bot.sendMessage(chatId, '✅ You are now an admin!');
        } else if (adminChatIds.has(chatId)) {
            await bot.sendMessage(chatId, '✅ You already have admin access.');
        } else {
            await bot.sendMessage(chatId, '❌ Admin access is already assigned.');
        }
    });

    bot.onText(/\/help/, async (msg) => {
        await bot.sendMessage(msg.chat.id,
            `📖 Bot Commands:\n\n` +
            `/start - Start the bot\n` +
            `/rates - View all exchange rates\n` +
            `/setrate FROM TO VALUE - Update exchange rate\n` +
            `/admin - Get admin access\n` +
            `/help - Show this help message`
        );
    });
}

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    if (!bot) {
        return res.status(503).json({ error: 'Bot not initialized' });
    }
    
    try {
        const update = req.body;
        if (update.message) {
            await bot.processUpdate(update);
        }
        res.sendStatus(200);
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

