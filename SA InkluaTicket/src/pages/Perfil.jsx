import React from 'react'
import '../styles/Perfil2.css';
import NavbarPefil from './NavbarPerfil';
import { Link } from 'react-router-dom';

function Perfil() {
  return (
    <>  

<NavbarPefil/>
<div className='Corpo-containerUser'>



<div className='divUmUser'>

  <img className='iconUser' src="./img/fotoUser.png" alt="User Icon" /> <img className='verificado1User' src="./img/img logo.png" alt="" />
  <p className='nomeUser'>Juliana Peres</p>

  <label className='possuiDeficienciaUser'>Possui alguma deficiência?</label> <img className='verificado2User' src="./img/img logo.png" alt="" />
  
  <div className="checkBoxGroupUser">
  <div>
    <input type="checkbox" className="checkBoxUser" id="sim" />
    <label htmlFor="simUser">Sim</label>
  </div>
  <div>
    <input type="checkbox" className="checkBoxUser" id="nao" />
    <label htmlFor="naoUser">Não</label>
  </div>
</div>


  <label className='deficienciaUser'>Deficiência:</label>
  <input className='inptsUser' type="text" />


  <label className='detalhesUser'>Detalhes:</label>
  <input className='inptsUser' type="text" />

</div>


<div className="divLinhaUser"></div>


<div className='divDoisUser'>
  
  <h1 className='Frase1User'>Mantenha suas informações seguras!</h1>

  <p className='Texto1User'>Evite compartilhar seus dados pessoais com outras pessoas. 
    Suas informações são protegidas e usadas apenas para 
    melhorar sua experiência.</p>

    <h1 className='Frase2User'>Atualização é importante!</h1>
  
  <p className='Texto2User'>Mantenha suas informações atualizadas para garantir uma 
  experiência mais personalizada e eficiente.</p>

  <Link to='/GerenciamentoUser' className='gerenciarUser'>Gerenciar Perfil</Link>
  <img className='iconGerenciarUser' src="./img/gerenciamentoUser.png"/>
  
  
</div>


</div>
</>
  )
}

export default Perfil