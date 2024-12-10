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
    <div className="tudocarrosselEventSoli">
      {/* Carrossel de Eventos Solicitados */}
      <div className="carrosselEventSoli">
        <h1 className='carrosselShFeEvTEXTOEventSoli'>Eventos Solicitados</h1>
        <div className="carrossel-conteudoSoliciEventSoli" style={{ transform: `translateX(-${slideEventoSoli * 35}%)` }}>
          <CardEventos />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy1 />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy2 />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy3 />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy4 />
          <div className="espacoEventosEventSoli"></div>
          <CardEventosCopy5 />
        </div>
        <button className="carrossel-botao11 anterior2EventSoli" onClick={EventoSoliAnterior}>‹</button>
        <button className="carrossel-botao22 proximo2EventSoli" onClick={proximoEventoSoli}>›</button>
      </div>
    </div>
  )
}

export default CarrosselEventosSolicitados
