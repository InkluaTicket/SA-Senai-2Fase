import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import '../styles/EscolhaCadastro.css'

function EscolhaCadastro() {

  useEffect(() => {
    // Adiciona a classe ao body ao montar o componente
    document.body.classList.add('escolhaCadastroBody');

    // Remove a classe ao desmontar o componente
    return () => {
      document.body.classList.remove('escolhaCadastroBody');
    };
  }, []);


  return (
    <div className='BodyEscolhaCad'>

      <Link to='/'><img src="../img/arrow_back.png" alt="" /></Link>

      <h1>Escolher forma de cadastro</h1>

      <Link to='/CadastroUser'>Usuário</Link>

    </div>
  )
}

export default EscolhaCadastro
