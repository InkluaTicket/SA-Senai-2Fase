import React from 'react'
import '../styles/SearchBar.css'



function SearchBar() {

  return (
      <div className='barra-pesquisa'>
      <input
        type="search"
        title='Barra de pesquisa'
        aria-label='Barra de pesquisa'
        className="search-input"
        placeholder="Pesquisar..."
        tabindex="1"
      />
      
      <button className="search-button"><img src="./img/lupa.png" alt="Pesquisar" className='lupa' /></button>
    </div>

  )
}

export default SearchBar;