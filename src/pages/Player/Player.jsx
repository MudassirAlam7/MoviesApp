import React, { useEffect, useState } from 'react'
import "./Player.css"
import back_arrow from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [apiData, setApidata] = useState({
    name : "",
    key : "",
    published_at : "",
    type : ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApidata(res.results[0]))
  .catch(err => console.error(err));
}, [])
  return (
    <div className='player'>
      <img src= {back_arrow} alt="" onClick={()=>navigate(-2)} />
      <iframe width= "80%" height= "80%"  src= {`https://www.youtube.com/embed/${apiData.key}`}  title = "trailer" allowFullScreen></iframe>
      <div className="player-info">
        <p> {apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name} </p>
        <p>{apiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player
