import React from 'react'
import '../styles/NavbarGerenEmpre.css';
import { Link } from 'react-router-dom';

function NavbarGerenEmpre() {
  return (
    <div>

      <div className='navbar-containerGE'>
      
      <div className='teste-gerenEmpr'>

      <Link to='/PerfilEmpresa'> <img className='voltarGE' src="./img/arrow_back (2).png" alt="" /></Link>
      <h1 className='gerenciamentoDaContaEmpresa'>Gerenciamento da conta de empresa</h1>

      </div>

      <div><img className='logoGE' src="./img/InKlua.png" alt="" /></div>

    </div>

    </div>
  )
}

export default NavbarGerenEmpre
