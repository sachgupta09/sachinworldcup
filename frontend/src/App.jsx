import React, { useState, useEffect } from 'react';
import './App.css';
import MatchesComponent from './components/MatchesComponent';
import StandingsComponent from './components/StandingsComponent';
import TeamsComponent from './components/TeamsComponent';
import NewsComponent from './components/NewsComponent';
import RankingsComponent from './components/RankingsComponent';

export default function App() {
  const [activeTab, setActiveTab] = useState('matches');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh data every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>⚽ WORLD CUP 2026</h1>
          <span className="subtitle">LIVE INTELLIGENCE</span>
        </div>
        <div className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </header>

      <nav className="navbar">
        <button
          className={`nav-btn ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button
          className={`nav-btn ${activeTab === 'standings' ? 'active' : ''}`}
          onClick={() => setActiveTab('standings')}
        >
          Standings
        </button>
        <button
          className={`nav-btn ${activeTab === 'rankings' ? 'active' : ''}`}
          onClick={() => setActiveTab('rankings')}
        >
          Rankings
        </button>
        <button
          className={`nav-btn ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          Teams
        </button>
        <button
          className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'matches' && <MatchesComponent key={lastUpdated} />}
        {activeTab === 'standings' && <StandingsComponent key={lastUpdated} />}
        {activeTab === 'rankings' && <RankingsComponent key={lastUpdated} />}
        {activeTab === 'teams' && <TeamsComponent key={lastUpdated} />}
        {activeTab === 'news' && <NewsComponent key={lastUpdated} />}
      </main>
    </div>
  );
}
