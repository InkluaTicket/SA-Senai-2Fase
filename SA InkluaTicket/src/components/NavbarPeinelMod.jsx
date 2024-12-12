import React from 'react'
import '../styles/NavbarPeinelMod.css';
import { Link } from 'react-router-dom';

function NavbarPeinelMod() {
  return (
    <div>

      <div className='navbar-containerPainelM'>
      
      <div className='teste-painelMod'>

      <Link to='/'> <img className='voltarPainelM' src="./img/arrow_back (2).png" alt="" /></Link>
      <h1 className='painelModerador'>Painel moderador</h1>

      </div>

      <div><img className='logoPeinelMod' src="./img/InKlua.png" alt="" /></div>

    </div>

    </div>
  )
}

export default NavbarPeinelMod
