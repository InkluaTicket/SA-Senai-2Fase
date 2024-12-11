import { createBrowserRouter, useLocation, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Home from "../pages/Home";
import CriarEvento from "../pages/CriarEvento";
import Gerenciamento from "../pages/Gerenciamento";
import GerenciamentoEmpresa from "../pages/GerenciamentoEmpresa";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaUsuarioOuEmpresaLogin from "../pages/TelaUsuarioOuEmpresaLogin";
import TelaCadastro from "../pages/TelaCadastro";
import TelaLogin from "../pages/TelaLogin";
import TelaCadastroEmpresa from "../pages/TelaCadastroEmpresa";
import TelaLoginEmpresa from "../pages/TelaLoginEmpresa";
import PerfilUser from "../pages/PerfilUser";
import PerfilEmpresa from "../pages/PerfilEmpresa";
import VisualizarPerfilUsuario from "../pages/VisualizarPerfilUsuario";
import VisualizarPerfilEmpresa from "../pages/VisualizarPerfilEmpresa";
import Shows from "../pages/Shows";
import PainelModerador from "../pages/PainelModerador";
import EventoDinâmico from "../pages/EventoDinâmico";

const PageWrapper = ({ element, screenName }) => {
  const location = useLocation();

  useEffect(() => {
    const announcer = document.getElementById('screen-reader-announcement');
    if (announcer) announcer.textContent = `Você está na página ${screenName}`;
  }, [location, screenName]);

  return element;
};

const Routes = createBrowserRouter([
  { path: '/', element: <PageWrapper element={ <Home />} screenName='Tela de início'/> },
  { path: '/TelaLogin', element: <PageWrapper element={ <TelaLogin />} screenName='Tela de login para usuários'/>},
  { path: '/CadastroUser', element: <PageWrapper element={ <TelaCadastro />} screenName='Tela de cadastro para usuários' /> },
  { path: '/LoginEmpresa', element: <PageWrapper element={ <TelaLoginEmpresa />} screenName='Tela de login para Empresa'/>},
  { path: '/CadastroEmpresa', element: <PageWrapper element={ <TelaCadastroEmpresa />} screenName='Tela de cadastro para Empresa' /> },
  { path: '/CriarEvento', element: <PageWrapper element={ <CriarEvento />} screenName='Tela de criação de eventos'/> },
  { path: '/EscolhaCadastro', element: <PageWrapper element={ <TelaUsuarioOuEmpresa />} screenName='Tela de escolha, forma de cadastro' /> },
  { path: '/EscolhaLogin', element: <PageWrapper element={ <TelaUsuarioOuEmpresaLogin />} screenName='Tela de escolha, forma de login' /> },
  { path: '/GerenciamentoUser', element: <PageWrapper element={ <Gerenciamento/>} screenName='Tela de gerenciamento do petfil do usuário'/> },
  { path: '/GerenciamentoEmpre', element: <PageWrapper element={ <GerenciamentoEmpresa/>} screenName='Tela de gerenciamento do perfil da empresa'/> },
  { path: '/PerfilUser', element: <PageWrapper element={ <PerfilUser/>} screenName='Tela de perfil do usuário'/> },
  { path: '/VisualizarPerfilUsuario', element: <PageWrapper element={ <VisualizarPerfilUsuario/>} screenName='Tela de perfil do usuário para Visualizar'/> },
  { path: '/VisualizarPerfilEmpresa', element: <PageWrapper element={ <VisualizarPerfilEmpresa/>} screenName='Tela de perfil do usuário para Visualizar Empresa'/> },
  { path: '/Shows', element: <PageWrapper element={ <Shows/>} screenName='Tela de perfil da empresa'/> },
  { path: '/PerfilEmpresa', element: <PageWrapper element={ <PerfilEmpresa/>} screenName='Tela de perfil da empresa'/> },
  { path: '/PainelModerador', element: <PageWrapper element={ <PainelModerador/>} screenName='Tela de painel do moderador'/> },
  {path: '/eventosAceitos/:id', element: <PageWrapper element={ <EventoDinâmico/>} screenName='Tela de evento'/>}
]);

export default Routes;
