import React from 'react';
import "./Cards.css";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../redux/actions/index'
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';

const Cards = () => {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8)

  const dispatch = useDispatch()
    React.useEffect (() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    const recipes =  useSelector(state => state.recipes);
    const max = Math.round(recipes.length / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = (page - 1) * limit + limit;

  return (
    <div className='container-cards'>
      <div className='container-pagination'>
        <Pagination page={page} setPage={setPage} max={max}/>
      </div>
      <div className='cards'>
        {recipes && recipes.slice(startIndex, endIndex).map(el => {
          return (
            <Card
              key={el.id}
              image={el.image}
              name={el.name}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Cards