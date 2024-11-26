import React from 'react';
import '../styles/NavbarHome.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function NavbarHome() {
    return (
        <header className="ContainerHome">
            <div className="EndElementsHome">
                <img
                    className="LogoFundoAzulHome"
                    src="./img/logo.png"
                    alt="Logo Inklua"
                />
                <SearchBar />
            </div>

            <nav className="InfosHome">
                
                <Link to="CriarEvento" role="button" tabIndex={0} className="InfosNavHome">
                    Criar seu evento
                </Link>

                <div className="separadorHome"></div>

                <Link to="/login" tabIndex={0} className="InfosNavHome">
                    Acessar minha conta
                </Link>

                <div className="separadorHome"></div>

                <Link to="/signup" tabIndex={0} className="InfosNavHome">
                    Cadastrar-se
                </Link>

            </nav>
        </header>
    );
}

export default NavbarHome;
