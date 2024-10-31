import React from 'react'
import './NavbarForEvent.css'

function NavbarForEvent() {

const handlekey = () => {


  alert('Tecla Enter funcionando!')

}

  return (
<>

<header className='Container'>

  <nav className=''>

    <button className='Voltar' onClick={handlekey}><img className='Voltar' src="./img/arrow_back.png" alt="Voltar" /></button>
    <img className='LogoFundoAzul' src="./img/LogoInkluaAzul.png" alt="" />

    

  </nav>

    <nav className='Infos'>

      <a tabIndex={0} className='InfosNav' onClick={handlekey}>Acessar minha conta</a>
      <li className='separador'></li>
      <a tabIndex={0} className='InfosNav' onClick={handlekey}>Cadastrar</a>

    </nav>
    



</header>
 
</>
  )
}

export default NavbarForEvent