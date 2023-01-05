import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanUpState, getRecipe } from '../../redux/actions'
import "./RecipeDetails.css"
import RatingStars from "../RatingStars/RatingStars"
import Loading from '../Loading/Loading'

const RecipeDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const {recipe, diets} = useSelector(state => state)
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
      {!recipe.name ?  <Loading/> : <div className='container-details'>
        <div className='container-img-title'>
          <h2 className='rec-name'>{recipe.name}</h2>
          <img className='rec-img' src={recipe.image} alt={recipe.name}/>
        </div>
        <h2>Summary</h2>
        <hr></hr>
        <h3 className='rec-summary'>{recipe.summary}</h3>
        <h2>Step by step</h2>
        <hr></hr>
        <div>
          {recipe.stepByStep?.map((el, index) => <div className='sbs-cont' key={recipe.id++}>
            <p className='rec-num'>{index + 1}</p>
            <p className='rec-step' >{el.split(':')[1]}</p>
            </div>)}
        </div>
        <div className="hs-diets-cont-det">
          <div className="hs-cont-details">
            <h2>Health Score</h2>
            <hr></hr>
            <div className='card-hs'>
              <p className='rec-hs'>{recipe.healthScore}</p>
              <RatingStars score={recipe?.healthScore}/>
            </div>
          </div>
          <hr className='mid-hr'></hr>
          <div className='diets-cont-details'>
            <h2>Diets</h2>
            <hr></hr>
            <div className='diets-types-cont'>
              {diets?.map((el, index)=> <div className='diet-type' key={index}>
                <p className='dt'>{el.name}</p>
                <i className={recipe.diets?.includes(el.name) ? "gg-check" : "gg-close"}></i>
              </div>)}
              {/* {recipe.diets?.map((el, index)=> <div className='diet-type' key={index}>
                <p className='dt'>{el}</p>
                <i class="gg-check"></i>
              </div>)} */}
            </div>
          </div>
          </div>
        <button className='bck-btn' onClick={goBackHandleClick}>GO BACK</button>
      </div> }
    </div>
  )
}

export default RecipeDetails