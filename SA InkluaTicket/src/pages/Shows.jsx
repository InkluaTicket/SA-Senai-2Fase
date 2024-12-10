import React from "react";
import Navbar from "../components/Navbar.jsx";
import Rodape from "../components/Rodape.jsx";
import "../styles/Shows.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Shows() {
  const [rating, setRating] = useState(0); // Estado para a avaliação selecionada
  const [hover, setHover] = useState(0); // Estado para a avaliação ao passar o mouse

  // renderização dos comentarios
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");

  // Função para lidar com o envio do comentário
  const handleAddComment = () => {
    if (newComment.trim() !== "" && userName.trim() !== "") {
      setComments([
        ...comments,
        { name: userName, text: newComment, stars: rating },
      ]);
      setNewComment("");
      setUserName("");
      setRating(0); // Resetar avaliação após envio
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="img-container">
        <img src="./img/ClimaCarbono2.png" className="img-frente" />
      </div>

      <div>
        <img
          src="./img/ClimaCarbono2.png"
          className="img-fundo"
          alt="Imagem do evento"
        />
      </div>

      <section>
        <h1 className="title-show">
          Conferência Brasileira Clima & Carbono 2024
        </h1>

        <p className="p-show">
          evento precencial em -
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.sympla.com.br/evento/conferencia-brasileira-clima-carbono-2024/2303614#event-location"
            className="link-show"
          >
            Teatro Santander, São Paulo - SP
          </Link>
        </p>

        <section>
          <div className="card-show">
            <div className="card-desc">
              <h1 className="titulo">Descrição do evento</h1>
              <p>
                Promovido pela Aliança Brasil NBS, a Conferência Brasileira
                Clima e Carbono é um encontro anual que reúne profissionais e
                especialistas do setor, acadêmicos e representantes do governo
                interessados nas questões climáticas e nas oportunidades do
                mercado de carbono. O evento será realizado nos dias 15 e 16 de
                outubro de 2024 em São Paulo e reunirá especialistas nacionais e
                internacionais para discutir três eixos principais: clima,
                mercado de carbono (regulado e voluntário) e perspectivas para a
                COP 29 no Azerbaijão.
              </p>

              <p>
                O evento abordará o futuro do mercado de carbono no Brasil,
                discutindo regulamentação, boas práticas, desafios,
                oportunidades, programas estaduais e soluções baseadas na
                natureza. O ingresso inclui participação nos dois dias,
                alimentação e acesso ao coquetel de encerramento, com vendas em
                lotes que aumentam de preço conforme esgotam.
              </p>

              <div className="column">
                {[
                  { label: "Deficiencia auditiva", id: "DefAuditiva" },
                  { label: "Deficiencia multipla", id: "DefMultipla" },
                  { label: "Outro?", id: "OutraDef" },
                ].map(({ label, id }, index) => (
                  <article key={index + 3}>
                    <input
                      type="checkbox"
                      className="checagem"
                      id={id}
                    />
                    <label className="info-label" htmlFor={id}>
                      {label}
                    </label>
                  </article>
                ))}
              </div>

              <div className="column">
                {[
                  { label: "Deficiencia física", id: "DefFisica" },
                  { label: "Deficiencia visual", id: "DefVisual" },
                  { label: "Deficiencia intelectual", id: "DefIntelectual" },
                ].map(({ label, id }, index) => (
                  <article key={index}>
                    <input
                      type="checkbox"
                      className="checagem"
                      id={id}
                    />
                    <label className="info-label" htmlFor={id}>
                      {label}
                    </label>
                  </article>
                ))}
              </div>

            </div>
          </div>

          <div className="card-show2">
            <h1 className="titulo">Datas do evento</h1>
            <div className="itens-data">
              <p>15 out - 2024 • 8:00</p>

              <p>à</p>

              <p>16 out - 2024 • 22:00</p>

              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="https://www.sympla.com.br/evento/conferencia-brasileira-clima-carbono-2024/2303614#event-location"
                className="compra"
              >
                Compar Ingressos
              </Link>
            </div>
          </div>

          <div className="card-avaliacao">
            <div className="card-show3">
              <div className="rating-container">
                <h1>Avaliar esse show</h1>
                <div className="stars">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;

                    return (
                      <span
                        key={starValue}
                        className={`star ${
                          starValue <= (hover || rating) ? "active" : ""
                        }`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                </div>
                <p className="rating-text">
                  {rating
                    ? `Você avaliou com ${rating} estrela${
                        rating > 1 ? "s" : ""
                      }.`
                    : "Clique nas estrelas para avaliar!"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="comentarios">
          <div style={{ width: "50%", margin: "0 auto", textAlign: "center" }}>
            <h2>Deixe seu comentário</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Digite seu nome"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "20px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário aqui..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                fontSize: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            ></textarea>
            <button
              onClick={handleAddComment}
              style={{
                backgroundColor: "#024959",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                fontSize: "20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Enviar
            </button>

            {/* Renderização Condicional dos Comentários */}
            {comments.length > 0 && (
              <div style={{ marginTop: "30px", textAlign: "left" }}>
                <h3>Comentários:</h3>
                <ul style={{ listStyleType: "none", padding: "0px" }}>
                  {comments.map((comment, index) => (
                    <li
                      key={index}
                      style={{
                        background: "#fff",
                        marginBottom: "30px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "5px",
                          borderRadius: "5px 5px 0 0",
                          padding: "10px",
                          backgroundColor: "#024959",
                        }}
                      >
                        <strong style={{ color: "#fff", fontSize: "18px" }}>
                          {comment.name}
                        </strong>
                        <div style={{ marginLeft: "10px" }}>
                          {[...Array(5)].map((_, starIndex) => (
                            <span
                              key={starIndex}
                              style={{
                                color:
                                  starIndex < comment.stars
                                    ? "#ffc107"
                                    : "#ccc",
                                fontSize: "25px",
                              }}
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="coment">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </section>

      <div>
        <Rodape />
      </div>
    </div>
  );
}

export default Shows;
