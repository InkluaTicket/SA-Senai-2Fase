import React from 'react'
import { Link } from 'react-router-dom'

function NavbarPerfil2() {
  return (
    <div className='navbar-container'>
      
    <div className='teste'>

   <Link  to='/' > <img className='voltar' src="/img/arrow_back (2).png" alt="" /></Link>
    <h1 className='gerenciamentoDaConta'>Perfil de usuário</h1>

    </div>

    <div><img className='logo' src="./img/InKlua.png" alt="" /></div>

  </div>
)
}
 

export default NavbarPerfil2
