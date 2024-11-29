import React from 'react'
import NavBarForHome from '../components/NavbarForHome'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css'

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
      <NavBarForHome/>
      AAAAAAA
      <UpdatePageTitle title="Página Inicial - InkluaTicket" />
    </div>
  )
}

export default Home
