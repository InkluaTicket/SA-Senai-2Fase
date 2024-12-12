import React from 'react'
import '../styles/Navbar2.css'
import { Link, useNavigate } from 'react-router-dom'

function NavbarPefil() {
const navigate = useNavigate();


  return (
    <div className='navbar-container'>
      
      <div className='teste'>

     <button aria-label='Voltar' style={{background: 'none',
        border: 'none',
        cursor: 'pointer',}} onClick={() => navigate(-1)} > <img className='voltar' src="/img/arrow_back (2).png" alt="" /></button>
      <h1 className='gerenciamentoDaConta'>Perfil de usuário</h1>

      </div>

      <div><img className='logo' src="./img/InKlua.png" alt="" /></div>

    </div>
  )
}

export default NavbarPefil