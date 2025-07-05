import React, { useRef, useState, useEffect } from 'react' // ✅ import useEffect
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import menu_icon from '../../assets/menu.png'
import { logout } from '../../firebase'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showLang, setShowLang] = useState(false);
  const[langCode, setLangCode] = useState('en');
  const ref = useRef()

  // ✅ Fix: Use useEffect for safe DOM access
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (window.scrollY >= 80) {
          ref.current.classList.add('nav-dark')
        } else {
          ref.current.classList.remove('nav-dark')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }
  const getLanguageName = (code) => {
    const names = {
      en: "English", hi: "Hindi", ta: "Tamil", te: "Telugu", bn: "Bengali",
      ko: "Korean", es: "Spanish", fr: "French", ja: "Japanese", de: "German"
    };
    return names[code] || code;
  };
  function handleLangCode(code){
      setLangCode(code);
    
      navigate(`/language/${code}`);
  }
  const isMobile = window.innerWidth <= 768;
  

  
  return (
    <div ref={ref} className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='Logo' />
        <ul className={isMenuOpen ? 'open' : ''}>
          <li onClick={() => { navigate('/'); setIsMenuOpen(false) }}>Home</li>
          <li onClick={() => { navigate('/tvshow'); setIsMenuOpen(false) }}>Tv Shows</li>
          <li onClick={() => { navigate('/movies'); setIsMenuOpen(false) }}>Movies</li>
          <li onClick={() => { navigate('/news'); setIsMenuOpen(false) }}>News & Popular</li>
          <li
  className="dropdown-parent"
  onMouseEnter={!isMobile ? () => setShowLang(true) : undefined}
  onMouseLeave={!isMobile ? () => setShowLang(false) : undefined}
  onClick={()=> {
    if (isMobile) {
      setShowLang(!showLang);
    }
    else {
      setShowLang(true);
    }
  }}
>
  <span>Browse by Languages</span>
  {showLang && (
    <ul className="lang-dropdown">
      {["en", "hi", "ta", "te", "bn", "ko", "es", "fr", "ja", "de"].map((code) => (
        <li
          key={code}
          onClick={() => {
            console.log("clicked", code);
            
            handleLangCode(code);
            setIsMenuOpen(false);
            setShowLang(false);

          }}
        >
          {getLanguageName(code)}
        </li>
      ))}
    </ul>
  )}
</li>


        </ul>
      </div>
      <div className='navbar-right'>
        <img src={search_icon} alt='Search' className='icons' onClick={handleSearchIconClick} />
        {isSearchOpen && (
          <form onSubmit={handleSearchSubmit} className='search-form'>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search...'
              autoFocus
            />
          </form>
        )}
        <p>Children</p>
        <img src={bell_icon} alt='Bell' className='icons' />
        <div className='navbar-profile'>
          <img src={profile_img} alt='Profile' className='profile' />
          <img src={caret_icon} onClick={() => setIsDropdownOpen(!isDropdownOpen)} alt='Caret' />
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
