import React from 'react';
import "./Cards.css";

import { useSelector } from 'react-redux';
import Card from '../Card/Card';

import Loading from '../Loading/Loading';

const Cards = ({page, start, end}) => {

  // const [page, setPage] = useState(1);
  // const [limit] = useState(5)



  const state =  useSelector(state => state);
  // const max = Math.round(state.recipes.length / limit);
  // const start = (page - 1) * limit;
  // const end = (page - 1) * limit + limit;

  const removeTags = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
  
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <div className='container-cards'>
      {/* <div className='container-pagination'>
        <Pagination page={page} setPage={setPage} max={max} start={start} end={end}/>
      </div> */}
      <div className='cards-main-cont'>
        {state && state.recipes.length ===  0 ? <Loading /> : <div className='cards'>
          {state && state.recipes.length > 0 ? state.recipes.slice(start, end).map(el => {
            return (
              <Card
                key={el.id}
                id={el.id}
                image={el.image}
                name={el.name}
                score={el.healthScore}
                summary={removeTags(el.summary)}
              />)
          }) : <p className='no-res'>No results found</p>}
        </div>}
      </div>
    </div>
  )
}

export default Cards