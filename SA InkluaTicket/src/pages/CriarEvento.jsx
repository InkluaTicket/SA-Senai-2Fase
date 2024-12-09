import React from "react";
import "../styles/CriarEvento.css";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CriarEvento() {
  const [showInput, setShowInput] = useState(false); // Estado para controlar a exibição do input
  const [imgPreview, setPrev] = useState(null);

  const token = localStorage.getItem("tokenEmpresa");
  let empresaId = null;
  const decode = jwt_decode(token);
  empresaId = decode.id;
  const [FormEvento, setFormE] = useState({
    Nome: "",
    Descricao: "",
    DataInicio: "",
    DataFim: "",
    Endereco: "",
    Categoria: "Show",
    LinkIngressos: "",
    imagem: null,
    empresa: empresaId,
  });

  const [Acessibilidades, setAcess] = useState({
    DefFisica: null,
    DefVisual: null,
    DefIntelectual: null,
    DefAuditiva: null,
    DefMultipla: null,
    OutraDef: null,
    OutraDescricao: null,
  });

  const [erros, setErros] = useState({
    Nome: "",
    Descricao: "",
    DataInicio: "",
    DataFim: "",
    Endereco: "",
    LinkIngressos: "",
    imagem: null,
    acess: Acessibilidades,
  });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const UploadImagemEvento = (e) => {
    document.getElementById("upload").click();
  };

  const handleCheckbox = (event) => {
    const { id, checked } = event.target;

    setAcess((prevState) => ({
      ...prevState,
      [id]: checked,
    }));

    if (id === "OutraDef") {
      setShowInput(checked); // Exibe ou esconde o campo de descrição
      if (!checked) {
        // Se o checkbox for desmarcado, limpa a descrição
        setAcess((prevState) => ({
          ...prevState,
          OutraDescricao: "", // Limpa o valor de OutraDescricao
        }));
      }
    }

    console.log(Acessibilidades);
  };

  const handleOutraDescricaoChange = (event) => {
    const { value } = event.target;

    if (Acessibilidades.OutraDef) {
      setAcess((prevState) => ({
        ...prevState,
        OutraDescricao: value,
      }));
    }
  };

  const validateForm = (data, acessibilidades) => {
    const erros = {};

    if (!data.Nome) {
      erros.Nome = "O nome do evento é obrigatório!";
    }

    if (!data.Descricao) {
      erros.Descricao = "A descrição do evento é obrigatória!";
    }

    if (!data.DataInicio) {
      erros.DataInicio = "A data de início do evento é obrigatória!";
    }

    if (!data.DataFim) {
      erros.DataFim = "A data de término do evento é obrigatória!";
    }

    if (!data.Endereco) {
      erros.Endereco = "O endereço do evento é obrigatório!";
    }

    if (!data.LinkIngressos) {
      erros.LinkIngressos = "O link para ingressos é obrigatório!";
    } else if (!/^https?:\/\/.+/.test(data.LinkIngressos)) {
      erros.LinkIngressos = "O link para ingressos deve ser uma URL válida.";
    }

    if (!data.imagem) {
      erros.imagem = "A imagem do evento é obrigatória!!";
    }

    const acessErrors = {};
    Object.entries(acessibilidades).forEach(([key, value]) => {
      if (!value && key !== "OutraDescricao") {
        acessErrors[key] = true;
      }
    });

    if (!Object.values(acessibilidades).some(Boolean)) {
      erros.acess = {
        message:
          "O evento deve conter ao menos uma acessibilidade selecionada.",
        ...acessErrors,
      };
    }

    return erros;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(FormEvento, Acessibilidades);
    setErros(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      console.log("Formulário enviado com sucesso!", FormEvento);

      const formData = new FormData();

      formData.append("Nome", FormEvento.Nome);
      formData.append("Descricao", FormEvento.Descricao);
      formData.append("DataInicio", FormEvento.DataInicio);
      formData.append("DataFim", FormEvento.DataFim);
      formData.append("Categoria", FormEvento.Categoria);
      formData.append("Endereco", FormEvento.Endereco);
      formData.append("LinkIngressos", FormEvento.LinkIngressos);
      formData.append("imagem", FormEvento.imagem);
      formData.append("empresa", FormEvento.empresa);

      const response = await fetch("http://localhost:3000/criacaoevento", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const eventoId = data.id;

        console.log(eventoId);

        const acessibilidades = {
          id_evento: eventoId,
          ...Acessibilidades, // Incluir todas as informações de acessibilidade do estado
        };

        await fetch("http://localhost:3000/acessibilidades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(acessibilidades),
        });

        navigate("/");
      } else {
        console.log("Evento não criado!");
        console.log(FormEvento);
      }
    }
  };

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        {imgPreview === null ? (
          <>
            {" "}
            <section
              className="corpo-pagina"
              onClick={() => {
                if (imgPreview == null) UploadImagemEvento();
              }}
            >
              <div id="container">
                <h1 className="titles">Adicione uma foto ao seu evento:</h1>
                <div className="butao">
                  <div className="colocar-foto">
                    <img
                      src="./img/colocar-foto.png"
                      alt="Adicionar foto"
                      className="img-foto"
                    />

                    <input
                      id="upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];

                        setPrev(URL.createObjectURL(file));
                        setFormE({ ...FormEvento, imagem: file });
                        console.log("Imagem adicionada!");
                      }}
                    />

                    <article className="comnt">
                      Arraste ou coloque uma foto
                    </article>
                    <article className="comnt2">
                      (A dimensão recomendada é de 1600 x 838)
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <div id="container">
              <h1 className="titles">Imagem do seu evento:</h1>

              <div className="butao">
                {" "}
                <img className="ImgPrev" src={imgPreview} alt="" />{" "}
              </div>

              <button
                className="salvar"
                onClick={(e) => {
                  e.preventDefault();
                  setPrev(null);
                  console.log("Imagem removida");
                }}
              >
                Remover imagem
              </button>
            </div>
          </>
        )}

        {erros.imagem && <p className="avisoLabel">{erros.imagem}</p>}

        <section className="comentarios">
          <form action="">
            <h2 className="titles">Dê um nome para seu evento</h2>
            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Nome do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, Nome: e.target.value })
              }
            />

            {erros.Nome && <p className="avisoLabel">{erros.Nome}</p>}

            <h2 className="titles">Data de início do evento</h2>
            <input
              type="date"
              className="comentario"
              min="2024-11-19"
              max="2024-12-31"
              aria-label="Data de início do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, DataInicio: e.target.value })
              }
            />
            {erros.DataInicio && (
              <p className="avisoLabel">{erros.DataInicio}</p>
            )}

            <h2 className="titles">Data de término do evento</h2>
            <input
              type="date"
              className="comentario"
              min="2024-11-19"
              max="2024-12-31"
              aria-label="Data de término do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, DataFim: e.target.value })
              }
            />

            {erros.DataFim && <p className="avisoLabel">{erros.DataFim}</p>}

            <h2 className="titles">Insira o endereço do seu evento</h2>
            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Endereço do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, Endereco: e.target.value })
              }
            />
            {erros.Endereco && <p className="avisoLabel">{erros.Endereco}</p>}

            <h2 className="titles">
              Coloque uma breve descrição sobre seu evento
            </h2>
            <textarea
              id="comentario"
              placeholder="Máx. 315 caracteres"
              maxLength={315}
              aria-label="Descrição do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, Descricao: e.target.value })
              }
            ></textarea>

            {erros.Descricao && <p className="avisoLabel">{erros.Descricao}</p>}

            <h2 className="titles">
              Coloque os tipos de acessibilidade que seu evento fornece
            </h2>

            <section id="checkbox" aria-label="Tipos de acessibilidade">
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
                      onChange={handleCheckbox}
                    />
                    <label className="info-label" htmlFor={id}>
                      {label}
                    </label>
                  </article>
                ))}
              </div>

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
                      onChange={handleCheckbox}
                    />
                    <label className="info-label" htmlFor={id}>
                      {label}
                    </label>
                  </article>
                ))}
              </div>
            </section>
            <h2 className="titles">
              {showInput && <h2 className="titles">Descreva!</h2>}
            </h2>

            {showInput && (
              <textarea
                type="text"
                id="comentario"
                placeholder="Max 315 caracteres"
                maxLength={315}
                value={Acessibilidades.OutraDescricao}
                onChange={handleOutraDescricaoChange}
              ></textarea>
            )}

            {erros.acess && typeof erros.acess === "object" && (
              <div className="avisoLabel">
                <p>{erros.acess.message}</p>
              </div>
            )}

            <h2 className="titles">Escolha a categoria do seu evento </h2>

            <select
              aria-label="Categoria do evento"
              name="plataforma"
              required="required"
              className="comentario"
              id="custom-select"
              defaultValue="Shows"
              onChange={(e) =>
                setFormE({ ...FormEvento, Categoria: e.target.value })
              }
            >
              {/* Shows, Festivais, Tecnologia, Esportes, Educação, Saúde */}
              <option value="Shows">Show</option>
              <option value="Festivais">Festivais</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="Esportes">Esportes</option>
              <option value="Educação">Educação</option>
              <option value="Saude">Saúde</option>
            </select>

            <h2 className="titles">Coloque o link do seu evento</h2>

            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Link para a compra de ingressos do evento"
              onChange={(e) =>
                setFormE({ ...FormEvento, LinkIngressos: e.target.value })
              }
            />

            {erros.LinkIngressos && (
              <p className="avisoLabel">{erros.LinkIngressos}</p>
            )}

            <button className="salvar" onClick={handleSubmit}>
              Salvar Alterações
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CriarEvento;
