import React, { useState } from 'react';
import '../styles/TelaCadastro.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

function TelaCadastro() {

  const [Form, setForm] = useState({
    Nome: '', Email: '', Senha: '', SenhaConfirm: '', Endereco: '', Telefone: '',
    CPF: '', Deficiencia: 'Não especificado', PCD: false
  })

  const [erros, setErros] = useState({
    Nome: '', Email: '', Senha: '', SenhaConfirm: '', Endereco: '', Telefone: '',
    CPF: '', Endereco: ''
  })

  const [mostrarOp, setOp] = useState(false)
  const [disable, setDisable] = useState(true)
  const navigator = useNavigate();


  const opcoes = [

    'Deficiência visual',
    'Deficiência física',
    'Deficiência cognitiva',
    'Deficiência auditiva',
    'Não especificado'

  ]

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  const handleForm = async (e) => {

    e.preventDefault();

    const validationErrors = validateForm(Form);
    setErros(validationErrors);


    if (Object.values(validationErrors).every(error => error === '')) {
      console.log('Formulário enviado com sucesso!', Form);



      const response = await fetch('http://localhost:3000/usuarios', {

        method: 'POST',
        headers: {

          'Content-type': 'application/json'

        },

        body: JSON.stringify(Form)

      });

      if (response.ok) {

        const data = await response.json();

        if (!data.token) {

          console.error('Token não encontrado!')
          return

        }

        localStorage.setItem('token', data.token)
        navigator('/')

      }
    } else {

      console.log('Fudeu')

    }
  }





  function alternarVerSenha() {
    setVerSenha((prevState) => !prevState);
  }

  function alternarConfirmarVerSenha() {
    setVerConfirmarSenha((prevState) => !prevState);
  }

  const handleFocus = () => {

    setOp(true);

  };

  const handleBlur = () => {

    setTimeout(() => {

      setOp(false);

    }, 150)


  }

  const handleOpClick = (op) => {

    setForm({ ...Form, Deficiencia: op })
    setOp(false)

  }

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm({

      ...Form, [name]: value

    })

  }

  const validateForm = (data) => {

    const erros = {}

    if (!data.Nome) {
      erros.Nome = 'Campo obrigatório!'
    }

    if (!data.Email) {
      erros.Email = 'Campo obrigatório!';
    } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/.test(data.Email)) {
      erros.Email = 'Email inválido!';
    }

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!data.CPF) {
    erros.CPF = 'Campo obrigatório!';
  } else if (!cpfRegex.test(data.CPF)) {
    erros.CPF = 'CPF inválido! Use o formato XXX.XXX.XXX-XX.';
  }

  const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/; 
  if (!data.Telefone) {
    erros.Telefone = 'Campo obrigatório!';
  } else if (!telefoneRegex.test(data.Telefone)) {
    erros.Telefone = 'Telefone inválido! Use o formato (XX) XXXXX-XXXX.';
  }
    if(!data.Endereco){

      erros.Endereco = 'Campo obrigatório!'

    }

    if (!data.Senha) {
      erros.Senha = 'Campo obrigatório!';
    } else if (data.Senha.length < 6) {
      erros.Senha = 'A senha deve ter pelo menos 6 caracteres';
    }

    if (data.Senha !== data.SenhaConfirm) {
      erros.SenhaConfirm = 'As senhas não são iguais!';
    }

    return erros;

  }

  const handleChangeDef = (e) => {

    setForm({ ...Form, Deficiencia: e.target.value })

  }

  const Check = () => {

    let checado = document.getElementById('PCD')

    if (checado.checked) {

      setDisable(false)
      setForm({ ...Form, PCD: true })


    } else {

      setDisable(true)
      setForm({ ...Form, Deficiencia: 'Não especificado', PCD: false })


    }

  }

  


  return (

    <div>

      <form onSubmit={handleForm}>
        <div className='tudoCadastro'>
          <div className="parteAzul">

            <Link className="btVoltarIMG" to='/EscolhaCadastro'><img src="./img/seta.png" alt="Voltar" /></Link>

            <img className='imagemscadastrar' src="./img/IMG.png" alt="Imagem Cadastro" />
            <img className='imagemscadastrar2' src="./img/image.png" alt="Imagem Cadastro" />
          </div>
          <div className="parteBranca">
            <div className="cadastrar">
              <h1 className='Cadastre-se'>Cadastre-se</h1>
              <h3>Digite seus dados abaixo</h3>
            </div>
            <div className="tudoInputsCheckBT">
              <div className="partesInputsUmDois">
                <div className="parteUmInpus">
                  <div className="inputsLocal">
                    <label>Nome de usuário

                      <input type="text" className='tamanhoInputs'
                        placeholder='Digite seu nome de Usuário' onChange={(e) => { handleChange(e); setForm({ ...Form, Nome: e.target.value }) }} />
                      {erros.Nome && <p className='avisoLabel'>{erros.Nome}</p>}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>Email

                      <input type="text" className='tamanhoInputs' placeholder='Digite seu E-mail'
                        onChange={(e) => { handleChange(e); setForm({ ...Form, Email: e.target.value }) }} />

                      {erros.Email && <p className='avisoLabel'>{erros.Email}</p>}

                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>CPF
                      <InputMask
                        mask="999.999.999-99"
                        alwaysShowMask={false}
                        className="tamanhoInputs"
                        placeholder="Digite seu CPF"
                        onChange={(e) => { handleChange(e); setForm({ ...Form, CPF: e.target.value }) }}
                      >
                      </InputMask>
                      {erros.CPF && <p className='avisoLabel'>{erros.CPF}</p>}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>Telefone
                      <InputMask
                        mask="(99) 99999-9999"
                        alwaysShowMask={false}
                        className="tamanhoInputs"
                        placeholder="Digite seu telefone"
                        onChange={(e) => { handleChange(e); setForm({ ...Form, Telefone: e.target.value }) }}
                      >
                      </InputMask>
                      {erros.Telefone && <p className='avisoLabel'>{erros.Telefone}</p>}
                    </label>
                  </div>
                </div>
                <div className="parteDoisInpus">
                  <div className="inputsLocal">
                    <label>Endereço 
                      <input type="text" className='tamanhoInputs' placeholder='Digite seu Endereço'
                        onChange={(e) => { handleChange(e); setForm({ ...Form, Endereco: e.target.value }) }} />
                        {erros.Endereco && <p className='avisoLabel'>{erros.Endereco}</p>}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>Senha
                      <input
                        type={verSenha ? "text" : "password"}
                        className='tamanhoInputs'
                        placeholder='Digite sua senha'
                        onChange={(e) => { handleChange(e); setForm({ ...Form, Senha: e.target.value }) }}
                        
                      />
                      <button className='btSenha' onClick={(e) => { e.preventDefault(); alternarVerSenha(); }}>
                        {verSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                      </button>
                      {erros.Senha && <p className='avisoLabel'>{erros.Senha}</p>}
                    
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>Confirme sua senha
                      <input
                        type={verConfirmarSenha ? "text" : "password"}
                        className='tamanhoInputs'
                        onChange={(e) => { handleChange(e); setForm({ ...Form, SenhaConfirm: e.target.value }) }}
                        placeholder='Digite sua senha novamente'
                      />
                      <button className='btSenha' onClick={(e) => { e.preventDefault(); alternarConfirmarVerSenha(); }}>
                        {verConfirmarSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                      </button>
                      {erros.SenhaConfirm && <p className='avisoLabel'>{erros.SenhaConfirm}</p>}
                    </label>
                  </div>
                  <div className="inputsLocal">
                    <label>Tipo de deficiência <img src="./img/img logo.png" className="imgTipo" alt="Logo Tipo" />
                      <input type="text"
                        id='InptDeficiencias'
                        className={disable ? "InptDisabled" : "tamanhoInputs"}
                        placeholder="Não especificado"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={disable}
                        onChange={handleChangeDef}
                        value={Form.Deficiencia}
                      />



{mostrarOp && (
  <ul className="OpDefMae">
    {opcoes.map((op, index) => (
      <li
        className="OpDef"
        key={index}
        tabIndex="0" // Permite navegação com Tab
        onMouseDown={(e) => {
          e.preventDefault(); // Evita perda de foco ao clicar
          handleOpClick(op); // Seleção ao clicar
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Previne comportamento padrão
            handleOpClick(op); // Seleção ao pressionar Enter
          }
        }}
      >
        {op}
      </li>
    ))}
  </ul>
)}


                    </label>
                  </div>
                </div>
              </div>

              <div className="checkboxPCD">
                <label className='labelCheckbox'>
                  <input id='PCD' type="checkbox" className='inputsCheckbox' onChange={Check} />Você é Pessoa PCD
                  <img src="./img/img logo.png" className="imgPCD" alt="Logo PCD" />
                </label>
                <label className='labelCheckbox'>
                  <input type="checkbox" className='inputsCheckbox' />Eu li e aceito os termos de uso
                </label>
              </div>
              <label className='labelCheckbox1'>
                Já possui uma conta? <a href="#">Fazer login</a>
              </label>
              <div className="btLocal">
                <input type='submit' className='btCadastrar' /><br />
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}

export default TelaCadastro;
