import React, { useEffect } from 'react';
import "./Cards.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Card from '../Card/Card';
import Loading from '../Loading/Loading';
import { changeStatusFilter, getAllRecipes, getDiets, resetRecipes } from "../../redux/actions";
import { loading } from '../../redux/actions';

const Cards = ({ start, end }) => {

  // const [page, setPage] = useState(1);
  // const [limit] = useState(5)
  const dispatch = useDispatch();


  const state =  useSelector(state => state);
  // const max = Math.round(state.recipes.length / limit);
  // const start = (page - 1) * limit;
  // const end = (page - 1) * limit + limit;

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
  
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    if(state.recipes.length === 0 && !state.loading) dispatch(loading(true))
    if(state.recipes.length > 0 && state.loading) {
      dispatch(changeStatusFilter)
      dispatch(loading(false))
    }
  },[state.recipes, state.loading, dispatch])

  return (
    <div className='container-cards'>
      {/* <div className='container-pagination'>
        <Pagination page={page} setPage={setPage} max={max} start={start} end={end}/>
      </div> */}
      <div className='cards-main-cont'>
        {state.loading ? <Loading /> : <div className='cards'>
          {state.filterStatus === 'not found'
            ? <p className='no-res'>No results found</p> 
            : state.recipes?.slice(start, end).map(el => {
                return (
                  <Card
                    key={el.id}
                    id={el.id}
                    image={el.image}
                    name={el.name}
                    score={el.healthScore}
                    summary={removeTags(el.summary)}
                  />)
              }) }
        </div>}
      </div>
    </div>
  )
}

export default Cards