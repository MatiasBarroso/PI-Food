import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ page, setPage, max }) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
      if(page < max){
          setInput(page + 1)
          setPage(page + 1)
      }
    }
    const prevPage = () => {
        if(page > 1 && input > 1){
          setInput(page - 1);
          setPage(page - 1)
        } else {
            setInput(1)
        }
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            if(parseInt(e.target.value < 1) || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))){
                setPage(1);
                setInput(1);
            } else {
                setPage(parseInt(e.target.value))
                setInput(parseInt(e.target.value))
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value)
    }
  return (
    <div className='pagination'>
        <button className='prev-button' onClick={() => prevPage()}>PREV</button>
        <input name='page' type='number' value={input} min="1" max={max} autoComplete='off' onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)}></input>
        <p className='count-pagination'>DE {max}</p>
        <button className='next-button' onClick={() => nextPage()}>NEXT</button>
    </div>
  )
}

export default Pagination 