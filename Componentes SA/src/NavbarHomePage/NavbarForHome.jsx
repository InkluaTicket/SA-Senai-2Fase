import React from 'react'
import './NavbarForHome.css'
import SearchBar from './SearchBar'

function NavBarForHome() {
  return (
    <>

    <header className='ContainerHome'>

      <div className='EndElementsHome'>

 
        <img className='LogoFundoAzulHome' src="./img/LogoInkluaAzul.png" alt="" />

        <SearchBar/>

      </div>

      

        <nav className='InfosHome'>

          <a className='InfosNavHome'>Criar seu evento</a>

          <li className='separadorHome'></li>

          <a className='InfosNavHome'>Entrar</a>

          <li className='separadorHome'></li>

          <a className='InfosNavHome'>Cadastrar</a>
 
        </nav>
        

   

    </header>
     
    </>
  )
}

export default NavBarForHome
