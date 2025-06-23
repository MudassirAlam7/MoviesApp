import React, { useEffect, useState } from 'react';
import './Movies.css'

import { Link } from 'react-router-dom';

const Movie = () => {
  const [movies, setMovies] = useState([]);
 const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
  }
};

  useEffect(() => {
   fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  .then(res => res.json())
  .then(res => setMovies(res.results))
  .catch(err => console.error(err));
  }, []);

  return (
    <div className="movies-page">
     
      <h2 className="movies-title">Movies</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <Link to={`/player/${movie.id}`} className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movie;
