import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Routes from './router/Routes.jsx'
import NomeDasTelasLeitor from './components/NomeDasTelasLeitor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NomeDasTelasLeitor/>
    <RouterProvider router={Routes} />
  </StrictMode>,
)
