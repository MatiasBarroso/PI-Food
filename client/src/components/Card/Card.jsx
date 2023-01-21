import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars/RatingStars'
import ReadMore from '../ReadMore/ReadMore'

const Card = ({name, image, score, id, summary}) => {
  
  return (
    <Link to={`/recipes/${id}`} className='container-card' >
      <div className='card-item-cont' key={id}>
        <img src={image} className="img-card" alt={name} />
        <div className='card-title-summary'>
          <div className='r-name-cont'>
            <p className='r-name'>{name || "Your Food"}</p>
          </div>
         {summary?.split('.')[0].length > 150 ? <ReadMore summary={summary}/> : <p className='r-summary'>{summary?.split('.')[0] || "This food it's so delicious!"}</p>}          
        </div>
        <div className='r-hs'>
            <RatingStars  score={score}/>
        </div>
      </div>
    </Link>
  )
}

export default Card
