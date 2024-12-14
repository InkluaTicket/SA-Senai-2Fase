import '../styles/Home.css'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBarForHome from '../components/NavbarForHome'
import CarrosselEventosEmAlta from './CarrosselEventosEmAlta';
import CarrosselShows from './CarrosselShows';
import CarrosselFestivais from './CarrosselFestivais';
import CarrosselEventos from './CarrosselEventos';
import Rodape from '../components/Rodape';
import EventosAceitos from '../components/EventosAceitos';
import EventosEsportes from '../components/EventosEsportes';
import EventosShows from '../components/EventosShows';
import EventosTecnologia from '../components/EventosTecnologia';
import CardEventosFestivais from '../components/CardEventosFestivais';
import EventosSaude from '../components/EventosSaude';
import EventosEducacao from '../components/EventosEducacao';

function Home() {


  const UpdatePageTitle = ({ title }) => {
    const location = useLocation();
  
    useEffect(() => {
      document.title = title; // Atualiza o título da página
    }, [title, location]);
  
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])

  return (
    <div>
      <UpdatePageTitle title="Página Inicial - InkluaTicket" />
      <NavBarForHome/>
      <CarrosselEventosEmAlta/>
      <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Shows</h1>
      <EventosShows/>
      <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Esportes</h1>
      <EventosEsportes/> 
      <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Festivais</h1>
      <CardEventosFestivais/>
      <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Educação</h1>
     <EventosEducacao/>  
     <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Tecnologia</h1>
     <EventosTecnologia/>  
     <h1 tabIndex={0} style={{color: '#024959'}} className='carrosselShFeEvTEXTO'>Saúde</h1>
      <EventosSaude/>
     
      <Rodape/>
    </div>
  )
}

export default Home
