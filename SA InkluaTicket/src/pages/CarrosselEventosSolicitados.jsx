import React, { useState } from 'react';
import '../styles/CarrosselEventosSoli.css';
import CardEventos from './cardEventos';
import CardEventosCopy from './CardEventosCopy';
import CardEventosCopy1 from './CardEventosCopy1';
import CardEventosCopy2 from './CardEventosCopy2';
import CardEventosCopy3 from './CardEventosCopy3';
import CardEventosCopy4 from './CardEventosCopy4';
import CardEventosCopy5 from './CardEventosCopy5';

function CarrosselEventosSolicitados() {

    const [slideEventoSoli, setSlideEventoSoli] = useState(0)

  function proximoEventoSoli() {
    setSlideEventoSoli((prev) => (prev + 1) % 3)
  }
  function EventoSoliAnterior() {
    setSlideEventoSoli((prev) => (prev - 1 + 3) % 3)
  }

  return (
    <div className="tudocarrossel">
      {/* Carrossel de Eventos Solicitados */}
      <div className="carrossel">
        <h1 className='carrosselShFeEvTEXTO'>Eventos Solicitados</h1>
        <div className="carrossel-conteudoSolici" style={{ transform: `translateX(-${slideEventoSoli * 35}%)` }}>
          <CardEventos />
          <div className="espacoEventos"></div>
          <CardEventosCopy />
          <div className="espacoEventos"></div>
          <CardEventosCopy1 />
          <div className="espacoEventos"></div>
          <CardEventosCopy2 />
          <div className="espacoEventos"></div>
          <CardEventosCopy3 />
          <div className="espacoEventos"></div>
          <CardEventosCopy4 />
          <div className="espacoEventos"></div>
          <CardEventosCopy5 />
        </div>
        <button className="carrossel-botao1 anterior2" onClick={EventoSoliAnterior}>‹</button>
        <button className="carrossel-botao2 proximo2" onClick={proximoEventoSoli}>›</button>
      </div>
    </div>
  )
}

export default CarrosselEventosSolicitados
