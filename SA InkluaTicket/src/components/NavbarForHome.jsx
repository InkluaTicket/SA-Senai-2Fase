import '../styles/NavbarForHome.css';
import '../styles/BtsNavbarForHome.css'
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import SearchBar from './SearchBar';

function NavBarForHome() {
  const [validação, setVali] = useState(false);
  const [isAdm, setAdm] = useState(false);
  const [isEmpresa, setEmpresa] = useState(false);
  const [isUser, setUser] = useState(false);
  const [imgPerfil, setImg] = useState(null)
  const [UsuarioLogado, setUserLog] = useState('')
  const [CadastreSe, setCadastre] = useState(false)
  const [Mensagem, setMensagem] = useState('')


  const PuxarUsuario = async () => {

    const token = localStorage.getItem('token');


    try {
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


      } else {

        console.log('deu b.o', response)

      }

    }

    catch (err) {

      console.error('Erro ao buscar usuario', err)

    }

  }

  const PuxarEmpresa = async () => {

    const token = localStorage.getItem('tokenEmpresa');


    try {
      const response = await fetch('http://localhost:3000/perfilEmpresa', {

        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }

      });

      if (response.ok) {

        const empresaData = await response.json();
        setUserLog(empresaData)

      } else {

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
        PuxarEmpresa();
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

  useEffect(() => {



    setMensagem(`Bem vindo ${UsuarioLogado.nome}`)
    setImg(UsuarioLogado.foto_perfil)


  }, [UsuarioLogado])

  return (
    <header className='ContainerHome'>
      <div className='EndElementsHome'>
        <img className='LogoFundoAzulHome' src="./img/logo.png" alt="Logo Inklua" />
        <SearchBar />
      </div>

      {validação && isAdm ? (
        <>
          <nav className='InfosHome'>
            <Link className='InfosNavHome' to='/PainelModerador'>Administração</Link>
          </nav>
        </>
      ) : validação && isEmpresa ? (
        <> <nav className='InfosHome'>
          <div className='CondicionalNav' >
            <div className='InfosNavHomeUser'>

              <Link className='InfosNavHome' to='/criarevento'>Crie seu evento</Link>
              <li className='separadorHome'></li>
              <p aria-live='assertive'>Bem vindo {UsuarioLogado.nome}</p>
              {imgPerfil ?
                (<></>) : (<><Link to='/PerfilEmpresa'><img className='imageUser' src="./img/fotoUser.png" alt="" /> </Link></>)}


            </div>
          </div>
        </nav>
        </>
      ) : validação && isUser ? (
        <>
          <nav className='InfosHome'>
            <div className='CondicionalNav'>
              <div className='InfosNavHomeUser'>

                <p aria-live='assertive' role='alert'> {Mensagem}</p>

                <li className='separadorHome'></li>

                {imgPerfil ?
                  (<><Link to='/PerfilUser'><img src={imgPerfil} style={{ width: '50px', borderRadius: '50%', margin: '0px' }} alt="" /></Link></>) : (<><Link to='/PerfilUser'><img className='imageUser' src="./img/fotoUser.png" alt="" /> </Link></>)}

              </div>
            </div>
          </nav>
        </>
      ) : (
        <nav className='InfosHome'>
          <Link to="" onClick={() => { setCadastre(true) }} role='button' tabIndex={0} className='InfosNavHome'>
            Criar seu evento

            {CadastreSe &&
              <div className='AvisoParaCadastro' role='alert'> <p tabIndex={0} className='x' aria-label='Fechar'
                onKeyDown={(e) => {
                  e.key === 'Enter' && e.stopPropagation();
                  e.preventDefault(); setCadastre(false)
                }} onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault(); setCadastre(false)
                }}>X</p>
                <center>
                  <h4> Para criar um evento é necessário que você tenha uma conta empresarial!</h4>

                  <div className="posiBtImgNav" aria-hidden>
                    <nav className="btsImgsNav" aria-label='Faça cadastro como empresa' role='alert'>
                      <Link tabIndex={0} to='/CadastroEmpresa' className="btsImgsNavLINKS">
                        <div className="imagemDivNav">
                          <img src="./img/imgEmpresa.png" className="imagemEmpreNav" />
                        </div>
                        <div className='botaoImgNav'>Cadastrar Empresa</div>
                      </Link>
                    </nav>
                    <img src="./img/pessoaEmpresa.png" className="imgPcdNav" />
                    <nav className="btsImgsNav" aria-live='assertive' aria-label='Faça login como empresa' role='alert'>
                      <Link to='/LoginEmpresa' className="btsImgsNavLINKS" >
                        <section className="imagemDivNav">
                          <img src="./img/mãos .png" className="imagemEmpreNav" />
                        </section>
                        <div className='botaoImgNav'>Login Empresa</div>
                      </Link>
                    </nav>
                  </div>
                </center>
              </div>}

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