import React, { useState, useEffect } from 'react';
import { fetchNews } from '../api';
import '../styles/News.css';

export default function NewsComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNews();
      setNews(data);
      setError(null);
    } catch (err) {
      setError('Failed to load news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading news...</div>;

  return (
    <div className="news-container">
      <h2>📰 Latest News</h2>

      {error && <div className="error">{error}</div>}

      {news.length === 0 ? (
        <div className="no-news">
          <p>Configure NewsAPI key in backend .env to see latest news</p>
          <p className="hint">Get free key at newsapi.org (100 requests/day)</p>
        </div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <article key={index} className="news-card">
              {article.image && (
                <img src={article.image} alt={article.title} />
              )}
              <div className="news-content">
                <span className="news-source">{article.source}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More →
                </a>
                <span className="news-date">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
