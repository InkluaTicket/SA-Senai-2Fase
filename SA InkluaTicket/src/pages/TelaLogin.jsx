import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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

                setMensagem("Erro ao efetuar login!")

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

  return (

    <div>

      <Link to='/'>Voltar</Link>

      <h1>Login</h1>

      <form onSubmit={EfetuarLogin}>
       
       <label htmlFor="">Email:</label>

       <br />

      <input type="text" required value={FormLogin.Email} onChange={(e) => setLogin({...FormLogin, Email: e.target.value})}/>
       <br /><br />

       <label htmlFor="">Senha:</label>

       <br />

      <input type="text" value={FormLogin.Senha} onChange={(e) => setLogin({...FormLogin, Senha: e.target.value})}/>
 
       <br /><br />

      <input type="submit" />

</form>

{Mensagem}

    </div>
  )
}

export default TelaLogin
