import React, { useState, useEffect } from 'react';
import { fetchMatches } from '../api';
import '../styles/Matches.css';

export default function MatchesComponent() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      setLoading(true);
      const data = await fetchMatches();
      setMatches(data);
      setError(null);
    } catch (err) {
      setError('Failed to load matches');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading matches...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="matches-container">
      <h2>📅 Upcoming Matches</h2>
      <div className="matches-grid">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div key={match.id} className="match-card">
              <div className="match-header">
                <span className="group-badge">Group {match.group}</span>
                <span className="date">{new Date(match.date).toLocaleDateString()}</span>
              </div>
              <div className="match-teams">
                <div className="team">
                  <span className="team-name">{match.homeTeam}</span>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <span className="team-name">{match.awayTeam}</span>
                </div>
              </div>
              <div className="match-time">
                {new Date(match.date).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <div className="match-stadium">{match.stadium}</div>
              <div className={`match-status ${match.status}`}>{match.status}</div>
            </div>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </div>
  );
}
