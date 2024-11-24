import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="Navbar">
            <Link to="/" aria-label="Voltar para a tela inicial">
                <img src="./img/seta.png" className="seta" alt="Ícone de seta para voltar" />
            </Link>
            <img src="./img/logo.png" className="logo" alt="Logo do evento" />
            
        </nav>
    );
}

export default Navbar;
