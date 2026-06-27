import React, { useState, useEffect } from 'react';
import { fetchTeams } from '../api';
import '../styles/Teams.css';

export default function TeamsComponent() {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTeams();
  }, []);

  useEffect(() => {
    const filtered = teams.filter(team =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchQuery, teams]);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await fetchTeams();
      setTeams(data);
      setFilteredTeams(data);
      setError(null);
    } catch (err) {
      setError('Failed to load teams');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading teams...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="teams-container">
      <h2>🌍 The 48 Teams</h2>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search a nation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="teams-grid">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div key={team.name} className="team-card">
              <span className="team-flag">{team.flag}</span>
              <h3>{team.name}</h3>
              <p>Group {team.group}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No teams found</p>
        )}
      </div>
    </div>
  );
}
