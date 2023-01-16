import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars/RatingStars'

const Card = ({name, image, score, id, summary}) => {
  
  return (
    <Link to={`/recipes/${id}`} className='container-card' >
      <div className='card-item-cont' key={id}>
        <img src={image} className="img-card" alt={name} />
        <div className='card-title-summary'>
          <div className='r-name-cont'>
            <p className='r-name'>{name || "Your Food"}</p>
          </div>
          <p className='r-summary'>{summary?.split('.')[0] || "This food it's so delicious!"}</p>
          {/* <p className='r-hs'>Health Score: {score}</p> */}
          
        </div>
        <div className='r-hs'>
            <RatingStars  score={score}/>
        </div>
      </div>
    </Link>
  )
}

export default Card
