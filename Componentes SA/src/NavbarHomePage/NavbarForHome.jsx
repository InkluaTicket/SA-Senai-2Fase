import React from 'react'
import './NavbarForHome.css'
import SearchBar from './SearchBar'

function NavBarForHome() {

  const handlekey = () => {
  
    alert('Tecla Enter funcionando!')

  }
  

  return (
    <>

    <header className='ContainerHome'>

      <div className='EndElementsHome'>

 
        <img className='LogoFundoAzulHome' src="./img/LogoInkluaAzul.png" alt="Logo Inklua" />

        <SearchBar/>

      </div>

      

        <nav className='InfosHome'>

          <a role='button' tabIndex={0} className='InfosNavHome' onClick={handlekey}>Criar seu evento</a>

          <li className='separadorHome'></li>

          <a tabIndex={0} className='InfosNavHome' onClick={handlekey}>Acessar minha conta</a>

          <li className='separadorHome'></li>

          <a tabIndex={0} className='InfosNavHome' onClick={handlekey}>Cadastrar</a>
 
        </nav>
        

   

    </header>
     
    </>
  )
}

export default NavBarForHome
