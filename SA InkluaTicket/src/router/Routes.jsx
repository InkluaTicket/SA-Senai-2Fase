import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
<<<<<<< HEAD
import EscolhaLogin from "../pages/EscolhaLogin";
import EscolhaCadastro from "../pages/EscolhaCadastro";
import TelaCadastro from "../pages/TelaCadastro"


=======
import SobreNos from "../pages/SobreNos";
import CriarEvento from "../pages/CriarEvento";
>>>>>>> 55b652dcf04a2d9a2e78198d542134e30daecd32

const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
<<<<<<< HEAD
{path: '/EscolhaLogin', element: <EscolhaLogin/>},
{path: '/EscolhaCadastro', element: <EscolhaCadastro/>},
{path: 'CadastroUser', element: <TelaCadastro/>}

=======
{path: '/SobreNos', element: <SobreNos/>},
{path: '/CriarEvento', element: <CriarEvento/>},
>>>>>>> 55b652dcf04a2d9a2e78198d542134e30daecd32

])

export default Routes;