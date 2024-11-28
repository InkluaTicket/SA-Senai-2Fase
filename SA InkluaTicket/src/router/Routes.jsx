import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import EscolhaLogin from "../pages/EscolhaLogin";  // Importação da página que estava faltando

const Routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/EscolhaLogin', element: <EscolhaLogin /> },

  { path: '/CadastroUser', element: <TelaCadastro /> },
  { path: '/CriarEvento', element: <CriarEvento /> },
  { path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa /> },
]);

export default Routes;
