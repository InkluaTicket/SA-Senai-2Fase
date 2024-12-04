import React from 'react'
import '../styles/PerfilEmpresa.css';
import NavbarPerfilEmpresa from '../components/NavbarPerfilEmpresa';

function PerfilEmpresa() {
  return (
    <div>
      <NavbarPerfilEmpresa/>
<div className='Corpo-containerEmpresa'>

<div className='div1Emp'>

  <img className='iconEmp' src="./img/fotoUser.png" />
  <img className='verificadoEmp' src="./img/verif-empresa.png"/>
  <p className='nomeEmp'>InKluaTicket</p>


  <label className='labelEmp'>Email para contato:</label>
  <input className='inptsEmp' type="text" />

  <label className='labelEmp'>Telefone para contato:</label>
  <input className='inptsEmp' type="text" />

  <label className='labelEmp'>Endereço fiscal:</label>
  <input className='inptsEmp' type="text" />

</div>


<div className="divLinhaEmp"></div>


<div className='div2Emp'>
  
  <h1 className='Frase1Emp'>Proteja as informações da sua empresa!</h1>

  <p className='Texto1Emp'>Garanta que apenas pessoas autorizadas tenham acesso a este perfil. 
  Suas informações são tratadas com segurança e utilizadas para otimizar a gestão de sua empresa.</p>

    <h1 className='Frase2Emp'>Mantenha os dados atualizados!</h1>
  
  <p className='Texto2Emp'>Informações precisas garantem uma comunicação eficiente e uma experiência mais personalizada para sua empresa e seus clientes.</p>

  <button className='gerenciarEmp'>Gerenciar Perfil</button>
  <img className='iconGerenciarEmp' src="./img/gerenciamentoUser.png"/>
  
  
</div>


</div>
      
    </div>
  )
}

export default PerfilEmpresa
