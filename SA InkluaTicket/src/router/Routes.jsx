import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import EscolhaLogin from "../pages/EscolhaLogin";
import TelaLogin from "../pages/TelaLogin";

const Routes = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/EscolhaLogin', element: <EscolhaLogin /> },
  {path: '/TelaLogin', element: <TelaLogin/>},
  { path: '/CadastroUser', element: <TelaCadastro /> },
  { path: '/CriarEvento', element: <CriarEvento /> },
  { path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa /> },
]);

export default Routes;
