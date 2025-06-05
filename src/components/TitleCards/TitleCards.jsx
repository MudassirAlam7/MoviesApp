import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
 
  

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    }
  };

  // Fetch movies once when component mounts
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));
  }, []);

  // Horizontal scroll behavior
  useEffect(() => {
    const currentRef = cardsRef.current;
    const handleWheel = (e) => {
      currentRef.scrollLeft += e.deltaY;
    };

    currentRef.addEventListener('wheel', handleWheel);
    return () => currentRef.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
