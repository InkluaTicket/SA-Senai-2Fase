import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EventosPendentes from '../components/EventosPendentes';
import NavbarPeinelMod from '../components/NavbarPeinelMod';
import '../styles/PainelModerador.css';
import CarrosselEventosSolicitados from '../pages/CarrosselEventosSolicitados';
import CarrosselEventosAtivosMod from './CarrosselEventosAtivosMod';


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
          
          <CarrosselEventosAtivosMod/>
      
     
          <EventosPendentes/>
       

      <img onClick={Logout} className='iconSairPainelMod' src="./img/icon-LogOut.png" />

      <h1 className='Titulo1PainelMod'>Critérios de avaliação</h1>

      <p className='Texto1PainelMod'>Ao planejar e executar eventos inclusivos, é fundamental considerar a acessibilidade 
        como um componente central do projeto. Abaixo estão os critérios de avaliação que devem ser utilizados para garantir 
        que o evento atenda às necessidades de pessoas com deficiência, promovendo a inclusão e a igualdade de participação.</p>

      <p className='Titulo2PainelMod'>1- Planejamento e Organização:</p>
      <p className='Texto1Planejamento'>Identificar as necessidades de diferentes deficiências.</p>
      <p className='Texto2Planejamento'>Capacitar a equipe e consultar especialistas em acessibilidade.</p>

      <p className='Titulo3PainelMod'>2- Infraestrutura Acessível:</p>
      <p className='Texto1Infraestrutura'>Garantir rampas, elevadores, banheiros adaptados e sinalização inclusiva (braille e contrastes).</p>
      <p className='Texto2Infraestrutura'>Reservar vagas de estacionamento próximas para PCD.</p>

      <p className='Titulo4PainelMod'>3- Comunicação Inclusiva:</p>
      <p className='Texto1Comunicacao'>Disponibilizar intérpretes de Libras e legendas em tempo real.</p>
      <p className='Texto2Comunicacao'>Oferecer materiais acessíveis, como braille, áudio-descrição ou textos simplificados.</p>

      <p className='Titulo6PainelMod'>5- Experiência do Público:</p>
      <p className='Texto1Experiencia'>Garantir acesso facilitado ao local e equipe de apoio treinada.</p>
      <p className='Texto2Experiencia'>Avaliar a experiência das PCD após o evento.</p>

    </div>
    
    </>


    
  )
}

export default PainelModerador
