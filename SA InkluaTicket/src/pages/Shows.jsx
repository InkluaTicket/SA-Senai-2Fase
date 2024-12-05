import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Shows.css";

function Shows() {
  return (
    <>
      <Navbar />
      <div class="evento-container">
        <header class="evento-header">
          <h1>Numanice Rio de Janeiro</h1>
          <p>Data Extra - Riocentro - 08 de Dezembro, 2024</p>
        </header>
        <section class="evento-banner">
          <img src="" alt="Imagem do evento" />
        </section>
        <section class="evento-descricao">
          <h2>Descrição do Evento</h2>
          <p>
            Prepare-se para uma experiência inesquecível com Numanice. Música,
            alegria e muita energia no Riocentro!
          </p>
          <button class="btn-comprar">Compre seu ingresso</button>
        </section>
        <footer class="evento-rodape">
          <p>© 2024 Numanice | Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default Shows;
