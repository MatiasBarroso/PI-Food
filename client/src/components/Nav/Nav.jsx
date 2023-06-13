import React, {useState, useEffect } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import "./Nav.css";
import logoNav from "../../assets/lp/1x/Recurso2.png"

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
        <img className='nav-title' src={logoNav} alt="img-nav"/>
          <SearchBar />
    </div>
  )
}

export default Nav