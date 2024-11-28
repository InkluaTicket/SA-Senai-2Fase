import React from 'react'
import '../styles/SearchBar.css'


function SearchBar() {


  return (
    
      <div className="search-bar">
      <input
        type="search"
        title='Barra de pesquisa'
        aria-label='Barra de pesquisa'
        className="search-input"
        placeholder="Pesquisar..."
      />
      <button className='search-button'>
      <img className='IconSearch' src="./img/lupa.png" alt="Pesquisar" /></button>
    </div>
    
  )
}

export default SearchBar