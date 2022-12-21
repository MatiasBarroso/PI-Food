import React from 'react';
import "./Cards.css";
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';

const Cards = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9)

  
  const state =  useSelector(state => state.recipes);
  const max = Math.round(state.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = (page - 1) * limit + limit;

  return (
    <div className='container-cards'>
      <div className='container-pagination'>
        <Pagination page={page} setPage={setPage} max={max}/>
      </div>
      <div className='cards'>
        {state && state.slice(startIndex, endIndex).map(el => {
          return (
            <Card
              key={el.id}
              image={el.image}
              name={el.name}
              score={el.healthScore}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Cards