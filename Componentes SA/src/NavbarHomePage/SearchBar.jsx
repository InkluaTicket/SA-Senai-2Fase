import React from 'react'
import './SearchBar.css'


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
      <button className="search-button" onClick={handlekey}><img className='IconSearch' src="./img/Vector.png" alt="Pesquisar" /></button>
    </div>
    
  )
}

export default SearchBar
