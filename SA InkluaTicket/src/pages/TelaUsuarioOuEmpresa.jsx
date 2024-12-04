import React from 'react'
import '../styles/TelaUsuarioOuEmpresa.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

function TelaUsuarioOuEmpresa() {

    useEffect(() => {
        document.title = 'Tela de escolha'; // Altera o título da aba
    }, []);

    return (
        <div className="tudoUsuarioOuEmpresa">

            <div className="tudoBtsImgsTxt">
                <div className="posiImg">
                    <Link to='/'>
                        <img src="./img/seta.png" className="imagemSeta" alt='Voltar' />
                    </Link>
                    <img src="./img/logo.png" className="imagemInklua" />
                </div>
                <div className="textos">
                    <h1>Realize seu cadastro !</h1>
                    <h3>cadastre-se como usuário para avaliar eventos ou como empresa para organizá-los.</h3>
                </div>
                <div className="posiBtImg">
                    <nav className="btsImgs" aria-live='assertive' alt='Cadastrar empresa'>
                        <Link tabIndex={0} to='/CadastroEmpresa' className="btsImgsLINKS" aria-live='assertive'>
                            <div className="imagemDiv">
                                <img src="./img/imgEmpresa.png" className="imagemEmpre" />
                            </div>
                            <div className='botaoImg' aria-label='Cadastre-se como empresa'>Empresa</div>
                        </Link>
                    </nav>
                    <img src="./img/image.png" className="imagemPcds" />
                    <nav className="btsImgs" aria-live='assertive' alt='Cadastrar usuário'>
                        <Link tabIndex={0} to='/CadastroUser' className="btsImgsLINKS">
                            <div className="imagemDiv">
                                <img src="./img/img usuario.png" className="imagemUsuar" />
                            </div>
                            <div className='botaoImg' aria-label='Cadastre-se como usuário'>Usuário</div>
                        </Link>
                    </nav>
                </div>
            </div>

        </div>
    )
}

export default TelaUsuarioOuEmpresa
