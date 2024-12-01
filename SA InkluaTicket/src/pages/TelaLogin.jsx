import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/TelaLogin.css'
import jwt_decode from 'jwt-decode';

function TelaLogin() {


    const [FormLogin, setLogin] = useState ({ Email: '', Senha: ''})
    const [MensagemSenha, setSenha] = useState('')
    const [Feedback, setFeed] = useState('')
    const [MensagemEmail, setEmail] = useState('')
    const navigate = useNavigate();

    const [erros, setErros] = useState({
      Email: '', Senha: ''
    })

    const EfetuarLogin = async (e) =>{

        e.preventDefault();

        const validationErrors = validateForm(FormLogin);
    setErros(validationErrors);


    if (Object.values(validationErrors).every(error => error === '')) {
      console.log('Formulário enviado com sucesso!', FormLogin)

        try{

            const response = await fetch('http://localhost:3000/login', {

                method: 'POST',
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(FormLogin)
                
                
            });

          
      
            

            if(!response.ok){

              const data = await response.json();
              console.log(data)

              if(data.message === 'Usuário não encontrado!'){

                setEmail(data.message)
                setSenha('')

              }else{

                setEmail('')

              }
              if(data.message === 'Senha incorreta!'){ 

                setSenha(data.message)}

            }
          
            else{

            
                const data = await response.json();

                if(!data.token){

                    console.log('Token não recebido');
                    return

                }
                const decode = jwt_decode(data.token)

                if(decode.papel === 'Administrador'){

                    setFeed('Login como moderador bem sucedido!')
                    localStorage.setItem('tokenAdm', data.token)

                    setTimeout(() => { 

                    navigate('/')

                    }, 3000)

                }else{
               

                setFeed('Login bem sucedido!')
                localStorage.setItem('token', data.token)
                setTimeout(() => { 
                      
                    navigate('/')

                    }, 3000)

             }
            } 
         }   catch (error){

            setMensagem('Erro ao fazer login!')
            console.error('Erro durante o login!', error)

            }
          }
    }

    const validateForm = (data) => {

      const erros = {}
  
     
      if (!data.Email) {
        erros.Email = 'Campo obrigatório!';
      } else if (!/^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/.test(data.Email)) {
        erros.Email = 'Email inválido!';
      }
  
  
      if (!data.Senha) {
        erros.Senha = 'Campo obrigatório!';
      }
  
      return erros;
  
    }

    useEffect(() => {
      document.title = 'Tela de login'; // Altera o título da aba
    }, []);

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
                    <input type="email" className='tamanhoInputsLog' value={FormLogin.Email} onChange={(e) => 
                       setLogin({...FormLogin, Email: e.target.value})} placeholder='Digite seu E-mail' />
                       {erros.Email ? <p aria-live='assertive' className='avisoLabel'>{erros.Email}</p> : <><p 
                        aria-live='assertive' 
                        className='avisoLabel'> 
                          {MensagemEmail}</p></>}
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
                    <button className='btSenha' onClick={(e) => {e.preventDefault(); 
                       alternarConfirmarVerSenha()}}>
                      {verSenha ? "⨂" : "⨀"}
                    </button>
                    {erros.Senha ? <p aria-live='assertive'  className='avisoLabel'>{erros.Senha}</p> : 
                    <><p aria-live='assertive' 
                        className='avisoLabel'> 
                       {MensagemSenha}</p></>}
                  </label>
                </div>
              </div>
            </div>

            <div className="checkboxPCDLog">
              <label>
                Não possui uma conta? <Link to='/CadastroUser'>Cadastre-se</Link>
              </label>
            </div>
            <div className="btLocalLog">
              <input type='submit' className='btCadastrarLog'/>
              {<><p aria-live='assertive'>{Feedback}</p></>}
              
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>

  )
}

export default TelaLogin
