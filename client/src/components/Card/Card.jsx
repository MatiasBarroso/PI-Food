import React from 'react';
import './Card.css';

const Card = ({name, image}) => {
  return (
    <div className='container-card'>
        <img src={image} className="img-card" alt={name} />
        <p>{name}</p>
    </div>
  )
}

export default Card
