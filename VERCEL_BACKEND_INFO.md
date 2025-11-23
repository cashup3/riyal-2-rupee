# Backend on Vercel - What Works & Limitations

## ✅ What Works:

1. **API Endpoints** - `/api/rates` works perfectly
2. **Frontend Integration** - Website can fetch rates from API
3. **Telegram Bot via Webhook** - Works but needs webhook setup

## ⚠️ Limitations:

### 1. **File Storage is Temporary**
- Vercel serverless functions use `/tmp` which is **ephemeral**
- Data stored in files will be **lost** when the function "cold starts"
- **Solution**: Use in-memory cache (works for short periods) or a database

### 2. **Telegram Bot Polling Doesn't Work**
- Vercel functions are **stateless** and **short-lived**
- Polling requires a **persistent connection** (not possible on Vercel)
- **Solution**: Use **webhooks** instead (I've configured this)

### 3. **State Management**
- Each function invocation is independent
- In-memory variables reset on cold starts
- **Solution**: Use external storage (database, Redis, etc.)

## 🔧 Current Implementation:

The backend I created uses:
- ✅ **In-memory cache** for rates (works between requests)
- ✅ **Webhook-based** Telegram bot (no polling)
- ✅ **File fallback** (tries to persist, but may fail)

## 📊 Better Solutions for Production:

### Option 1: Use Vercel KV (Redis)
```javascript
// Store rates in Vercel KV (persistent)
import { kv } from '@vercel/kv';
await kv.set('rates', rates);
const rates = await kv.get('rates');
```

### Option 2: Use a Database
- **MongoDB Atlas** (free tier available)
- **Supabase** (PostgreSQL, free tier)
- **PlanetScale** (MySQL, free tier)

### Option 3: Use External API
- Store rates in a separate service
- Use a database service that persists data

## 🚀 For Now:

The current setup **will work** for:
- ✅ Getting rates via API
- ✅ Updating rates via Telegram (if webhook is set)
- ⚠️ Rates may reset on cold starts (but defaults will load)

## 📝 To Make It Fully Persistent:

1. **Add Vercel KV** (easiest):
   ```bash
   npm install @vercel/kv
   ```
   Then update `api/index.js` to use KV instead of files

2. **Or use a free database** like MongoDB Atlas or Supabase

Would you like me to update the code to use Vercel KV or a database for persistent storage?


