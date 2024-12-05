import React, { useState, useEffect } from 'react'
import '../styles/PerfilEmpresa.css';
import jwt_decode from 'jwt-decode'
import NavbarPerfilEmpresa from '../components/NavbarPerfilEmpresa';

function PerfilEmpresa() {

  
  const [Empresa, setEmpresa] = useState('')
  const token = localStorage.getItem('tokenEmpresa')


  const Renderizar = async () => {

    try {
      const response = await fetch('http://localhost:3000/perfilEmpresa', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      });

      if (response.ok) {

          const EmpresaData = await response.json();
          setEmpresa(EmpresaData)
        
    }
  }

    catch (err) {

      console.error('Erro ao buscar empresa', err)

    }

  }


  useEffect(() => {

    Renderizar();


  }, [])

  return (
    <div>
      <NavbarPerfilEmpresa/>
<div className='Corpo-containerEmpresa'>

<div className='div1Emp'>

<div className='ImagemENome'>  
  <img className='iconEmp' src="./img/fotoUser.png" />
  <img className='verificadoEmp' src="./img/verif-empresa.png"/>
  <p className='nomeEmp'>{Empresa.nome}</p>
</div>

  <label className='labelEmp'>Email para contato:</label>
  <input className='inptsEmp' type="text" disabled value={Empresa.email} />

  <label className='labelEmp'>Telefone para contato:</label>
  <input className='inptsEmp' type="text" disabled value={Empresa.telefone}/>

  <label className='labelEmp'>Endereço fiscal:</label>
  <input className='inptsEmp' type="text" disabled value={Empresa.endereco}/>

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
