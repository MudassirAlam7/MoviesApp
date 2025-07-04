import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import TvShow from './pages/TvShow/TvShow'
import Navbar from './components/Navbar/Navbar'
import Movie from './pages/Movies/Movies'
import Footer from './components/Footer/Footer'
import Search from './pages/Search/Search'
import News from './pages/news/News'
import BrowseByLan from './pages/language/BrowseByLan'

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged in");
        navigate('/')
        
      }else{
        console.log("Logged out");
        navigate('/login')
        
      }
    })
  }, [])
  const hideLayout = location.pathname === '/login'
  return (
    <div>
      <ToastContainer theme='dark'/>
       {!hideLayout && <Navbar />}
     
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tvshow' element= {<TvShow/>}/>
        <Route path='/movies' element={<Movie/>}/>
        <Route path='/player/:id' element = {<Player/>}/>
        <Route path='/search/:query' element = {<Search/>}/>
        <Route path='/news' element = {<News/>}/>
        <Route path='/language/:langCode' element = {<BrowseByLan/>} />
      </Routes> 
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App
