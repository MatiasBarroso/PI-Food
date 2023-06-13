import React, { useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanUpState, getRecipe } from '../../redux/actions'
import "./RecipeDetails.css"
import RatingStars from "../RatingStars/RatingStars"
import Loading from '../Loading/Loading'
import Nav from '../Nav/Nav'

const RecipeDetails = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const {recipe, diets} = useSelector(state => state)
  const history = useHistory()

  useEffect(() => {
    dispatch(getRecipe(id));

    return () => {
      dispatch(cleanUpState())
    }
  },[dispatch, id])

  
  const goBackHandleClick = () => {
    history.push("/recipes")
  }

  return (
    <div className='container-r-id'>
      <Nav />
      {recipe && !recipe.name ?  <Loading/> : <div className='container-details'>
        <div className='container-img-title'>
          <h2 className='rec-name'>{recipe.name}</h2>
        </div>
        <div className='container-img-sum'>
          <img className='rec-img' src={recipe.image} alt={recipe.name}/>
          <div>
            <h2>Summary</h2>
            <hr></hr>
            <h3 className='rec-summary'>{recipe.summary}</h3>
          </div>
        </div>
        <h2 className='sbs-title'>Step by step</h2>
        <hr></hr>
        <div className='cont-sbs-details'>
          {recipe.stepByStep.length > 0 ? recipe.stepByStep.map((el, i) => <div className='sbs-cont' key={i + 10 * 2}>
            <p className='rec-num'>{i + 1}</p>
            <p className='rec-step' >{el.split(':')[1]}</p>
            </div>) : 'NO RESULTS'}
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
                <i className={recipe.diets?.includes(el.name) ? "gg-check-det" : "gg-close-det"}></i>
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