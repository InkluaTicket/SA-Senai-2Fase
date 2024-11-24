import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "../pages/Home";
import SobreNos from "../pages/SobreNos";

const Routes = createBrowserRouter([

{path: '/', element: <Home/>},
{path: '/sobre', element: <SobreNos/>},

])

export default Routes;