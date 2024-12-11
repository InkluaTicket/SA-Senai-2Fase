import React, { useState } from "react";
import "../styles/TelaCadastroEmpresa.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import InputMask from "react-input-mask";

function TelaCadastroEmpresa() {
  const [Form, setForm] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    SenhaConfirm: "",
    Endereco: "",
    Telefone: "",
    CNPJ: "",
  });

  const [erros, setErros] = useState({
    Nome: "",
    Email: "",
    Senha: "",
    SenhaConfirm: "",
    Endereco: "",
    Telefone: "",
    CNPJ: "",
  });

  const navigator = useNavigate();

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [CadastroSucesso, setCadastroSucesso] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(Form);
    setErros(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      console.log("Formulário enviado com sucesso!", Form);

      const response = await fetch("http://localhost:3000/criarempresa", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(Form),
      });

      try {
        if (response.ok) {
          const data = await response.json();

          if (!data.token) {
            console.error("Token não encontrado!");
            return;
          }

          localStorage.setItem("tokenEmpresa", data.token);
          navigator("/");
        } else {
          console.log("Fudeu");
        }
      } catch (err) {
        console.error("Erro ao cadastrar empresa!", err);
      }
    }
  };

  useEffect(() => {
    document.title = "Tela de cadastro empresa"; // Altera o título da aba
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

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (!data.CNPJ) {
      erros.CNPJ = "CNPJ obrigatório!";
    } else if (!cnpjRegex.test(data.CNPJ)) {
      erros.CNPJ = "CNPJ inválido! Preencha o campo corretamente.";
    }

    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!data.Telefone) {
      erros.Telefone = "Telefone obrigatório!";
    } else if (!telefoneRegex.test(data.Telefone)) {
      erros.Telefone = "Telefone inválido! Preencha o campo corretamente";
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
      <form onSubmit={handleSubmit}>
        <div className="tudoCadastro9">
          <div className="parteAzul9">
            <Link className="btVoltarIMG9" to="/EscolhaCadastro">
              <img className="ImgVoltar9" src="./img/seta.png" alt="Voltar" />
            </Link>

            <img
              className="imagemscadastrar"
              src="./img/IMG.png"
              alt="Imagem Cadastro"
            />
            <img
              className="imagemscadastrar2"
              src="./img/image.png"
              alt="Imagem Cadastro"
            />
          </div>
          <div className="parteBranca9">
            <div className="cadastrarEmpre9">
              <h1 className="Cadastre-se9">Cadastre-se empresa</h1>
              <h3>Digite os dados da empresa abaixo</h3>
            </div>

            <div className="tudoInputsCheckBT9">
              <div className="partesInputsUmDois9">
                <div className="parteUmInpus9">
                  <div className="inputsLocal9">
                    <label>
                      Nome da empresa
                      <input
                        type="text"
                        className="tamanhoInputs9"
                        placeholder="Digite seu nome de Usuário"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Nome: e.target.value });
                        }}
                      />
                      {erros.Nome && (
                        <p role="alert" className="avisoLabel9">
                          {erros.Nome}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal9">
                    <label>
                      Email
                      <input
                        type="text"
                        className="tamanhoInputs9"
                        placeholder="Digite seu E-mail"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Email: e.target.value });
                        }}
                      />
                      {erros.Email && (
                        <p role="alert" className="avisoLabel9">
                          {erros.Email}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>
                      CNPJ
                      <InputMask
                        mask="99.999.999/9999-99"
                        alwaysShowMask={false}
                        className="tamanhoInputs9"
                        placeholder="Digite seu CNPJ"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, CNPJ: e.target.value });
                        }}
                      ></InputMask>
                      {erros.CNPJ && (
                        <p role="alert" className="avisoLabel9">
                          {erros.CNPJ}
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
                        className="tamanhoInputs9"
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
                <div className="parteDoisInpusCad">
                  <div className="inputsLocal">
                    <label>
                      CEP
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
                        <p role="alert" className="avisoLabel9">
                          {erros.Endereco}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal9">
                    <label>
                      Senha
                      <input
                        type={verSenha ? "text" : "password"}
                        className="tamanhoInputs9"
                        placeholder="Digite sua senha"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, Senha: e.target.value });
                        }}
                      />
                      <button
                        type="button"
                        className="btSenha9"
                        alt="Mostrar senha"
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
                              className="olhoSenha9"
                              src="../img/unnamed (1).png"
                              alt="Mostrar senha"
                            />
                          </>
                        )}
                      </button>
                      {erros.Senha && (
                        <p role="alert" className="avisoLabel9">
                          {erros.Senha}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal9">
                    <label>
                      Confirme sua senha
                      <input
                        type={verConfirmarSenha ? "text" : "password"}
                        className="tamanhoInputs9"
                        onChange={(e) => {
                          handleChange(e);
                          setForm({ ...Form, SenhaConfirm: e.target.value });
                        }}
                        placeholder="Digite sua senha novamente"
                      />
                      <button
                        type="button"
                        className="btSenha9"
                        onClick={(e) => {
                          e.preventDefault();
                          alternarConfirmarVerSenha();
                        }}
                      >
                        {verConfirmarSenha ? (
                          <>
                            <img
                              className="olhoSenha9"
                              src="../img/unnamed.png"
                              alt="Esconder senha"
                            />
                          </>
                        ) : (
                          <>
                            <img
                              className="olhoSenha9"
                              src="../img/unnamed (1).png"
                              alt="Mostrar senha"
                            />
                          </>
                        )}
                      </button>
                      {erros.SenhaConfirm && (
                        <p role="alert" className="avisoLabel9">
                          {erros.SenhaConfirm}
                        </p>
                      )}
                    </label>
                  </div>
                  <div className="inputsLocal9"></div>
                </div>
              </div>

              <div className="checkbox-cadastro">
              {<p role="alert"> {CadastroSucesso}</p>}
                  <label className="labelCheckbox9">
                    <input type="checkbox" className="inputsCheckbox9" />
                    Eu li e aceito os termos de uso
                  </label>
                <p className="labelCheckbox1" tabIndex={0}>
                  Já possui uma conta?{" "}
                  <Link to="/LoginEmpresa">Fazer login</Link>
                </p>
                  <input type="submit" className="btCadastrar9" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TelaCadastroEmpresa;
