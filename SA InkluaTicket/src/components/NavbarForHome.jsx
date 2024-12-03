import React, { useEffect, useState } from 'react';
import '../styles/NavbarForHome.css';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import SearchBar from './SearchBar';

function NavBarForHome() {
  const [validação, setVali] = useState(false);
  const [isAdm, setAdm] = useState(false);
  const [isEmpresa, setEmpresa] = useState(false);
  const [isUser, setUser] = useState(false);
  const [imgPerfil, setImg] = useState(null)
  const [UsuarioLogado, setUserLog] = useState('')
 

 

    const PuxarUsuario = async () => {

      const token = localStorage.getItem('token');

      
      try{  
      const response = await fetch('http://localhost:3000/perfil', {

      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }

      });

      if (response.ok) {

          const userData = await response.json();
          setUserLog(userData)

      }else{

        console.log('deu b.o', response)

      }
    
    }

      catch (err) {

        console.error('Erro ao buscar usuario', err)
  
      }

    }




  useEffect(() => {
    let token = localStorage.getItem('token') || localStorage.getItem('tokenAdm') || localStorage.getItem('tokenEmpresa');

    if (token) {
      const decode = jwt_decode(token);
      setVali(true);

      if (decode.papel === 'Administrador') {
        setAdm(true);
        setEmpresa(false);
        setUser(false);
      } else if (decode.papel === 'Empresa') {
        setEmpresa(true);
        setAdm(false);
        setUser(false);
      } else if (decode.papel === 'Usuário') {
        setUser(true);
        setAdm(false);
        setEmpresa(false);
         
        PuxarUsuario();
        
      }
    } else {
      setVali(false);
      setAdm(false);
      setEmpresa(false);
      setUser(false);
    }
  }, []);

  return (
    <header className='ContainerHome'>
      <div className='EndElementsHome'>
        <img className='LogoFundoAzulHome' src="./img/logo.png" alt="Logo Inklua" />
        <SearchBar />
      </div>

      {validação && isAdm ? (
        <>
        <nav className='InfosHome'>
          <Link className='InfosNavHome' to='/admPainel'>Administração</Link>
          </nav>
        </>
      ) : validação && isEmpresa ? (
        <> <nav className='InfosHome'> 
     
        
          <Link className='InfosNavHome' to='/criarevento'>Crie seu evento</Link>
          <Link className='InfosNavHome' to='/perfilempresa'>Perfil Empresa</Link>
        
          
          </nav>
        </>
      ) : validação && isUser ? (
        <>
        <nav className='InfosHome'>
          <div className='CondicionalNav'>
          <div className='InfosNavHomeUser'>

          Bem vindo {UsuarioLogado.nome}!

          <li className='separadorHome'></li>

          { imgPerfil ? 
          (<></>) : (<><Link to='/PerfilUser'><img className='imageUser' src="./img/fotoUser.png" alt="" /> </Link></>)}
          
          </div>
          </div>
          </nav>
        </>
      ) : (
        <nav className='InfosHome'>
          <Link to="" role='button' tabIndex={0} className='InfosNavHome'>
            Criar seu evento
          </Link>
          <li className='separadorHome'></li>
          <Link to='/EscolhaLogin' tabIndex={0} className='InfosNavHome'>
            Acessar minha conta
          </Link>
          <li className='separadorHome'></li>
          <Link to='/EscolhaCadastro' tabIndex={0} className='InfosNavHome'>
            Cadastrar-se
          </Link>
        </nav>
      )}
    </header>
  );
}

export default NavBarForHome;