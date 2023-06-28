import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./SearchBar.css";
import { getRecipesByName } from '../../redux/actions';
// import searchIcon from '../../assets/lp/search-icon.png';
import { nameConverter } from '../CreateRecipe/CreateRecipe.modules';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
      if(searchInput !== "") dispatch(getRecipesByName(nameConverter(searchInput)));
    }, [dispatch, searchInput])
  

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipesByName(searchInput));
        setSearchInput("");
    }
   
  return (
    <div className='main-cont-sb'>
      <form className='container-searchBar' onSubmit={e => handleSearchSubmit(e)}>
        <input
            className='search-input'
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            value={searchInput} />
        <button type="submit" className='searchBar-button'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchBar

