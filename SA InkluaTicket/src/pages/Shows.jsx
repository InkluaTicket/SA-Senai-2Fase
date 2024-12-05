import React from "react";
import Navbar from "../components/Navbar.jsx";
import "../styles/Shows.css";

function Shows() {
  return (
    <div>
      <Navbar />
      <div className="img-container">
        <img 
        src="./img/ClimaCarbono.png" 
        className="img-frente" 
        />
      </div>

      <div>
        <img
          src="./img/ClimaCarbono2.png"
          className="img-fundo"
          alt="Imagem do evento"
        />
      </div>

      <div className="content"></div>
    </div>
  );
}

export default Shows;
