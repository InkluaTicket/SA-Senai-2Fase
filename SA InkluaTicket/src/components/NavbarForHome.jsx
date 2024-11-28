import React from 'react'
import '../styles/NavbarForHome.css'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'


function NavBarForHome() {

  return (
    <>

    <header className='ContainerHome'>
      <div className='EndElementsHome'>
        <img className='LogoFundoAzulHome' src="./img/logo.png" alt="Logo Inklua" />
        <SearchBar/>
      </div>
        <nav className='InfosHome'>
          <Link to='/CriarEvento' tabIndex={0} className='InfosNavHome' >Criar seu evento</Link>
          <li className='separadorHome'></li>
          <Link to='/EscolhaLogin' tabIndex={0} className='InfosNavHome' >Acessar minha conta</Link>
          <li className='separadorHome'></li>
          <Link to='/EscolhaCadastro' tabIndex={0} className='InfosNavHome' >Cadastrar-se</Link>
        </nav>
    </header>
     
    </>
  )
}

export default NavBarForHome