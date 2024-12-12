import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-containerGerenc">
      <div className="testeGerenc">
        <div >
          <img className="voltarGerenc" src="./img/arrow_back (2).png" alt="" />
        </div>
        <img className="logo" src="./img/InKlua.png" alt="" />
      </div>
    </div>
  );
}
