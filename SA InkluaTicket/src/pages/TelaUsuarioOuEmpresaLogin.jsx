import React from 'react'
import '../styles/TelaUsuarioOuEmpresa.css'
import { Link } from 'react-router-dom'

function TelaUsuarioOuEmpresa() {
    return (
            <div className="tudoUsuarioOuEmpresa">

                <div className="tudoBtsImgsTxt">
                    <div className="posiImg">
                        <img src="./img/seta.png" className="imagemSeta" />
                        <img src="./img/logo.png" className="imagemInklua" />
                    </div>
                    <div className="textos">
                        <h1>Realize seu login !</h1>
                        <h3>Login como usuário para avaliar eventos ou como empresa para organizá-los.</h3>
                    </div>
                    <div className="posiBtImg">
                        <div className="btsImgs">
                            <div className="imagemDiv">
                                <img src="./img/mãos .png" className="imagemEmpre" />
                            </div>
                            <Link to='' className='botaoImg'>Empresa</Link>
                        </div>
                        <img src="./img/image.png" className="imagemPcds" />
                        <div className="btsImgs">
                            <div className="imagemDiv">
                                <img src="./img/img usuario.png" className="imagemUsuar" />
                            </div>
                            <Link to='/TelaLogin' className='botaoImg'>Usuário</Link>
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default TelaUsuarioOuEmpresa
