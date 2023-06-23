import React from 'react'
import "./Footer.css"
import LogoForm from '../../assets/lp/1x/1x/eatime-logo-form.png';

const Footer = () => {
  return (
    <div className='footer-cont'>
      <div className='footer-cont-int'>
      <img src={LogoForm} alt='logo-eatime' className='logo-form'/>
      </div>
      <div className='footer-cont-int-2'>

        <div className='icons-cont'>
          <a href='https://github.com/MatiasBarroso' target="_blank" rel="noreferrer"><img className='icon-f' src='https://cdn-icons-png.flaticon.com/512/733/733609.png' alt='github-icon'/></a>
          <a href='https://www.linkedin.com/in/matias-barroso-77b4058a/' target="_blank" rel="noreferrer"><img className='icon-f' src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt='github-icon'/></a>
          <a href='https://www.instagram.com/' target="_blank" rel="noreferrer"><img className='icon-f' src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt='github-icon'/></a>
        </div>
        <p className='f-name'>Matias Barroso | Eatime</p>
        <p className='f-rights' >© 2022 - 2023</p>
        <p className='f-rights' >All rights reserved</p>
      </div>
  </div>
  )
}

export default Footer

