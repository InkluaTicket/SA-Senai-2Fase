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
                    <div className="btsImgs">
                        <Link to='/CadastroEmpresa' className="btsImgsLINKS">
                            <div className="imagemDiv">
                                <img src="./img/imgEmpresa.png" className="imagemEmpre" />
                            </div>
                            <div className='botaoImg' aria-label='Cadastre-se como empresa'>Empresa</div>
                        </Link>
                    </div>
                    <img src="./img/image.png" className="imagemPcds" />
                    <div className="btsImgs">
                        <Link to='/CadastroUser' className="btsImgsLINKS">
                            <div className="imagemDiv">
                                <img src="./img/img usuario.png" className="imagemUsuar" />
                            </div>
                            <div className='botaoImg' aria-label='Cadastre-se como usuário'>Usuário</div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TelaUsuarioOuEmpresa
