import { createBrowserRouter, useLocation, RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import Home from "../pages/Home";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaLogin from "../pages/TelaLogin";
import TelaCadastroEmpresa from "../pages/TelaCadastroEmpresa";
import TelaUsuarioOuEmpresaLogin from "../pages/TelaUsuarioOuEmpresaLogin";
import Gerenciamento from "../pages/Gerenciamento";

const PageWrapper = ({ element, screenName }) => {
  const location = useLocation();

  useEffect(() => {
    const announcer = document.getElementById('screen-reader-announcement');
    if (announcer) announcer.textContent = `Você está na página ${screenName}`;
  }, [location, screenName]);

  return element;
};

const Routes = createBrowserRouter([
  {path: '/', element: <PageWrapper element={ <Home />} screenName='Tela de início'/> },
  {path: '/TelaLogin', element: <PageWrapper element={ <TelaLogin />} screenName='Tela de login para usuários'/>},
  { path: '/CadastroUser', element: <PageWrapper element={ <TelaCadastro />} screenName='Tela de cadastro para usuários' /> },
  { path: '/CadastroEmpresa', element: <PageWrapper element={ <TelaCadastroEmpresa />} screenName='Tela de cadastro para empresas' /> },
  { path: '/CriarEvento', element: <PageWrapper element={ <CriarEvento />} screenName='Tela de criação de eventos'/> },
  { path: '/EscolhaCadastro', element: <PageWrapper element={ <TelaUsuarioOuEmpresa />} screenName='Tela de escolha, forma de cadastro' /> },
  { path: '/EscolhaLogin', element: <PageWrapper element={ <TelaUsuarioOuEmpresaLogin />} screenName='Tela de escolha, forma de login' /> },
  { path: '/GerenciamentoUser', element: <PageWrapper element={ <Gerenciamento/>} screenName='Tela de gerenciamento de perfil do usuário'/> },
]);

export default Routes;
