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
      <EventosShows/>
      <EventosEsportes/>
      <CarrosselShows/>
      <CarrosselFestivais/>
      <CarrosselEventos/>

      
     
      <Rodape/>
    </div>
  )
}

export default Home
