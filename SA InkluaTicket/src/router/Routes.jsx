import { createBrowserRouter, useLocation, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Home from "../pages/Home";
import CriarEvento from "../pages/CriarEvento";
import Gerenciamento from "../pages/Gerenciamento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaUsuarioOuEmpresaLogin from "../pages/TelaUsuarioOuEmpresaLogin";
import TelaCadastro from "../pages/TelaCadastro";
import TelaLogin from "../pages/TelaLogin";
import TelaCadastroEmpresa from "../pages/TelaCadastroEmpresa";
import TelaLoginEmpresa from "../pages/TelaLoginEmpresa";
import Perfil from "../pages/Perfil";
import PerfilEmpresa from "../pages/PerfilEmpresa";

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
  { path: '/GerenciamentoUser', element: <PageWrapper element={ <Gerenciamento/>} screenName='Tela de gerenciamento de perfil do usuário'/> },
  { path: '/PerfilUser', element: <PageWrapper element={ <Perfil/>} screenName='Tela de gerenciamento de perfil do usuário'/> },
  { path: '/PerfilEmpresa', element: <PageWrapper element={ <PerfilEmpresa/>} screenName='Tela de perfil da empresa'/> },
]);

export default Routes;
