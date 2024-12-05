import React from 'react'
import '../styles/CardEventos.css'

function CardEventos() {
    return (
        <div className='container-card'>
            <div className="card">
                <img className='imagemEvento' src="./img/ClimaCarbono2.png"/>
                <div className="div-inform">
                    <h2 className='descricao'>27º Congresso Internacional UNIDAS - Inovação impulsionando o propósito das autogestões</h2>
                    <h2 className='data'>27 nov - 2024 • 08:00 {'>'} 29 nov - 2024 • 19:00</h2>
                    <p className='local'>CentroSul Florianópolis, Florianópolis - SC</p>
                </div>
            </div>
        </div>
    )
}
export default CardEventos