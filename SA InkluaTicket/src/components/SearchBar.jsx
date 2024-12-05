import React, { useState } from 'react'
import '../styles/SearchBar.css'


function SearchBar() {

  const [Pesquisa, setPesquisa] = useState('')
  const [Resultados, setResultados] = useState([])
  

  return (
    
      <div className="search-bar">
      <input
        type="search"
        title='Barra de pesquisa'
        aria-label='Barra de pesquisa'
        className="search-input"
        onChange={(e) => setPesquisa(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && alert('InkluaTicket')}
        placeholder="Pesquisar..."
      />
      <button className='search-button'>
      <img className='IconSearch' src="./img/lupa.png" alt="Pesquisar" /></button>
    </div>
    
  )
}

export default SearchBar