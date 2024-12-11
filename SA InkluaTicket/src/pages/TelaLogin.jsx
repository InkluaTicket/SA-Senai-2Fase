import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/TelaLogin.css'
import jwt_decode from 'jwt-decode';

function TelaLogin() {


    const [FormLogin, setLogin] = useState ({ Email: '', Senha: ''})
    const [Mensagem, setMensagem] = useState('')
    const [SenhaIncorreta, setIncorreta] = useState('')
    const [LoginBemSucedido, setSucesso] = useState('')
    const navigate = useNavigate();

    const EfetuarLogin = async (e) =>{

        e.preventDefault();

        try{

            const response = await fetch('http://localhost:3000/login', {

                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(FormLogin)
                
                
            });

            

            

            if(!response.ok){

              const data = await response.json();

              if(data.message === 'Usuário não encontrado!'){

                setMensagem(data.message)
                setIncorreta('')

              }else{

                setIncorreta(data.message)
                setMensagem('')

              }

              

            }else{

                

                const data = await response.json();

                if(!data.token){

                    setMensagem('Token não recebido');
                    return

                }
                const decode = jwt_decode(data.token)

                if(decode.papel === 'Administrador'){

                    setMensagem('Administrador logado!')
                    localStorage.setItem('tokenAdm', data.token)
                    navigate('/')

                }else{
                setSucesso("Login bem sucedido!")
                localStorage.setItem('token', data.token)

                setTimeout(() => { navigate('/') }, 2000)

                
             }
            } 
         }   catch (error){

            setMensagem('Erro ao fazer login!')
            console.error('Erro durante o login!', error)

            }
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
            <h1 className='Cadastre-seLog'>Login de usuário</h1>
            <h3>Digite seus dados abaixo</h3>
          </div>
          <div className="tudoInputsCheckBTLog">
            <div className="partesInputsUmDoisLog">
              <div className="parteUmInpusLog">
                <div className="inputsLocalLog">
                  <label>E-mail
                    <input type="email" className='tamanhoInputsLog' value={FormLogin.Email} onChange={(e) => setLogin({...FormLogin, Email: e.target.value})} placeholder='Digite seu E-mail' />
                    {<p className='avisoLabel' role='alert' >  {Mensagem}</p>}
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
                    <button  type='button' className='btSenhaLog' onClick={alternarConfirmarVerSenha}>
                    {verSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                    </button>
                    {<p className='avisoLabel' role='alert' aria-live='assertive'>  {SenhaIncorreta} </p>}
                  </label>
                </div>
              </div>
              
            </div>

            
            <div className="checkboxPCDLog">
              <label tabIndex={0}>
                Não possui uma conta? <Link to="/CadastroUser">Cadastre-se</Link>
              </label>
            </div>
            { <p role='alert'> {LoginBemSucedido}</p> }
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

export default TelaLogin
