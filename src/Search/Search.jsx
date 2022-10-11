import React from 'react';
import "./Search.css";

function Search({setQuery}) {
  return (
    <div className='SearchBox'>
     <input placeholder= "search here" className ="searchTerm" type="text" onChange = {(e) => setQuery(e.target.value)}></input>
     <button type="submit" class="searchButton">
     <i class="fa fa-search" aria-hidden="true"></i>
     </button>
    </div>
  )
}

export default Search