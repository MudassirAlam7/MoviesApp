import React, { useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import menu_icon from '../../assets/menu.png' // Your hamburger icon
import { logout } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const ref = useRef()
    window.addEventListener('scroll', ()=>{
      if(window.scrollY>=80){
        ref.current.classList.add('nav-dark')
      }
      else{
        ref.current.classList.remove('nav-dark')
      }
    }, [])
  
  

  return (
    <div ref= {ref}className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='Logo' />
        <ul className={isMenuOpen ? 'open' : ''}>
          <li onClick={() => { navigate('/'); setIsMenuOpen(false) }}>Home</li>
          <li onClick={() => { navigate('/tvshow'); setIsMenuOpen(false) }}>Tv Shows</li>
          <li onClick={() => { navigate('/movies'); setIsMenuOpen(false) }}>Movies</li>
          <li>News & Popular</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt='Search' className='icons' />
        <p>Children</p>
        <img src={bell_icon} alt='Bell' className='icons' />
        <div className='navbar-profile'>
          <img src={profile_img} alt='Profile' className='profile' />
          <img  src={caret_icon}  onClick={() => setIsDropdownOpen(!isDropdownOpen)} alt='Caret' />
           {isDropdownOpen && (
            <div className='dropdown'>
              <p onClick={() => logout()}>Sign Out</p>
            </div>
          )}
          
        </div>
        <div className='hamburger' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={menu_icon} alt='Menu' width={24} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
