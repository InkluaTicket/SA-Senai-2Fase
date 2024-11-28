import React from "react";
import "../styles/CriarEvento.css";
import Navbar from "../components/Navbar";

function CriarEvento() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="corpo-pagina">
          <div id="container">
            <h1 className="titles">Adicione uma foto ao seu evento:</h1>
            <button className="butao">
              <div className="colocar-foto">
                <img
                  src="./img/colocar-foto.png"
                  alt="Adicionar foto"
                  className="img-foto"
                />
                <article className="comnt">Arraste ou coloque uma foto</article>
                <article className="comnt2">(A dimensão recomendada é de 1600 x 838)</article>
              </div>
            </button>
          </div>
        </section>

        <section className="comentarios">

          <form action="">
          <h2 className="titles">Dê um nome para seu evento</h2>
          <input type="text" className="comentario" placeholder="Obrigatório" />

          <h2 className="titles">Data de início do evento</h2>
          <input
            type="date"
            className="comentario"
            min="2024-11-19"
            max="2024-12-31"
          />

          <h2 className="titles">Data de término do evento</h2>
          <input
            type="date"
            className="comentario"
            min="2024-11-19"
            max="2024-12-31"
          />

          <h2 className="titles">Insira o endereço do seu evento</h2>
          <input type="text" className="comentario" placeholder="Obrigatório" />

          <h2 className="titles">
            Coloque uma breve descrição sobre seu evento
          </h2>
          <textarea
            id="comentario"
            placeholder="Máx. 315 caracteres"
            maxLength={315}
          ></textarea>

          <h2 className="titles">
            Coloque os tipos de acessibilidade que seu evento fornece
          </h2>

          <section id="checkbox">
            <div className="column">
              {["Acessibilidade 1", "Acessibilidade 2", "Acessibilidade 3"].map(
                (item, index) => (
                  <article key={index}>
                    <input
                      type="checkbox"
                      className="checagem"
                      id={`checkbox-${index}`}
                    />
                    <label className="info-label" htmlFor={`checkbox-${index}`}>
                      {item}
                    </label>
                  </article>
                )
              )}
            </div>

            <div className="column">
              {["Acessibilidade 4", "Acessibilidade 5", "Acessibilidade 6"].map(
                (item, index) => (
                  <article key={index + 3}>
                    <input
                      type="checkbox"
                      className="checagem"
                      id={`checkbox-${index + 3}`}
                    />
                    <label
                      className="info-label"
                      htmlFor={`checkbox-${index + 3}`}
                    >
                      {item}
                    </label>
                  </article>
                )
              )}
            </div>

        </section>
          <h2 className="titles">Outro? Descreva!</h2>
          <textarea
            type="text"
            id="comentario"
            placeholder="Max 315 caracteres"
            maxLength={315}
          ></textarea>

          <h2 className="titles">Escolha a categoria do seu evento </h2>
          <input type="text" className="comentario" placeholder="Obrigatório" />

          <h2 className="titles">Coloque o link do seu evento</h2>
          <input type="text" className="comentario" placeholder="Obrigatório" />        
          
          <button className="salvar">Salvar Alterações</button>
</form>
        </section>


      </main>
    </>
  );
}

export default CriarEvento;
