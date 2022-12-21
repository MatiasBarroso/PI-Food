import React from 'react';
import './Card.css';

const Card = ({name, image, score}) => {
  return (
    <div className='container-card'>
        <img src={image} className="img-card" alt={name} />
        <p>{name}</p>
        <p>Health Score: {score}</p>
    </div>
  )
}

export default Card
