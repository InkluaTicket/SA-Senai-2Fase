import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import EscolhaLogin from "../pages/EscolhaLogin";
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaCadastro from "../pages/TelaCadastro"



const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/EscolhaLogin', element: <EscolhaLogin/>},
{path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa/>},
{path: 'CadastroUser', element: <TelaCadastro/>}


])

export default Routes;