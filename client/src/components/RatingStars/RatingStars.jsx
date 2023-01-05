import React from 'react'
import './RatingStars.css'

const RatingStars = ({score}) => {
  
  return (
    <div className='cont-stars'>
        <div className={score > 20 ? 'pointed' : 'not-pointed'}></div>
        <div className={score > 20 && score > 40 ? 'pointed' : 'not-pointed'}></div>
        <div className={score > 40 && score > 60 ? 'pointed' : 'not-pointed'}></div>
        <div className={score > 60 && score > 80 ? 'pointed' : 'not-pointed'}></div>
        <div className={score > 80 ? 'pointed' : 'not-pointed'}></div>
    </div>
  )
}

export default RatingStars