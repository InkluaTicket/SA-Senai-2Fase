import React, { useState } from 'react';
import '../styles/CarrosselEventosAtivosMod.css';
import CardEventos from './cardEventos';
import CardEventosCopy from './CardEventosCopy';
import CardEventosCopy1 from './CardEventosCopy1';
import CardEventosCopy2 from './CardEventosCopy2';
import CardEventosCopy3 from './CardEventosCopy3';
import CardEventosCopy4 from './CardEventosCopy4';
import CardEventosCopy5 from './CardEventosCopy5';

function CarrosselEventosAtivosMod() {

    const [slideEventoAtivoMod, setSlideEventoAtivoMod] = useState(0)

    function proximoEventoAtivoMod() {
        setSlideEventoAtivoMod((prev) => (prev + 1) % 3)
    }
    function EventoAtivoModAnterior() {
        setSlideEventoAtivoMod((prev) => (prev - 1 + 3) % 3)
    }

  return (
    <div className="tudocarrosselEventoAtivoMod">
      {/* Carrossel de Eventos Ativos do Painel do Moderador */}
      <div className="carrosselEventoAtivoMod">
        <h1 className='carrosselShFeEvTEXTOEventoAtivoMod'>Eventos Ativos</h1> <img className='iconAtivo' src="./img/IconAtivo.png" />
        <div className="carrossel-conteudoEventoAtivoMod" style={{ transform: `translateX(-${slideEventoAtivoMod * 35}%)` }}>
          <CardEventos />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy1 />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy2 />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy3 />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy4 />
          <div className="espacoEventosEventoAtivoMod"></div>
          <CardEventosCopy5 />
        </div>
        <button className="botao1EventoAtivo anterior2EventoAtivoMod" onClick={EventoAtivoModAnterior}>‹</button>
        <button className="botao2EventoAtivo proximo2EventoAtivoMod" onClick={proximoEventoAtivoMod}>›</button>
      </div>
    </div>
  )
}

export default CarrosselEventosAtivosMod
