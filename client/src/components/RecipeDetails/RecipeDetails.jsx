import React, { useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { cleanUpState, getRecipe } from '../../redux/actions'
import "./RecipeDetails.css"
import RatingStars from "../RatingStars/RatingStars"
import Loading from '../Loading/Loading'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'


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
      <div className='cont-nav-filters'>
        <Nav />
      </div>
      {recipe && !recipe.name ?  <Loading/> : <div className='container-details'>
        <div className='container-img-title'>
          <h2 className='rec-name'>{recipe.name}</h2>
        </div>
        <div className='container-img-sum'>
          <div className='cont-rec-img'>
            <img className='rec-img' src={recipe.image} alt={recipe.name}/>
          </div>
          <div className='cont-sum'>
            <h2 className='sum-title'>SUMMARY</h2>
            <hr></hr>
            <h3 className='rec-summary'>{recipe.summary}</h3>
          </div>
        </div>
        <h2 className='sbs-title'>STEP BY STEP</h2>
        <div className='cont-sbs-details'>
          {recipe.stepByStep.length > 0 ? recipe.stepByStep.map((el, i) => <div className='sbs-cont' key={i + 10 * 2}>
            <p className='rec-num'>{i + 1}</p>
            <p className='rec-step' >{el.split(':')[1]}</p>
            </div>) : 'NO RESULTS'}
        </div>
        <div className="hs-diets-cont-det">
          <div className="hs-cont-details-border">
            <div className='hs-cont-details'>
              <h2 className='hs-title'>Health Score</h2>
              {/* <hr className='hr-hs'></hr> */}
              <div className='card-hs'>
                <p className='rec-hs'>{recipe.healthScore}</p>
                <RatingStars score={recipe?.healthScore}/>
              </div>
            </div>
          </div>
          <div className='diets-cont-details'>
            <h2>Diets</h2>
            <hr className='hr-hs'></hr>
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
        <button className='back-btn' onClick={goBackHandleClick} type='button'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back
        </button>
      </div> }
      <Footer />
    </div>
  )
}

export default RecipeDetails