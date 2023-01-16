import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div className='footer-cont'>
        <div className='footer-cont-int'>
        <hr></hr>
        <div className='icons-cont'>
          <img className='icon-f' src='https://cdn-icons-png.flaticon.com/512/733/733609.png' alt='github-icon'></img>
          <img className='icon-f' src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" alt='github-icon'></img>
          <img className='icon-f' src='https://cdn-icons-png.flaticon.com/512/2175/2175193.png' alt='github-icon'></img>
          <img className='icon-f' src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt='github-icon'></img>
        </div>
        <hr></hr>
        </div>
        
        <div className='footer-cont-int-2'>
          <p className='f-name'>Matias Barroso</p>
          <p className='f-rights' > | Eatime | @ All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer

