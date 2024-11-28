import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div>
      <header className="ContainerHome">
        <div className="EndElementsHome">

          <Link to="/">
            <img src="./img/seta.png" alt="voltar" className="seta" />
          </Link>

          <img
            className="LogoFundoAzulHome"
            src="./img/logo.png"
            alt="Logo Inklua"
          />

        </div>
      </header>
    </div>
  );
}

export default Navbar;
