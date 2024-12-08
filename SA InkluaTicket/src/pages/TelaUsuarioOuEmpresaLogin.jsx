import React from 'react'
import '../styles/TelaUsuarioOuEmpresa.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

function TelaUsuarioOuEmpresa() {

    useEffect(() => {
        document.title = 'Tela de escolha login'; // Altera o título da aba
    }, []);


    return (
        <div className="tudoUsuarioOuEmpresa">

            <div className="tudoBtsImgsTxt">
                <div className="posiImg">
                    <Link to='/'>
                        <img src="./img/seta.png" className="imagemSeta" alt='Voltar' /> </Link>
                    <img src="./img/logo.png" className="imagemInklua" />
                </div>
                <div className="textos">
                    <h1>Realize seu login !</h1>
                    <h3>Login como usuário para avaliar eventos ou como empresa para organizá-los.</h3>
                </div>
                <div className="posiBtImg">
                    <nav className="btsImgs" aria-live='assertive' aria-label='Faça login como empresa' role='alert'>
                        <Link to='/LoginEmpresa' className="btsImgsLINKS" >
                            <section className="imagemDiv">
                                <img src="./img/mãos .png" className="imagemEmpre" />
                            </section>
                            <div className='botaoImg'>Empresa</div>
                        </Link>
                    </nav>
                    <img src="./img/image.png" className="imagemPcds" />
                    <nav className="btsImgs" aria-label=' Faça login como usuário' role='alert'>
                        <Link to='/TelaLogin' className="btsImgsLINKS" >
                            <div className="imagemDiv">
                                <img src="./img/imgUsuarioLogin.png" className="imagemUsuar2" />
                            </div>
                            <div className='botaoImg'>Usuário</div>
                        </Link>
                    </nav>
                </div>
            </div>

        </div>
    )
}

export default TelaUsuarioOuEmpresa
