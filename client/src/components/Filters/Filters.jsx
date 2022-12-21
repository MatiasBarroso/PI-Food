import { useEffect, useState } from 'react'
import "./Filters.css"
import { useSelector, useDispatch } from 'react-redux'
import { filterByOrder, filterByScore, filterByType } from '../../redux/actions'
import { Link } from 'react-router-dom'

const Filters = () => {

  const [dietsState, setDietsState ] = useState([])
  const [order, setOrder] = useState("")
  const [scoreOrder, setScoreOrder] = useState("")

  const dispatch = useDispatch()

  const diets = useSelector(state => state.diets)

  useEffect(() => {
    dispatch(filterByType(dietsState));
    dispatch(filterByOrder(order));
    dispatch(filterByScore(scoreOrder))
  }, [dispatch, dietsState, order, scoreOrder])
  
  const handleOnChange = (e) => {
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
    setOrder(e.target.value)
    console.log(e.target.value)
  }

  const onClickOrderScore = (e) => {
    setScoreOrder(e.target.value)
  }


  return (
    <div className='container-filters'>
        <div>
          <h2> FILTER BY DIET TYPES </h2>
          <div className='container-filter-diets'>
            <select value={dietsState.option} onChange={handleOnChange}>
              {diets && diets.map(diet => 
              <option key={diet.id} value={diet.name}>{ diet.name }</option>)}
            </select>
          </div>
          <div>
              {dietsState.map((d, index) => <div key={index}>
                <p>{d}</p>
                <button onClick={() => handleOnClick(d)}>x</button>
              </div>) }
          </div>
          <div>
            <h2>FILTER BY ORDER</h2>
            <button value='up' onClick={onClickOrder}>ASCENDANT</button>
            <button value='down' onClick={onClickOrder}>DESCENDANT</button>
          </div>
          <div>
            <h2>FILTER BY HEALTH SCORE</h2>
            <button value='up' onClick={onClickOrderScore}>UP</button>
            <button value='down' onClick={onClickOrderScore}>DOWN</button>
          </div>
          <div>
            <Link to='/recipe/create'>
              <button>CREATE YOUR RECIPE</button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Filters