<<<<<<< HEAD
=======
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
>>>>>>> 55b652dcf04a2d9a2e78198d542134e30daecd32
