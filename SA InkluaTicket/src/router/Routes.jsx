import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaLogin from "../pages/TelaLogin";
import TelaUsuarioOuEmpresaLogin from "../pages/TelaUsuarioOuEmpresaLogin";

const Routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  {path: '/TelaLogin', element: <TelaLogin/>},
  { path: '/CadastroUser', element: <TelaCadastro /> },
  { path: '/CriarEvento', element: <CriarEvento /> },
  { path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa /> },
  { path: '/EscolhaLogin', element: <TelaUsuarioOuEmpresaLogin /> },
  
]);

export default Routes;
