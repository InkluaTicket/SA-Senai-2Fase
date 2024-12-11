import React, { useState } from "react";
import "../styles/TelaCadastro.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputMask from "react-input-mask";

function TelaCadastro() {
  const [Form, setForm] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    SenhaConfirm: "",
    Endereco: "",
    Telefone: "",
    CPF: "",
    Deficiencia: "Não especificado",
    PCD: false,
  });

  const [erros, setErros] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    SenhaConfirm: "",
    Endereco: "",
    Telefone: "",
    CPF: "",
  });

  const [disable, setDisable] = useState(true);
  const [CadastroBemSucedido, setSucesso] = useState(false);
  const navigator = useNavigate();

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(Form);
    setErros(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      console.log("Formulário enviado com sucesso!", Form);

      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify(Form),
      });

      if (response.ok) {
        const data = await response.json();

        if (!data.token) {
          console.error("Token não encontrado!");
          return;
        }

        localStorage.setItem("token", data.token);
        setSucesso("Cadastro bem sucedido!");
        setTimeout(() => {
          navigator("/");
        }, 2500);
      }
    } else {
      console.log("Fudeu");
    }
  };

  useEffect(() => {
    document.title = "Tela de cadastro usuário"; // Altera o título da aba
  }, []);   

  function alternarVerSenha() {
    setVerSenha((prevState) => !prevState);
  }

  function alternarConfirmarVerSenha() {
    setVerConfirmarSenha((prevState) => !prevState);
  }

  const handleFocus = () => {
    setOp(true);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOp(false);
    }
  };

  const handleOpClick = (op) => {
    setForm({ ...Form, Deficiencia: op });
    setOp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...Form,
      [name]: value,
    });
  };

  const validateForm = (data) => {
    const erros = {};

    if (!data.Nome) {
      erros.Nome = "Nome obrigatório!";
    }

    if (!data.Email) {
      erros.Email = "Email obrigatório!";
    } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/.test(data.Email)) {
      erros.Email = "Email inválido!";
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!data.CPF) {
      erros.CPF = "CPF obrigatório!";
    } else if (!cpfRegex.test(data.CPF)) {
      erros.CPF = "CPF inválido! Preencha o campo corretamente";
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!data.Telefone) {
      erros.Telefone = "Telefone obrigatório!";
    } else if (!telefoneRegex.test(data.Telefone)) {
      erros.Telefone = "Telefone inválido! Preencha o campo corretamente.";
    }

    const cepRegex = /^\d{5}-\d{3}$/;

    if (!data.Endereco) {
      erros.Endereco = "CEP obrigatório!";
    } else if (!cepRegex.test(data.Endereco)) {
      erros.Endereco = "CEP inválido! Preencha o campo corretamente";
    }

    if (!data.Senha) {
      erros.Senha = "Senha obrigatória!";
    } else if (data.Senha.length < 6) {
      erros.Senha = "A senha deve ter pelo menos 6 caracteres";
    }

    if (data.Senha !== data.SenhaConfirm) {
      erros.SenhaConfirm = "As senhas não são iguais!";
    }

    return erros;
  };

  const handleChangeDef = (e) => {
    setForm({ ...Form, Deficiencia: e.target.value });
  };

  const Check = () => {
    let checado = document.getElementById("PCD");

    if (checado.checked) {
      setDisable(false);
      setForm({ ...Form, PCD: true });
    } else {
      setDisable(true);
      setForm({ ...Form, Deficiencia: "Não especificado", PCD: false });
    }
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <div className="tudoCadastro">
          <div className="parteAzul">
            <Link className="btVoltarIMG" to="/EscolhaCadastro">
              <img className="ImgVoltar" src="./img/seta.png" alt="Voltar" />
            </Link>

            <div className="imgs-azul">
              <img
                className="imagemscadastrar"
                src="./img/IMG.png"
                alt="Imagem Cadastro"
              />
            </div>

            <div className="imgs-azul">
              <img
                className="imagemscadastrar2"
                src="./img/image.png"
                alt="Imagem Cadastro"
              />
            </div>
          </div>
          <div className="parteBranca">
            <div className="cadastrar">
              <h1 className="Cadastre-se">Cadastre-se usuário</h1>
              <h3>Digite seus dados abaixo</h3>
            </div>

            <div className="tudoInputsCheckBT">
              <div className="partesInputsUmDois">
                <div className="parteUmInpus">
                  <label className="labelCheckboxPcd">
                    <input
                      id="PCD"
                      type="checkbox"
                      className="inputsCheckbox"
                      onChange={Check}
                    />
                    Você é uma pessoa PCD?
                    <img
                      src="./img/img logo.png"
                      className="imgPCD"
                      alt="Logo PCD"
                    />
                  </label>

                  <div className="inputsLocal">
                    <label>
                      Nome de usuário
                      <input
                        type="text"
                        className="tamanhoInputs"
                        placeholder="Digite seu nome de Usuário"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Nome: e.target.value });
                        }}
                      />
                      {erros.Nome && (
                        <p role="alert" className="avisoLabel">
                          {erros.Nome}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      Email
                      <input
                        type="text"
                        className="tamanhoInputs"
                        placeholder="Digite seu E-mail"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Email: e.target.value });
                        }}
                      />
                      {erros.Email && (
                        <p role="alert" className="avisoLabel">
                          {erros.Email}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      CPF
                      <InputMask
                        mask="999.999.999-99"
                        alwaysShowMask={false}
                        className="tamanhoInputs"
                        placeholder="Digite seu CPF"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, CPF: e.target.value });
                        }}
                      ></InputMask>
                      {erros.CPF && (
                        <p role="alert" className="avisoLabel">
                          {erros.CPF}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      Telefone
                      <InputMask
                        mask="(99) 99999-9999"
                        alwaysShowMask={false}
                        className="tamanhoInputs"
                        placeholder="Digite seu telefone"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Telefone: e.target.value });
                        }}
                      ></InputMask>
                      {erros.Telefone && (
                        <p role="alert" className="avisoLabel">
                          {erros.Telefone}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <div className="parteDoisInpus">
                  <div className="inputsLocal">
                    <label>
                      Endereço
                      <InputMask
                        mask="99999-999"
                        alwaysShowMask={false}
                        className="tamanhoInputs"
                        placeholder="Digite seu CEP"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Endereco: e.target.value });
                        }}
                      ></InputMask>
                      {erros.Endereco && (
                        <p role="alert" className="avisoLabel">
                          {erros.Endereco}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      Senha
                      <input
                        type={verSenha ? "text" : "password"}
                        className="tamanhoInputs"
                        placeholder="Digite sua senha"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Senha: e.target.value });
                        }}
                      />
                      <button
                        aria-label="Ver senha"
                        type="button"
                        className="btSenha"
                        
                        onClick={(e) => {
                          e.preventDefault();
                          alternarVerSenha();
                        }}
                      >
                        {verSenha ? (
                          <>
                            <img
                              className="olhoSenha"
                              src="../img/unnamed.png"
                              alt="Esconder senha"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="olhoSenha"
                              src="../img/unnamed (1).png"
                              alt="Mostrar senha"
                            />
                          </>
                        )}
                      </button>
                      {erros.Senha && (
                        <p role="alert" className="avisoLabel">
                          {erros.Senha}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      Confirme sua senha
                      <input
                        type={verConfirmarSenha ? "text" : "password"}
                        className="tamanhoInputs"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, SenhaConfirm: e.target.value });
                        }}
                        placeholder="Digite sua senha novamente"
                      />
                      <button
                      aria-label="Ver senha"
                        type="button"
                        className="btSenha"
                        onClick={(e) => {
                          e.preventDefault();
                          alternarConfirmarVerSenha();
                        }}
                      >
                        {verConfirmarSenha ? (
                          <>
                            <img
                              className="olhoSenha"
                              src="../img/unnamed.png"
                              alt="Esconder senha"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="olhoSenha"
                              src="../img/unnamed (1).png"
                              alt="Mostrar senha"
                            />
                          </>
                        )}
                      </button>
                      {erros.SenhaConfirm && (
                        <p role="alert" className="avisoLabel">
                          {erros.SenhaConfirm}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      Tipo de deficiência{" "}
                      <img
                        src="./img/img logo.png"
                        className="imgTipo"
                        alt="Logo Tipo"
                      />
                      <select
                        tabIndex={0}
                        type="text"
                        id="InptDeficiencias"
                        className={disable ? "InptDisabled" : "tamanhoInputs"}
                        readOnly
                        placeholder="Não especificado"
                        disabled={disable}
                        onChange={handleChangeDef}
                        value={Form.Deficiencia}
                      >
                        <option value="def-fisica">Deficiencia física</option>
                        <option value="def-visual">Deficiencia visual</option>
                        <option value="def-intelectual">
                          Deficiencia intelectual
                        </option>
                        <option value="def-auditiva">
                          Deficiencia auditiva{" "}
                        </option>
                        <option value="def-multipla">
                          Deficiencia multipla
                        </option>
                        <option value="def-multipla">
                          Deficiencia não específicada
                        </option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              <div className="inpts-cadastro"> 
                {<p aria-live="assertive" className="msg-sucesso">{CadastroBemSucedido}</p>}
                <p className="labelCheckbox">
                  <input type="checkbox" className="inputsCheckbox" />
                  Eu li e aceito os termos de uso
                </p>

                <p tabIndex={0} className="labelCheckbox1">
                  Já possui uma conta? <Link to="/TelaLogin">Fazer login</Link>
                </p>

               
                <div className="btLocal">
                  <input type="submit" className="btCadastrarEmpresa" /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TelaCadastro;
