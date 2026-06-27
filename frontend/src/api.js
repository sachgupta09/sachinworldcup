import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export async function fetchMatches() {
  try {
    const response = await api.get('/matches');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching matches:', error);
    return response.data.fallback || [];
  }
}

export async function fetchStandings() {
  try {
    const response = await api.get('/standings');
    return response.data.data || {};
  } catch (error) {
    console.error('Error fetching standings:', error);
    return response.data.fallback || {};
  }
}

export async function fetchTeams() {
  try {
    const response = await api.get('/teams');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching teams:', error);
    return response.data.fallback || [];
  }
}

export async function fetchNews() {
  try {
    const response = await api.get('/news');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export async function fetchRankings() {
  try {
    const response = await api.get('/rankings');
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return [];
  }
}
