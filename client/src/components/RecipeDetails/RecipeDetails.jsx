import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanUpState, getRecipe } from '../../redux/actions'
import "./RecipeDetails.css"

const RecipeDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const recipe = useSelector(state => state.recipe)
  const history = useHistory()

  
  useEffect(() => {
    dispatch(getRecipe(id));

    return () => {
      dispatch(cleanUpState('recipe'))
    }
  },[dispatch, id])

  
  const goBackHandleClick = () => {
    history.push("/recipes")
  }

  return (
    <div className='container-r-id'>
      <div className='container-img'>
        <img className='rec-img' src={recipe.image} alt={recipe.name}/>
      </div>
      <div className='container-details'>
        <h2 className='rec-name'>{recipe.name}</h2>
        <h3 className='rec-summary'>{recipe.summary}</h3>
        <p className='rec-hs'>{recipe.healthScore}</p>
        <div>
        {recipe.stepByStep?.map(el => <div className='rec-sbs'key={recipe.id++}>
          <p>{el}</p>
        </div>
        )}
        </div>
        <button onClick={goBackHandleClick}>GO BACK</button>
      </div>
    </div>
  )
}

export default RecipeDetails