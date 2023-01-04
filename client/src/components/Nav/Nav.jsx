import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import "./Nav.css";
import logoNav from "../../assets/lp/1x/Recurso2.png"
const Nav = () => {
  return (
    <div className='container-nav'>
        <img className='nav-title' src={logoNav} alt="img-nav"/>
        <SearchBar />
    </div>
  )
}

export default Nav