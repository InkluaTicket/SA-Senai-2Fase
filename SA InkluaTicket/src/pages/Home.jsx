import React from 'react'
import '../styles/Home.css'
import NavBarForHome from '../components/NavbarForHome'
import Carrossel from '../pages/Carrossel';
import Rodape from '../components/Rodape';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
      <Carrossel/>
      <Rodape/>
    </div>
  )
}

export default Home
