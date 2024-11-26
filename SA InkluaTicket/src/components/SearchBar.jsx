import React from 'react'
import '../styles/SearchBar.css'


<<<<<<< HEAD
function SearchBar() {

  const handlekey = (e) => {

      alert('Tecla Enter funcionando!')

  }

  return (
    
      <div className="search-bar">
=======

function SearchBar() {

  return (
      <div className='barra-pesquisa'>
>>>>>>> 55b652dcf04a2d9a2e78198d542134e30daecd32
      <input
        type="search"
        title='Barra de pesquisa'
        aria-label='Barra de pesquisa'
        className="search-input"
        placeholder="Pesquisar..."
<<<<<<< HEAD
      />
      <button className="search-button" onClick={handlekey}><img className='IconSearch' src="./img/Vector.png" alt="Pesquisar" /></button>
    </div>
    
  )
}

export default SearchBar
=======
        tabindex="1"
      />
      
      <button className="search-button"><img src="./img/lupa.png" alt="Pesquisar" className='lupa' /></button>
    </div>

  )
}

export default SearchBar;
>>>>>>> 55b652dcf04a2d9a2e78198d542134e30daecd32
