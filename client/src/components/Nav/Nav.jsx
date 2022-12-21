import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import "./Nav.css";

const Nav = () => {
  return (
    <div className='container-nav'>
        <h1 className='nav-title'>
            NAV
        </h1>
        <SearchBar />
    </div>
  )
}

export default Nav