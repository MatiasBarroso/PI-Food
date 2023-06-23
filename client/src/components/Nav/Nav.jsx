import React, {useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import "./Nav.css";
import logoNav from "../../assets/lp/1x/Recurso2.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Nav = () => {

  const [scrollPosition, setPosition] = useState(0);

  const handleScroll = () => {
    setPosition(window.scrollY);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={`container-nav bg-white ${scrollPosition === 0 ? '' : ' nav-scroll'}`}>
      <div className='cont-logo-nav'>
        <img className='nav-title' src={logoNav} alt="img-nav"/>
      </div>
        
      <div className='link-cont'>
        <Link to='/recipes' className='link-nav'>Home</Link>
        <Link to='/recipe/create' className='link-nav'>Create</Link>
      </div>

      <SearchBar />
    </div>
  )
}

export default Nav