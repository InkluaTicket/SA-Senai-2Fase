import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import EscolhaLogin from "../pages/EscolhaLogin";
<<<<<<< HEAD
import EscolhaCadastro from "../pages/EscolhaCadastro";
import TelaCadastro from "../pages/TelaCadastro";
import CriarEvento from "../pages/CriarEvento";
=======
import TelaUsuarioOuEmpresa from "../pages/TelaUsuarioOuEmpresa";
import TelaCadastro from "../pages/TelaCadastro"
>>>>>>> 18205c851b2aab620355d22b94a597d46332fb93



const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/EscolhaLogin', element: <EscolhaLogin/>},
<<<<<<< HEAD
{path: '/EscolhaCadastro', element: <EscolhaCadastro/>},
{path: '/CadastroUser', element: <TelaCadastro/>},
{path: '/CriarEvento', element: <CriarEvento/>},
=======
{path: '/EscolhaCadastro', element: <TelaUsuarioOuEmpresa/>},
{path: 'CadastroUser', element: <TelaCadastro/>}
>>>>>>> 18205c851b2aab620355d22b94a597d46332fb93


])

export default Routes;