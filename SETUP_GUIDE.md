# World Cup 2026 Live Dashboard - Setup Guide

## 🎯 Overview
A completely **FREE** World Cup 2026 dashboard with **LIVE DATA** from free APIs.

**Technology Stack:**
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: Supabase (Free tier - 500MB)
- APIs: ESPN (Free) + NewsAPI (Free tier)
- Hosting: Vercel (Free)
- **Total Cost: $0/month** ✅

---

## 📋 Prerequisites

1. **Node.js** (v16+) - [Download](https://nodejs.org/)
2. **Git** - [Download](https://git-scm.com/)
3. **Free Accounts:**
   - Supabase - [Sign up](https://supabase.com)
   - NewsAPI - [Sign up](https://newsapi.org) (optional, for news features)
   - Vercel - [Sign up](https://vercel.com)

---

## 🚀 Local Setup (Development)

### Step 1: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Setup Environment Variables

#### Backend (.env)
Create `backend/.env` (copy from `.env.example`):

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=3001
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
NEWS_API_KEY=your_newsapi_key_here
```

#### Get Your API Keys:

**📊 Supabase (Free Database):**
1. Go to [supabase.com](https://supabase.com) → Sign up
2. Create new project
3. Go to Settings → API → Copy `URL` and `anon public key`
4. Paste into `backend/.env`

**📰 NewsAPI (Optional - for news features):**
1. Go to [newsapi.org](https://newsapi.org) → Sign up
2. Get your free API key (100 requests/day)
3. Paste into `backend/.env`
4. **Note:** Without this, news feature shows placeholder message (still works!)

#### Frontend (.env)
Create `frontend/.env`:
```bash
cd frontend
cp .env.example .env
```

Leave as default unless you're using a different API URL.

### Step 3: Run Development Server

**Option A: Run Both Servers (Recommended)**
```bash
npm run dev
```
This runs:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

**Option B: Run Separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Step 4: Test Local Website

Open browser and go to: **http://localhost:3000**

You should see:
- ✅ Live matches from ESPN API
- ✅ Live standings
- ✅ Teams list
- ✅ Rankings
- ✅ News (if NewsAPI key configured)

---

## 🌐 Deploy to Vercel (FREE)

### Step 1: Push to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Initial commit: Live World Cup Dashboard"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click "New Project"
3. Select your GitHub repository
4. In Settings, add Environment Variables:
   - `SUPABASE_URL` = Your Supabase URL
   - `SUPABASE_KEY` = Your Supabase Key
   - `NEWS_API_KEY` = Your NewsAPI key (optional)
5. Click "Deploy"

**That's it!** Your site is now LIVE on Vercel's free tier! 🎉

---

## 📂 Project Structure

```
world-cup-website/
├── frontend/                 # React app (Vite)
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── MatchesComponent.jsx
│   │   │   ├── StandingsComponent.jsx
│   │   │   ├── TeamsComponent.jsx
│   │   │   ├── RankingsComponent.jsx
│   │   │   └── NewsComponent.jsx
│   │   ├── styles/          # Component CSS
│   │   ├── api.js           # API calls to backend
│   │   ├── App.jsx          # Main component
│   │   └── main.jsx         # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js API (Express)
│   ├── index.js             # Server + API routes
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example env file
│   └── package.json
│
├── vercel.json              # Deployment config
├── package.json             # Root package.json
├── .gitignore               # Git ignore rules
└── SETUP_GUIDE.md           # This file
```

---

## 🔄 How It Works

### Data Flow:
```
1. React Frontend (http://localhost:3000)
   ↓
2. Calls Backend API (http://localhost:3001/api/*)
   ↓
3. Backend fetches from free APIs:
   - ESPN API → Live matches, standings, teams
   - NewsAPI → Latest World Cup news
   ↓
4. Data returned to Frontend
   ↓
5. React components render live data
   ↓
6. Auto-refreshes every 60 seconds
```

### API Endpoints Available:

| Endpoint | Purpose |
|----------|---------|
| `GET /api/health` | Check if API is running |
| `GET /api/matches` | Get all matches with live scores |
| `GET /api/standings` | Get group standings |
| `GET /api/teams` | Get all 48 teams |
| `GET /api/rankings` | Get power rankings |
| `GET /api/news` | Get latest World Cup news |

---

## 🔧 Customization

### Change Refresh Rate:
Edit `frontend/src/App.jsx`:
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setLastUpdated(new Date());
  }, 60000); // Change 60000 to different milliseconds
  return () => clearInterval(interval);
}, []);
```

### Change Color Scheme:
Edit `frontend/src/App.css`:
```css
:root {
  --navy-dark: #111B1A;
  --navy: #303F30;
  --clay: #ADAE29;
  --mist: #90B3A1;
  --ivory: #C5DDCE;
  --dark-bg: #1a2620;
}
```

### Add More Data Sources:
Edit `backend/index.js` - add new API endpoints like:
- Player stats APIs
- Betting odds APIs
- Weather data for stadiums
- Social media sentiment

---

## ✅ Free Tier Limits

| Service | Free Tier | Limit |
|---------|-----------|-------|
| **Vercel** | Unlimited | 100GB bandwidth/month |
| **Supabase** | 500MB storage | Plenty for dashboard |
| **NewsAPI** | 100 requests/day | ~10 news articles/day |
| **ESPN API** | Unlimited | No auth needed |
| **GitHub** | Unlimited | Unlimited repos |

---

## 🚨 Troubleshooting

### "Cannot find module 'express'"
```bash
cd backend
npm install
```

### "API connection failed"
- Make sure backend is running on port 3001
- Check if `.env` variables are set correctly
- Verify Supabase URL is valid

### "NewsAPI returns empty"
- Verify your NewsAPI key is correct
- Check if you've exceeded 100 requests/day limit
- Optional feature - dashboard works fine without it

### Port 3000 or 3001 already in use
```bash
# Find and kill process on port 3001 (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

---

## 📈 Next Steps (Optional Enhancements)

Future improvements you can add (all still free):

1. **Add more data:**
   - Player statistics
   - Historical data
   - Betting odds

2. **Improve UI:**
   - Dark mode toggle
   - Mobile app (React Native)
   - Animations

3. **User features:**
   - Save favorites
   - Create custom predictions
   - Fantasy league

4. **Social features:**
   - Share predictions
   - Live chat
   - User rankings

---

## 📞 Support Resources

- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

## 📜 License

Open source - feel free to modify and deploy!

---

**🎉 Congratulations! You now have a live World Cup dashboard with zero cost!**

Questions? Feel free to modify and experiment!
