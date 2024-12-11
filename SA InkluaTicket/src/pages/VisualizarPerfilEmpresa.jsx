import React, { useEffect, useState } from 'react'
import '../styles/VisualizarPerfilEmpresa.css';
import NavbarEmpresa from './NavbarEmpresa';
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
      <NavbarEmpresa />
      <div className='Corpo-containerUser'>

        <div className='divUmUser'>
          <div className="posidivUmUser">

            <div className='ImagemENomeEmpresaAcesso'>
              <img className='iconEmpAcesso' src="./img/fotoUser.png" />
              <img className='verificadoEmpAcesso' src="./img/verif-empresa.png" />
              <p tabIndex={0} aria-label='Nome da empresa' className='nomeEmpAcesso'>apagar{Empresa.nome}</p>
            </div>

            <label className='labelEmp'>Email para contato:</label>
            <input tabIndex={0} aria-label='Email da empresa' className='inptsEmpAcesso' type="text" aria-disabled='true' value={Empresa.email} />

            <label className='labelEmp'>Telefone para contato:</label>
            <input tabIndex={0} aria-label='Telefone da empresa' className='inptsEmpAcesso' type="text" aria-disabled='true' value={Empresa.telefone} />

            <label className='labelEmp'>Endereço fiscal:</label>
            <input tabIndex={0} aria-label='Endereço da empresa' className='inptsEmpAcesso' type="text" aria-disabled='true' value={Empresa.endereco} />

          </div>
        </div>

        <div className='divDoisUser'>
          <img src="./img/imgEmpresa.png" className="imagemsUmPerfilEmpAcesso" />
        </div>

      </div>
    </>
  )
}

export default VisualizarPerfilEpresa