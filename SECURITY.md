# Security Guide - API Key Protection

## ✅ Current Security Measures

### 1. Environment Variables
- API key stored in `.env` file (NOT committed to git)
- `.env` is in `.gitignore` to prevent accidental commits
- Never hardcode API keys in source code

### 2. Rate Limiting
- **10 requests per 15 minutes** per IP address
- Prevents abuse and runaway costs
- Configured in `server.js` using `express-rate-limit`

### 3. Git Protection
- `.env` file is NOT tracked by git
- API key will never be pushed to GitHub

## 🔒 Additional Security Steps You Should Take

### A. Set Spending Limits in Anthropic Console
**Critical: Do this immediately to prevent unexpected charges**

1. Go to https://console.anthropic.com/settings/limits
2. Set a **monthly spending limit** (e.g., $10, $20, $50)
3. Enable **email alerts** at:
   - 50% of budget
   - 75% of budget
   - 90% of budget
4. Set **rate limits** (requests per minute)

### B. Monitor Your Usage
- Check https://console.anthropic.com/usage regularly
- Review API calls and costs weekly
- Set calendar reminders to review usage

### C. Production Deployment Security

If deploying to Vercel or other platforms:

1. **Add API key as environment variable in hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Never commit `.env` to production

2. **Add authentication** (if making public):
   ```javascript
   // Add to server.js before API routes
   const authMiddleware = (req, res, next) => {
     const token = req.headers.authorization;
     if (token !== process.env.APP_SECRET) {
       return res.status(401).json({ message: 'Unauthorized' });
     }
     next();
   };
   app.use('/api/', authMiddleware);
   ```

3. **Tighten CORS** (restrict to your domain):
   ```javascript
   // Replace: app.use(cors());
   app.use(cors({
     origin: 'https://yourdomain.com'
   }));
   ```

### D. Cost Prevention Checklist

- [ ] Set monthly spending limit in Anthropic Console
- [ ] Enable email alerts for budget thresholds
- [ ] Rate limiting enabled (10 requests per 15 min)
- [ ] API key in `.env` (not committed to git)
- [ ] Verify `.env` in `.gitignore`
- [ ] Never share your API key publicly
- [ ] Rotate API key if ever exposed
- [ ] Monitor usage weekly

## 📊 Cost Estimation

**Current Setup:**
- Model: `claude-sonnet-4-20250514`
- Average tokens per evaluation: ~1,000-1,500 tokens
- Approximate cost per evaluation: $0.01-0.02

**Rate Limit Math:**
- 10 requests per 15 min = max 40 requests/hour
- Max daily cost (if maxed out): ~$10-20
- **Setting a $20-50 monthly limit is recommended**

## 🚨 What to Do If API Key is Exposed

1. **Immediately rotate your key:**
   - Go to https://console.anthropic.com/settings/keys
   - Delete the exposed key
   - Create a new key
   - Update `.env` file with new key

2. **Check usage logs** for unauthorized usage

3. **Review your bill** in the Anthropic Console

## 🛡️ Best Practices

1. **Never commit `.env` to git** (already protected)
2. **Use different API keys** for dev/production
3. **Set budget alerts** in Anthropic Console
4. **Enable rate limiting** (already configured)
5. **Monitor usage regularly**
6. **Keep dependencies updated** for security patches

## Current Rate Limit Settings

**File: `server.js`**
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per 15 minutes per IP
  message: { message: 'Too many requests, please try again later.' }
});
```

**To adjust rate limits:** Edit the `max` value in `server.js`
- Development: 10-20 requests per 15 min
- Production: 5-10 requests per 15 min (tighter)

---

**Last Updated:** 2025-12-28
**Rate Limiting Added:** Yes (10 req/15min)
**Git Protection:** Yes (.env in .gitignore)
