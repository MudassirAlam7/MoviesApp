import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'




const BrowseByLan = () => {
  const [particular, setParticular] = useState([])
  const [loading, setLoading] = useState(true)
  const{langCode} = useParams()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    }
  };
  
    useEffect(() => {
     fetch(`https://api.themoviedb.org/3/discover/movie?with_original_language=${langCode}`, options)
    .then(res => res.json())
    .then(res => {
    setParticular(res.results)
    setLoading(false)
})
    .catch(err => console.error(err));
    }, [langCode]);

    const getLanguageName = (code) => {
      const names = {
        en: "English", hi: "Hindi", ta: "Tamil", te: "Telugu", bn: "Bengali",
        ko: "Korean", es: "Spanish", fr: "French", ja: "Japanese", de: "German"
      };
      return names[code] || code;
    };

    return (
      <div className="movies-page">
     
      <h2 className="movies-title">Showing result for "{getLanguageName(langCode)}" </h2>
      <div className="movies-grid">
        {particular.map(movie => (
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
    )
}

export default BrowseByLan
