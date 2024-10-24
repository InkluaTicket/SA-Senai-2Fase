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

      <li className='InfosNav'>Entrar</li>
      <li className='separador'></li>
      <li className='InfosNav'>Cadastrar</li>

    </nav>
    



</header>
 
</>
  )
}

export default NavbarForEvent