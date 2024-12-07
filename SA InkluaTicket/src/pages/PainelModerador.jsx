import React from 'react'
import { useNavigate } from 'react-router-dom'

function PainelModerador() {

    const navigate = useNavigate();

    const Logout = () => {

     localStorage.removeItem('tokenAdm')

     navigate('/')


    }



  return (
    <div>
      <h1>Painel Moderador</h1>

      <button onClick={Logout}>Sair da conta</button>

    </div>
  )
}

export default PainelModerador
