import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar-containerGerenc">
      <div className="testeGerenc">
        <div >

         <button  aria-label="Voltar" style={{background: 'none',
        border: 'none',
        cursor: 'pointer',}} tabIndex={0} onClick={() => navigate(-1)}  ><img width={'60px'} src="/img/arrow_back (2).png" alt="" /></button>
        </div>
        <img className="logo" src="/img/InKlua.png" alt="" />
      </div>
    </div>
  );
}
