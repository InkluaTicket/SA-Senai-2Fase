import React, { useEffect, useState } from 'react'
import '../styles/VisualizarPerfilEmpresa.css';
import NavbarPefil from './NavbarPerfil';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

function VisualizarPerfilEpresa() {

  
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
    <>
      <NavbarPefil />
      <div className='Corpo-containerUser'>

        <div className='divUmUser'>
          <div className="posidivUmUser">

            <div className='ImagemENomeEmpresa'>
              <img className='iconEmp' src="./img/fotoUser.png" />
              <img className='verificadoEmp' src="./img/verif-empresa.png" />
              <p tabIndex={0} aria-label='Nome da empresa' className='nomeEmp'>apagar{Empresa.nome}</p>
            </div>

            <label className='labelEmp'>Email para contato:</label>
            <input tabIndex={0} aria-label='Email da empresa' className='inptsEmp' type="text" aria-disabled='true' value={Empresa.email} />

            <label className='labelEmp'>Telefone para contato:</label>
            <input tabIndex={0} aria-label='Telefone da empresa' className='inptsEmp' type="text" aria-disabled='true' value={Empresa.telefone} />

            <label className='labelEmp'>Endereço fiscal:</label>
            <input tabIndex={0} aria-label='Endereço da empresa' className='inptsEmp' type="text" aria-disabled='true' value={Empresa.endereco} />

          </div>
        </div>

        <div className='divDoisUser'>
          <img src="./img/mãos .png" className="imagemsUmPerfilEmp" />
        </div>

      </div>
    </>
  )
}

export default VisualizarPerfilEpresa