import React from 'react'
import './NavbarForEvent.css'

function NavbarForEvent() {
  return (
<>

<header className='Container'>

  <div className=''>

    <img className='Voltar' src="./img/arrow_back.png" alt="" />
    <img className='LogoFundoAzul' src="./img/LogoInkluaAzul.png" alt="Voltar" />

    

  </div>

    <nav className='Infos'>

      <a className='InfosNav'>Entrar</a>
      <li className='separador'></li>
      <a className='InfosNav'>Cadastrar</a>

    </nav>
    



</header>
 
</>
  )
}

export default NavbarForEvent