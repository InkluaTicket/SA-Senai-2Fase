import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaCadastro from "../pages/TelaCadastro"




const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/EscolhaLogin', element: <EscolhaLogin/>},

{path: '/CadastroUser', element: <TelaCadastro/>},
{path: '/CriarEvento', element: <CriarEvento/>},
{path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa/>},
{path: '/CadastroUser', element: <TelaCadastro/>}



])

export default Routes;