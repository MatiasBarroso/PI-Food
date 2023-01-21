import React from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'
import LogoTitle from '../../assets/lp/1x/Recurso1.png'
import foodImg from  '../../assets/lp/1x/food-lp.png'
import iconGit from '../../assets/lp/1x/1x/1x/icon-git.png'
import iconLinkedin from '../../assets/lp/1x/1x/1x/icon-linkedin.png'

const LandingPage = () => {
  return (
    <div className='lp-container'>
      <div className='title-container'>
        <img className='title' src={LogoTitle} alt='Eatime'></img>
        <p className='intro-app'>Find the best foods from around the world in the same app</p>
        <Link to="/recipes" className='enter-btn'>
            CHECK IT OUT
        </Link>
        <div className='icons-lp'>
          <a href='https://github.com/MatiasBarroso' target="_blank" rel="noreferrer">
            <img className='i-lp' src={iconGit} alt='icon-git'/>
          </a>
          <a href='https://www.linkedin.com/in/matias-barroso-77b4058a/' target="_blank" rel="noreferrer">
            <img className='i-lp' src={iconLinkedin} alt='icon-linkedin'/>
          </a>
        </div>
        
      </div>

          <div className='bg-yellow'>
            <img className='food-img' src={foodImg} alt='food-img'></img>
          </div>
    </div>
  )
}

export default LandingPage