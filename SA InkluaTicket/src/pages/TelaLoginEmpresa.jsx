import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/TelaLogin.css'
import jwt_decode from 'jwt-decode';
import InputMask from 'react-input-mask'

function telaLoginEmpresa() {


    const [FormLogin, setLogin] = useState ({ CNPJ: '', Senha: ''})
    const [erros, setErros] = useState({
     CNPJ: '',  Senha: ''
      
    })
  
    const [Mensagem, setMensagem] = useState('')
    const navigate = useNavigate();

    const EfetuarLogin = async (e) => {

      e.preventDefault();

      try{ 

      const response = await fetch('http://localhost:3000/loginEmpresa', {

      method: 'POST',
      headers: {'Content-type' : 'application/json'},
      body: JSON.stringify(Form)

      })

      if(response.ok){

          const data = await response.json();
          const token = data.token
          localStorage.setItem('tokenEmpresa', token)
          navigator('/')

      }

    }catch(err){

      console.error('Erro ao efetuar login!', err.message)
      

    }
  }

  const handleChange = (e) => {

    const { name, value } = e.target;

    setLogin({

      ...FormLogin, [name]: value

    })

  }

  const validateForm = (data) => {

    const erros = {}

    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

  if (!data.CNPJ) {
    erros.CNPJ = 'Campo obrigatório!';
  } else if (!cnpjRegex.test(data.CNPJ)) {
    erros.CNPJ = 'CNPJ inválido! Use o formato XX.XXX.XXX/XXXX-XX.';
  }

  

    if (!data.Senha) {
      erros.Senha = 'Campo obrigatório!';
    } else if (data.Senha.length < 6) {
      erros.Senha = 'A senha deve ter pelo menos 6 caracteres';
    }

 

    return erros;

  }


    const [verSenha, setVerSenha] = useState(false);

    function alternarConfirmarVerSenha() {
      setVerSenha((prevState) => !prevState);
    }

  return (

    <div>

      <form onSubmit={EfetuarLogin}>
      <div className='tudoLogin'>
        <div className="parteAzulLog">
            <Link to='/EscolhaLogin' className="btVoltarIMGLog">  
          <img src="./img/seta.png" className='ImgVoltar' alt="Voltar" />
          </Link>
          <img className='imagemscadastrarLog' src="./img/IMG.png" alt="Imagem Login" />
          <img className='imagemscadastrarLog2' src="./img/image.png" alt="Imagem Login" />
        </div>
        <div className="parteBrancaLog">
          <div className="cadastrarLog">
            <h1 className='Cadastre-seLog'>Login de Empresa</h1>
            <h3>Digite os dados da Empresa abaixo</h3>
          </div>
          <div className="tudoInputsCheckBTLog">
            <div className="partesInputsUmDoisLog">
              <div className="parteUmInpusLog">
                <div className="inputsLocalLog">
                  <label>CNPJ
                  <InputMask
                        mask="99.999.999/9999-99"
                        alwaysShowMask={false}
                       className='tamanhoInputsLog'
                        placeholder="Digite seu CNPJ"
                        onChange={(e) => { handleChange(e); setLogin({ ...FormLogin, CNPJ: e.target.value }) }}
                      >
                      </InputMask>
                      {erros.CNPJ && <p className='avisoLabel'>{erros.CNPJ}</p>}
                  </label>
                </div>
                <div className="inputsLocaLog">
                  <label>Senha
                    <input
                      type={verSenha ? "text" : "password"}
                      className='tamanhoInputsLog'
                      value={FormLogin.Senha} onChange={(e) => setLogin({...FormLogin, Senha: e.target.value})}
                      placeholder='Digite sua senha'
                    />
                    <button className='btSenhaLog' onClick={alternarConfirmarVerSenha}>
                    {verSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <div className="checkboxPCDLog">
              <label>
                Não possui uma conta? <Link to="/CadastroEmpresa">Cadastre-se empresa</Link>
              </label>
            </div>
            <div className="btLocalLog">
              <input type='submit' className='btCadastrarLog'/>
              
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>

  )
}

export default telaLoginEmpresa
