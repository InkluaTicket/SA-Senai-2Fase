import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/TelaLogin.css'
import jwt_decode from 'jwt-decode';

function TelaLogin() {


    const [FormLogin, setLogin] = useState ({ Email: '', Senha: ''})
    const [Mensagem, setMensagem] = useState('')
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

                setMensagem("Senha incorreta!")

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
                setMensagem("Login bem sucedido!")
                localStorage.setItem('token', data.token)
                navigate('/')
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
          <img src="./img/seta.png"  alt="Voltar" />
          </Link>
          <img className='imagemscadastrarLog' src="./img/IMG.png" alt="Imagem Login" />
          <img className='imagemscadastrarLog' src="./img/image.png" alt="Imagem Login" />
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
                    <button className='btSenha' onClick={alternarConfirmarVerSenha}>
                      {verSenha ? "⨂" : "⨀"}
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <div className="checkboxPCDLog">
              <label>
                Não possui uma conta? <a href="#">Cadastre-se</a>
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

export default TelaLogin
