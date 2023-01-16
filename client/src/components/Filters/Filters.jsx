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
  const { diets, created } = useSelector(state => state)

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
  
  const onClose = (e) => { 
    setDietsState(dietsState.filter(diet => diet !== e.target.value ))
  }

  const handleOnChangeScore = (e) => {
    e.preventDefault()
    setScore(e.target.value)
  }

  const onClickReset = (e) => {
    e.preventDefault()
    dispatch(resetRecipes())
    setDietsState([])
    setOrder("")
    setScore("")
  }

  const onClickCreated = (e) => {
    e.preventDefault()
    if(created.length === 0) return;
    dispatch(createdRecipes())
  }

  return (
    <div className='main-cont-filt'>
       <div className='container-filter-diets'>
          <select className='select-filter' value={dietsState.length === 0 ? 'Filter By Diets' : dietsState[diets.length - 1] } onChange={handleOnChange}>
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
     
          <select className='select-filter' value={score === "" ? 'Health Score' : score} onChange={handleOnChangeScore}>
                <option disabled defaultValue>Health Score</option>
                <option value='up'>UP</option>
                <option value='down'>DOWN</option>
          </select>
     
        <button className='btn-filt' value='created' onClick={onClickCreated}>Created Recipes</button>
        <button className='btn-filt' onClick={onClickReset}>Reset</button>
        <Link to='/recipe/create'>
          <button className='btn-filt-cr-re'>Create Your Recipe</button>
        </Link>

      {dietsState.length > 0 && <div className='container-options-selected'>
        {dietsState.map((d, index) => <div className='option-selected' key={index}>
            <p className='diet-select'>{d}</p>
            <button className='btn-close' type='button' value={d} onClick={(e) => onClose(e)}>x</button>
          </div>)}
      </div>}
    </div>
  )
}

export default Filters