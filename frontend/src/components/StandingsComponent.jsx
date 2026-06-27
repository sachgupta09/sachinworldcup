import React, { useState, useEffect } from 'react';
import { fetchStandings } from '../api';
import '../styles/Standings.css';

export default function StandingsComponent() {
  const [standings, setStandings] = useState({});
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      setLoading(true);
      const data = await fetchStandings();
      setStandings(data);
      setError(null);
    } catch (err) {
      setError('Failed to load standings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading standings...</div>;
  if (error) return <div className="error">{error}</div>;

  const groupData = standings[selectedGroup] || [];
  const groups = Object.keys(standings).sort();

  return (
    <div className="standings-container">
      <h2>🏆 Group Standings</h2>

      <div className="group-tabs">
        {groups.map((group) => (
          <button
            key={group}
            className={`group-tab ${selectedGroup === group ? 'active' : ''}`}
            onClick={() => setSelectedGroup(group)}
          >
            Group {group}
          </button>
        ))}
      </div>

      <table className="standings-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {groupData.map((team, index) => (
            <tr key={team.team} className={index === 0 ? 'qualified' : ''}>
              <td>{team.rank}</td>
              <td className="team-name">{team.team}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.gf}</td>
              <td>{team.ga}</td>
              <td>{team.gd}</td>
              <td className="points"><strong>{team.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
