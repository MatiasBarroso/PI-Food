import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ page, setPage, max }) => {
    const [input, setInput] = useState(1)

    const nextPage = () => {
        if(page < max){
          setInput(input + 1)
          setPage(page + 1)
        }
    }
    const prevPage = () => {
        if(page > 1){
          setInput(input - 1);
          setPage(page - 1)
        }
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            setPage(parseInt(e.target.value))
            if(parseInt(e.target.value < 1) || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))){
                setPage(1);
                setInput(1);
            } else {
                setPage(parseInt(e.target.value))
            }
        }
    }

    const onChange = (e) => {
        
        setInput(e.target.value)
    }
  return (
    <div className='pagination'>
        <button className='prev-button' onClick={() => prevPage()}>PREV</button>
        <input name='page' value={input} autoComplete='off' onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)}></input>
        <p className='count-pagination'>DE {max}</p>
        <button className='next-button' onClick={() => nextPage()}>NEXT</button>
    </div>
  )
}

export default Pagination 