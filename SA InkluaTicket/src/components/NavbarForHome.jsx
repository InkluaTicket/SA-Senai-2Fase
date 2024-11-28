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
          <Link to='/admPainel'>Administração</Link>
        </>
      ) : validação && isEmpresa ? (
        <>
          <Link to='/criarevento'>Crie seu evento</Link>
          <Link to='/perfilempresa'>Perfil Empresa</Link>
        </>
      ) : validação && isUser ? (
        <>
          <Link to='/perfilusuario'>Perfil usuário</Link>
        </>
      ) : (
        <nav className='InfosHome'>
          <Link role='button' tabIndex={0} className='InfosNavHome'>
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