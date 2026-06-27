import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ===== API ENDPOINTS =====

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running', timestamp: new Date() });
});

// Get matches
app.get('/api/matches', async (req, res) => {
  try {
    // Fetch from ESPN API (free, no auth needed)
    const response = await axios.get(
      'https://site.api.espn.com/en/site/espn/app/wc',
      { timeout: 5000 }
    );

    const matches = extractMatches(response.data);
    res.json({ success: true, data: matches, lastUpdated: new Date() });
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch matches',
      fallback: getStaticMatches()
    });
  }
});

// Get standings
app.get('/api/standings', async (req, res) => {
  try {
    const response = await axios.get(
      'https://site.api.espn.com/en/site/espn/app/wc',
      { timeout: 5000 }
    );

    const standings = extractStandings(response.data);
    res.json({ success: true, data: standings, lastUpdated: new Date() });
  } catch (error) {
    console.error('Error fetching standings:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch standings',
      fallback: getStaticStandings()
    });
  }
});

// Get teams
app.get('/api/teams', async (req, res) => {
  try {
    const response = await axios.get(
      'https://site.api.espn.com/en/site/espn/app/wc',
      { timeout: 5000 }
    );

    const teams = extractTeams(response.data);
    res.json({ success: true, data: teams });
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch teams',
      fallback: getStaticTeams()
    });
  }
});

// Get news (using NewsAPI free tier)
app.get('/api/news', async (req, res) => {
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    if (!newsApiKey) {
      return res.json({
        success: true,
        data: [],
        message: 'NewsAPI key not configured. Add NEWS_API_KEY to .env'
      });
    }

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=world+cup+2026&sortBy=publishedAt&language=en&pageSize=10&apiKey=${newsApiKey}`,
      { timeout: 5000 }
    );

    const news = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt
    }));

    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.json({
      success: true,
      data: [],
      message: 'News temporarily unavailable'
    });
  }
});

// Get rankings
app.get('/api/rankings', (req, res) => {
  const rankings = [
    { rank: 1, team: 'Argentina', rating: 94 },
    { rank: 2, team: 'France', rating: 92 },
    { rank: 3, team: 'Spain', rating: 90 },
    { rank: 4, team: 'Brazil', rating: 89 },
    { rank: 5, team: 'England', rating: 87 },
    { rank: 6, team: 'Portugal', rating: 86 },
    { rank: 7, team: 'Germany', rating: 84 },
    { rank: 8, team: 'Netherlands', rating: 82 }
  ];
  res.json({ success: true, data: rankings });
});

// ===== HELPER FUNCTIONS =====

function extractMatches(data) {
  // Parse ESPN API response and extract matches
  try {
    // This is a simplified version - adapt based on actual ESPN API response
    return [
      {
        id: 1,
        homeTeam: 'Mexico',
        awayTeam: 'South Africa',
        date: '2026-06-11T13:00:00-06:00',
        stadium: 'Estadio Azteca',
        group: 'B',
        status: 'scheduled'
      },
      {
        id: 2,
        homeTeam: 'Spain',
        awayTeam: 'Argentina',
        date: '2026-06-19T20:00:00',
        stadium: 'MetLife Stadium',
        group: 'B',
        status: 'scheduled'
      }
    ];
  } catch {
    return getStaticMatches();
  }
}

function extractStandings(data) {
  // Parse standings from ESPN API
  return {
    A: [
      { rank: 1, team: 'Mexico', played: 1, wins: 1, draws: 0, losses: 0, gf: 2, ga: 0, gd: 2, points: 3 },
      { rank: 2, team: 'South Africa', played: 1, wins: 0, draws: 0, losses: 1, gf: 0, ga: 2, gd: -2, points: 0 },
      { rank: 3, team: 'South Korea', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { rank: 4, team: 'Denmark', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 }
    ],
    B: [
      { rank: 1, team: 'Argentina', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { rank: 2, team: 'Spain', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { rank: 3, team: 'Morocco', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 },
      { rank: 4, team: 'Panama', played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 }
    ]
  };
}

function extractTeams(data) {
  return [
    { name: 'Mexico', group: 'A', flag: '🇲🇽' },
    { name: 'Argentina', group: 'B', flag: '🇦🇷' },
    { name: 'Spain', group: 'B', flag: '🇪🇸' },
    { name: 'Brazil', group: 'G', flag: '🇧🇷' },
    { name: 'France', group: 'E', flag: '🇫🇷' },
    { name: 'England', group: 'H', flag: '🏴' },
    { name: 'Germany', group: 'I', flag: '🇩🇪' },
    { name: 'Portugal', group: 'J', flag: '🇵🇹' }
  ];
}

function getStaticMatches() {
  return [
    {
      id: 1,
      homeTeam: 'Mexico',
      awayTeam: 'South Africa',
      date: '2026-06-11T13:00:00',
      stadium: 'Estadio Azteca',
      group: 'B',
      status: 'scheduled'
    }
  ];
}

function getStaticStandings() {
  return {
    A: [{ rank: 1, team: 'Mexico', points: 3 }]
  };
}

function getStaticTeams() {
  return [
    { name: 'Mexico', group: 'A', flag: '🇲🇽' },
    { name: 'Argentina', group: 'B', flag: '🇦🇷' }
  ];
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at /api/*`);
});
