import React, { useEffect, useState } from 'react';
import './news.css';

const fallbackImg = 'https://via.placeholder.com/800x450?text=No+Image';

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=f3b47242a0664c9da788643ae6bc26fc'
    )
      .then((res) => res.json())
      .then((res) => setData(res.articles))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="news-wrapper">
      <h1>Entertainment News</h1>
      <ul className="news-scroll">
        {data.map((item, index) => (
          <li className="news-card" key={index}>
            <img
              src={item.urlToImage || fallbackImg}
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
