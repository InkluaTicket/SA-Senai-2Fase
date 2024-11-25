import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import SobreNos from "../pages/SobreNos";
import CriarEvento from "../pages/CriarEvento";

const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/SobreNos', element: <SobreNos/>},
{path: '/CriarEvento', element: <CriarEvento/>},

])

export default Routes;