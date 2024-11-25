import React from 'react'
import '../styles/NavbarHome.css'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';

function NavbarHome() {


    return (
        <>

            <header className='ContainerHome'>

                <div className='EndElementsHome'>
                    <img className='LogoFundoAzulHome' src="./img/LogoInkluaAzul.png" alt="Logo Inklua" />
                    <SearchBar />
                </div>

                <nav className='InfosHome'>
                    <Link role='button' tabIndex={0} className='InfosNavHome'>Criar seu evento</Link>
                    <li className='separadorHome'></li>
                    <Link tabIndex={0} className='InfosNavHome'>Acessar minha conta</Link>
                    <li className='separadorHome'></li>
                    <Link tabIndex={0} className='InfosNavHome'>Cadastrar-se</Link>
                </nav>

            </header>

        </>
    )
}

export default NavbarHome;
