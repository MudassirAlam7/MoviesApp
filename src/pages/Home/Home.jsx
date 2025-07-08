import React, { useEffect, useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
     Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
    },
  };

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
      .then((res) => res.json())
      .then((data) => {
        setHeroMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, [heroMovies]);

  return (
    <div className="home">
 
      <div className="hero">
        {heroMovies.length > 0 && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${heroMovies[currentIndex].backdrop_path}`}
              alt={heroMovies[currentIndex].title}
              className="banner-img"
            />
            <div className="hero-caption">
              <h1 className="caption-title">{heroMovies[currentIndex].title}</h1>
              <p>{heroMovies[currentIndex].overview.slice(0, 300)}</p>
              <div className="hero-btns">
              <Link to={`/player/${heroMovies[currentIndex].id}`}>
                <button className="btn">
                  <img src={play_icon} alt="" /> Play
                </button>
                </Link>
                <button className="btn btn-dark">
                  
                  <img src={info_icon} alt="" /> More Info
                </button>
              </div>
              <TitleCards />
            </div>
          </>
        )}
      </div>

      <div className="more-cards">
        <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
        <TitleCards title={'Only on Netflix'} category={'now_playing'} />
        <TitleCards title={'Upcoming'} category={'popular'} />
        <TitleCards title={'Trending on #one'} category={'upcoming'} />
      </div>

     
    </div>
  );
};

export default Home;
