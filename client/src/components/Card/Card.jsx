import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
const Card = ({name, image, score, id, summary}) => {
  
  return (
    <Link to={`/recipes/${id}`} className='container-card' >
    <div  key={id}>
        <img src={image} className="img-card" alt={name} />
      <div className='card-title-summary'>
        <p className='r-name'>{name || "Your Food"}</p>
        <p className='r-summary'>{summary?.split('.')[0] || "This food it's so delicious!"}</p>
        <p className='r-hs'>Health Score: {score}</p>
      </div>  
    </div>
    </Link>
  )
}

export default Card
