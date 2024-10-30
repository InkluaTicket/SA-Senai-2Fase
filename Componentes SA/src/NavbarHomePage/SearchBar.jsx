import React from 'react'
import './SearchBar.css'


function SearchBar() {
  return (
    
      <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar..."
      />
      <button className="search-button"><img className='IconSearch' src="./img/Vector.png" alt="" /></button>
    </div>
    
  )
}

export default SearchBar
