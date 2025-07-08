import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import TvShow from './pages/TvShow/TvShow';
import Movie from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import News from './pages/news/News';
import BrowseByLan from './pages/language/BrowseByLan';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import EducationalDisclaimer from './components/Disclaimer/disclaimer';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [disclaimerAccepted, setDisclaimerAccepted] = useState(() => {
    return localStorage.getItem('hasSeenEducationalDisclaimer') === 'true';
  });

  useEffect(() => {
    if (!disclaimerAccepted) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const path = location.pathname;

      if (user && path === '/login') {
        navigate('/');
      } else if (!user && path !== '/login') {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [disclaimerAccepted, navigate, location.pathname]);

  const hideLayout = location.pathname === '/login';

  if (!disclaimerAccepted) {
    return (
      <>
        <ToastContainer theme="dark" />
        <EducationalDisclaimer onAccept={() => setDisclaimerAccepted(true)} />
      </>
    );
  }

  return (
    <div>
      <ToastContainer theme="dark" />
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tvshow" element={<TvShow />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/news" element={<News />} />
        <Route path="/language/:langCode" element={<BrowseByLan />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
