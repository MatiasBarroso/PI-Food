import React from 'react';
import "./Cards.css";
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes } from '../../redux/actions/index'
import Card from '../Card/Card'

const Cards = () => {
  
  const dispatch = useDispatch()
    React.useEffect (() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    const recipes = useSelector( state => state.recipes)
    console.log(recipes)
  return (
    <div className='container-cards'>
        <div className='cards'>
            {recipes && recipes.data?.map(el => {
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