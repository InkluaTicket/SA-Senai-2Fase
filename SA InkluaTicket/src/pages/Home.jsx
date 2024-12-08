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

function Home() {


  const UpdatePageTitle = ({ title }) => {
    const location = useLocation();
  
    useEffect(() => {
      document.title = title; // Atualiza o título da página
    }, [title, location]);
  
    return null;
  };

  return (
    <div>
      <UpdatePageTitle title="Página Inicial - InkluaTicket" />
      <NavBarForHome/>
      <CarrosselEventosEmAlta/>
      <CarrosselShows/>
      <CarrosselFestivais/>
      <CarrosselEventos/>
      <Rodape/>
    </div>
  )
}

export default Home
