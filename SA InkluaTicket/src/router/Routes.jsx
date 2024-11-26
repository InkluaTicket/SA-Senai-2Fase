import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import EscolhaLogin from "../pages/EscolhaLogin";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import TelaCadastro from "../pages/TelaCadastro"



const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/EscolhaLogin', element: <EscolhaLogin/>},
{path: '/EscolhaCadastro', element: <EscolhaCadastro/>},
{path: 'CadastroUser', element: <TelaCadastro/>}


])

export default Routes;