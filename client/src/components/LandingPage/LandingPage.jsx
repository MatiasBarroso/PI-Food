import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import LogoTitle from "../../assets/lp/1x/Recurso1.png"
import Nav from '../Nav/Nav'

const LandingPage = () => {
  return (
    <div className='lp-container'>
      <Nav />
      <div className='title-container'>
        <img className='title' src={LogoTitle} alt='Eatime'></img>
        <Link to="/recipes" className='enter-btn'>
            GO
        </Link>
      </div>
    </div>
  )
}

export default LandingPage