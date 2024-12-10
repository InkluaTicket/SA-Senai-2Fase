import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventosPendentes from '../components/EventosPendentes';
import NavbarPeinelMod from '../components/NavbarPeinelMod';
import '../styles/PainelModerador.css';
import CarrosselEventosSolicitados from '../pages/CarrosselEventosSolicitados';


function PainelModerador() {

    const navigate = useNavigate();

    const Logout = () => {

     localStorage.removeItem('tokenAdm')

     navigate('/')


    }

   


  return (

    <>
    
    <NavbarPeinelMod/>
    
    <div>
      <h1 className='administracaoEventos'>Administração de eventos</h1>
      <h1 className='sairPainelMod'>SAIR DA CONTA</h1>

      
          <CarrosselEventosSolicitados/>
      
     
          <EventosPendentes/>
       

      <img onClick={Logout} className='iconSairPainelMod' src="./img/icon-LogOut.png" />

    </div>
    
    </>


    
  )
}

export default PainelModerador
