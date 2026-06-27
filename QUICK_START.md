# ⚡ Quick Start (5 Minutes)

## Step 1: Get API Keys (2 min)

### Supabase (Required)
1. Go to https://supabase.com → Sign up
2. Create project → Go to Settings → API
3. Copy `Project URL` and `anon public` key

### NewsAPI (Optional)
1. Go to https://newsapi.org → Sign up
2. Copy API key from dashboard

## Step 2: Setup Environment (1 min)

```bash
# Create backend .env
cd backend
echo "PORT=3001" > .env
echo "SUPABASE_URL=paste_your_url_here" >> .env
echo "SUPABASE_KEY=paste_your_key_here" >> .env
echo "NEWS_API_KEY=paste_your_newsapi_key_here" >> .env
cd ..
```

## Step 3: Install & Run (2 min)

```bash
# Install all dependencies
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Run both servers
npm run dev
```

## Step 4: Open in Browser

Open http://localhost:3000 and enjoy! 🎉

---

## 🚀 Deploy to Vercel (1 click)

1. Push to GitHub:
```bash
git add .
git commit -m "Live World Cup Dashboard"
git push
```

2. Go to https://vercel.com → Import GitHub repo
3. Add env variables in Vercel settings
4. Click Deploy ✅

**Your site is now LIVE!**

---

## 📝 For Detailed Setup
See `SETUP_GUIDE.md`

## 💬 Need Help?
- Check SETUP_GUIDE.md troubleshooting section
- Verify all dependencies are installed
- Make sure .env files have correct values
