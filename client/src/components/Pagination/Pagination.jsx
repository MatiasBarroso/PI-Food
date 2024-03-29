import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Pagination.css';

const Pagination = ({ page, setPage, max, limit }) => {
    
    const [limitPage, setLimitPage] = useState(1)
    const [endPag, setEndPag] = useState(5)
    const [active, setActive] = useState({
        type: false,
        page: 0
    })


    const state = useSelector(state => state)

    useEffect(() => {
        
        if(state && state.recipes.length > 0) {
            setPage(1)
            setActive({
              type:true,
              page: 1
            })
            setLimitPage(1)
            setEndPag(limit)
        }
    }, [state,limit, setPage])


    const nextPage = () => {
       if(page < max && page === endPag){
          setPage(page + 1)
          setActive({
            type: true,
            page: page + 1
          })
          setLimitPage(limitPage + limit)
          setEndPag(endPag + limit)
        }
        if(page < max && page !== endPag){
            setPage(page + 1)
            setActive({
              type: true,
              page: page + 1
            })
        }
    }

    const prevPage = () => {
        if(page > 1 && page === limitPage){
            setPage(page - 1)
            setActive({
              type: true,
              page: page - 1
            })
            setLimitPage(limitPage - limit)
            setEndPag(endPag - limit)
          }
          if(page > 1 && page !== limitPage){
              setPage(page - 1)
              setActive({
                type: true,
                page: page - 1
              })
          }
    }

    const onClickBtnPage = (e) => {
        e.preventDefault();
        setPage(parseInt(e.target.value))
        setActive({
            type:true,
            page: e.target.value
        })
    }

  const [scrollPosition, setPosition] = useState(0);

  const handleScroll = () => {
    setPosition(window.scrollY);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


    // const onClickBtnPage = (e) => {
    //     e.preventDefault();
    //     if(parseInt(e.target.value) === endPag){
    //         setLimitPage(limitPage + 9)
    //         setEndPag(endPag + 10)
    //     }
    //     if(parseInt(e.target.value) === limitPage && parseInt(e.target.value) !== 1){
    //         setLimitPage(limitPage - 9)
    //         setEndPag(endPag - 10)
    //     }
    //     setPage(parseInt(e.target.value))
    //     setActive({
    //         type:true,
    //         page: e.target.value
    //     })
    // }

    let buttons = []
    for(var i=0; i<max; i++) buttons.push(<button className={active && parseInt(active.page) === i+1 ? 'pag-button-active' : 'pag-button-disabled'} key={`box-${i}`} value={i+1} onClick={onClickBtnPage}>{i+1}</button>)
    
  return (
    <div className={`pagination ${scrollPosition === 0 ? '' : ' nav-scroll'}`}>
        <button className='pag-pr-nx' onClick={prevPage} value={limitPage}>&#60;</button>
            {buttons.length > 0 && buttons.length <= 10 ? buttons : buttons?.slice(limitPage - 1, endPag)}
            <p className='count-pagination'>DE {state.recipes.length > 0 && state.recipes.length < limit ? 1 : max}</p>
        {/* <p className='count-pagination'>DE {max === 0 && buttons.length > 0 ? 1 : max}</p> */}
        <button className='pag-pr-nx' onClick={nextPage} value='next'>&#62;</button>
    </div>
  )
}

export default Pagination 