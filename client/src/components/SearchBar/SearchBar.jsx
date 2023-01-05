import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./SearchBar.css"
import { getRecipesByName } from '../../redux/actions'
import searchIcon from '../../assets/lp/search-icon.png'

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch()
  

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipesByName(searchInput));
        setSearchInput("");
    }
   
  return (
    <div>
      <form className='container-searchBar' onSubmit={e => handleSearchSubmit(e)}>
        <input
        className='search-input'
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />
        <button type="submit" className='searchBar-button'>
          <img className='s-icon' src={searchIcon} alt='s-icon'></img>
        </button>
      </form>
    </div>
  )
}

export default SearchBar