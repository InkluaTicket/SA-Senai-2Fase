import React from 'react'
import '../styles/NavbarPerfilEmpresa.css';
import { Link } from 'react-router-dom';

function NavbarPerfilEmpresa() {
  return (
    <div>
      <div className='navbar-containerEmpresa'>
      
      <div className='div-navbarEmp'>

     <Link to='/'>  <img className='voltarNavEmp' src="./img/arrow_back (2).png" alt="" /></Link>
      <h1 className='perfilEmpresa'>Perfil Empresarial</h1>

      </div>

      <div><img className='logo' src="./img/InKlua.png" alt="" /></div>

    </div>
    </div>
  )
}

export default NavbarPerfilEmpresa
