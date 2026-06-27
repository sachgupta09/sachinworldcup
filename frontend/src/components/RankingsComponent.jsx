import React, { useState, useEffect } from 'react';
import { fetchRankings } from '../api';
import '../styles/Rankings.css';

export default function RankingsComponent() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      setLoading(true);
      const data = await fetchRankings();
      setRankings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load rankings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading rankings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="rankings-container">
      <h2>📊 Power Rankings</h2>
      <p className="rankings-subtitle">Form 35% · Squad Strength 30% · Attack 20% · Defence 15%</p>

      <div className="rankings-list">
        {rankings.map((team, index) => (
          <div key={team.rank} className="ranking-item">
            <div className="rank-badge">{team.rank}</div>
            <div className="rank-info">
              <h3>{team.team}</h3>
              <div className="rank-bar">
                <div
                  className="rank-fill"
                  style={{ width: `${team.rating}%` }}
                ></div>
              </div>
            </div>
            <div className="rank-score">{team.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
