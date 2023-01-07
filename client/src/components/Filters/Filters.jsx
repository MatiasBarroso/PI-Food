import { useEffect, useState } from 'react';
import "./Filters.css";
import { useSelector, useDispatch } from 'react-redux';
import { filterByOrder, filterByScore, filterByType, resetRecipes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { createdRecipes } from '../../redux/actions';

const Filters = () => {

  //              LOCAL STATES               //
  
  const [dietsState, setDietsState ] = useState([])
  const [order, setOrder] = useState("")
  const [score, setScore] = useState("")

  //-------------------------------------------//

  const dispatch = useDispatch()
  const diets = useSelector(state => state.diets)

  //         USE EFECTS - DISPATCHES          //
  
  useEffect(() => {
    dispatch(filterByType(dietsState))
}, [dispatch, dietsState])

  useEffect(() => {
    if(order !== ""){
      dispatch(filterByOrder(order));
      return;
    }
  }, [dispatch, order])

  useEffect(() => {
    if(score !== ""){
      dispatch(filterByScore(score))
      return;
    }
  }, [dispatch, score])

//--------------------------------------------//
  
  const handleOnChange = (e) => {
    e.preventDefault();
    if(!dietsState.includes(e.target.value)){
      setDietsState([
        ...dietsState,
        e.target.value
      ])
    } 
  }

  const handleOnChangeOrder = (e) => {
    e.preventDefault();
    setOrder(e.target.value)
  }
  
  const handleOnClick = (d) => {
    setDietsState(dietsState.filter(diet => diet !== d ))
  }

  const handleOnChangeScore = (e) => {
    setScore(e.target.value)
  }

  const onClickReset = (e) => {
    e.preventDefault()
    dispatch(resetRecipes())
  }

  const onClickCreated = (e) => {
    e.preventDefault()
    dispatch(createdRecipes())
  }

  return (
    <div className='main-cont-filt'>
      <div className='container-filters'> 
      
        <div className='container-filter-diets'>
          <select className='select-filter' value={dietsState.length === 0 ? 'Filter By Diets' : dietsState } onChange={handleOnChange}>
                <option disabled defaultValue>
                  Filter By Diets
                </option>
                {diets && diets.map(diet => 
                <option key={diet.id} value={diet.name}>{ diet.name }</option>)}
          </select>
        </div>
      
        <select className='select-filter' value={order === "" ? 'Alphabetic Order' : order} onChange={handleOnChangeOrder}>
          <option disabled defaultValue>Alphabetic Order</option>
          <option value='ASC'>ASCENDANT</option>
          <option value='DESCENDANT'>DESCENDANT</option>
        </select>
     
          <select className='select-filter' value='Health Score' onChange={handleOnChangeScore}>
                <option disabled defaultValue>Health Score</option>
                <option value='up'>UP</option>
                <option value='down'>DOWN</option>
          </select>
     
        <button className='btn-filt' value='created' onClick={onClickCreated}>Created Recipes</button>
        <button className='btn-filt' onClick={onClickReset}>Reset</button>
        <Link to='/recipe/create'>
          <button className='btn-filt-cr-re'>Create Your Recipe</button>
        </Link>

      </div>
      {dietsState.length > 0 && <div className='container-selected-filters'>
            {dietsState.map((d, index) => <div className='option-selected' key={index}>
                  <p className='diet-select'>{d}</p>
                  <button className='btn-close' onClick={() => handleOnClick(d)}>x</button>
            </div>)}
      </div>}
    </div>
  )
}

export default Filters