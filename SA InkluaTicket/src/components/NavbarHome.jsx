import React from 'react';
import '../styles/NavbarHome.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="Navbar">
                <img src="./img/logo.png" className="logo" alt="Logo do evento" />
            </nav>
        </>


    );
}

export default Navbar;
