import React, { useEffect, useState } from 'react';
import "./Tvshow.css"

import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';


const TVShow = () => {
  const [shows, setShows] = useState([]);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB}` 
  
  }
};
  useEffect(() => {
   fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json())
  .then(res => setShows(res.results))
  .catch(err => console.error(err));
  }, []);

  
  

  return (
    <div className="tvshows-page">
   

      <h2 className="tvshows-title">TV Shows</h2>
      <div className="tvshows-grid">
        {shows.map(show => (
          <Link to={`/player/${show.id}`} className="tvshow-card" key={show.id}>
            <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.title} />
            <div className="tvshow-info">
              <h4>{show.original_name}</h4>
              <p>{show.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TVShow;
