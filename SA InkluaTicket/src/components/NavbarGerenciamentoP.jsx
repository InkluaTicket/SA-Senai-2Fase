import React from 'react'
import '../styles/NavbarGerenciamentoP.css';
import { Link } from 'react-router-dom';

function NavbarGerenciamentoP() {
  return (
    <div>
    <div className='navbar-containerGP'>
      
      <div className='teste'>

      <Link to='/PerfilUser'> <img className='voltarGPU' src="./img/arrow_back (2).png" alt="" /></Link>
      <h1 className='gerenciamentoDaContaUser'>Gerenciamento da conta</h1>

      </div>

      <div><img className='logoGP' src="./img/InKlua.png" alt="" /></div>

    </div>
    </div>
  )
}

export default NavbarGerenciamentoP
