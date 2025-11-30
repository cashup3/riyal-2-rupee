// Individual API route for /api/rates
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const RATES_FILE = path.join('/tmp', 'exchange-rates.json');

const defaultRates = {
    AED: { TOM: 11500, PKR: 76.25, CNY: 1.98, EUR: 0.25 },
    TOM: { AED: 0.000087, PKR: 0.0025, CNY: 0.00017, EUR: 0.000022 },
    PKR: { AED: 0.013, TOM: 400, CNY: 0.026, EUR: 0.0033 },
    CNY: { AED: 0.51, TOM: 5865, PKR: 38.46, EUR: 0.13 },
    EUR: { AED: 4.0, TOM: 46000, PKR: 303.05, CNY: 7.88 }
};

let ratesCache = null;

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

// GET /api/rates
module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const rates = await loadRates();
            res.json({ success: true, rates });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else if (req.method === 'POST') {
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
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};



