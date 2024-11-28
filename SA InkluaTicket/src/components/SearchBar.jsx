import React from 'react'
import '../styles/SearchBar.css'


function SearchBar() {

  const handlekey = (e) => {

      alert('Tecla Enter funcionando!')

  }

  return (
    
      <div className="search-bar">
      <input
        type="search"
        title='Barra de pesquisa'
        aria-label='Barra de pesquisa'
        className="search-input"
        placeholder="Pesquisar..."
      />
      <img className='IconSearch' src="./img/lupa.png" alt="Pesquisar" />
    </div>
    
  )
}

export default SearchBar