import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import EscolhaLogin from "../pages/EscolhaLogin";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";



const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/EscolhaLogin', element: <EscolhaLogin/>},
{path: '/EscolhaCadastro', element: <EscolhaCadastro/>},
{path: '/CadastroUser', element: <TelaCadastro/>},
{path: '/CriarEvento', element: <CriarEvento/>},


])

export default Routes;