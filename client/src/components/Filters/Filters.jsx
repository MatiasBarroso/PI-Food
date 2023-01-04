import { useEffect, useState } from 'react';
import "./Filters.css";
import { useSelector, useDispatch } from 'react-redux';
import { filterByOrder, filterByScore, filterByType, resetRecipes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { createdRecipes } from '../../redux/actions';

const Filters = () => {
  
  const [dietsState, setDietsState ] = useState([])
  const [order, setOrder] = useState("")
  const [score, setScore] = useState("")

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
  
  const handleOnClick = (d) => {
    setDietsState(dietsState.filter(diet => diet !== d ))
  }

  const onClickOrder = (e) => {
    e.preventDefault()
    if(e.target.value !== order) setOrder(e.target.value)
    if(e.target.value === order) setOrder("")
  }

  const onClickOrderScore = (e) => {
    e.preventDefault()
    if(e.target.value !== score) setScore(e.target.value)
    if(e.target.value === score) setScore("")
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
    <div className='container-filters'> 
      
      <div className='diets-main-container'>
      <Link to='/recipe/create'>
        <button className='btn-filt-cr-re'>CREATE YOUR RECIPE</button>
      </Link>
        <div className='container-filter-diets'>
          <select className='select-filter' value={dietsState.length === 0 ? 'Filter By Diets' : dietsState } onChange={handleOnChange}>
                <option disabled defaultValue>
                  Filter By Diets
                </option>
                {diets && diets.map(diet => 
                <option key={diet.id} value={diet.name}>{ diet.name }</option>)}
          </select>
          <div className='container-options-selected'>
            {dietsState.map((d, index) => <div className='option-selected' key={index}>
                  <p>{d}</p>
                  <button className='btn-close' onClick={() => handleOnClick(d)}>x</button>
            </div>)}
          </div>
        </div>
      </div>
     
      <div className='container-filter'>

        <button className={ order === 'ASC' ? 'btn-filt-create' : 'btn-filt'} value='ASC' onClick={onClickOrder}>ASCENDANT</button>
        <button className={ order === 'DESC' ? 'btn-filt-create' : 'btn-filt'} value='DESC' onClick={onClickOrder}>DESCENDANT</button>
      </div>
    
      <div className='container-filter'>

        <button className={ score === 'up' ? 'btn-filt-create' : 'btn-filt'} value='up' onClick={onClickOrderScore}>UP</button>
        <button className={ score === 'down' ? 'btn-filt-create' : 'btn-filt'} value='down' onClick={onClickOrderScore}>DOWN</button>
      </div>
 
      <div className='container-filter'>
        <button className='btn-filt' value='created' onClick={onClickCreated}>CREATED RECIPES</button>
        <button className='btn-filt' onClick={onClickReset}>RESET</button>
      </div>
    </div>
  )
}

export default Filters