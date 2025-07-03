import React, { useEffect, useState } from 'react';
import './news.css';

const fallbackImg = 'https://via.placeholder.com/800x450?text=No+Image';

const News = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/top-headlines?topic=entertainment&lang=en&apikey=${import.meta.env.VITE_NEWS_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.articles)
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="news-wrapper">
      <h1>Entertainment News</h1>
      {loading && <div>Loading...</div>}
      <ul className="news-scroll">
        {data.map((item, index) => (
          <li className="news-card" key={index}>
            <img
              src={item.image || fallbackImg}
              alt={item.title}
              onError={(e) => (e.target.src = fallbackImg)}
            />
            <div className="news-info">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-source">
                {item.source?.name} |{' '}
                {new Date(item.publishedAt).toLocaleDateString()}
              </p>
              <p className="news-description">
                {item.description || 'No description available.'}
              </p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <button className="news-btn">Read More</button>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
