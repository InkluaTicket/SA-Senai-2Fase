import React, { useState } from 'react';
import '../styles/Carrossel.css';
import CardEventos from './cardEventos';
import CardEventosCopy from './CardEventosCopy';
import CardEventosCopy1 from './CardEventosCopy1';
import CardEventosCopy2 from './CardEventosCopy2';
import CardEventosCopy3 from './CardEventosCopy3';
import CardEventosCopy4 from './CardEventosCopy4';
import CardEventosCopy5 from './CardEventosCopy5';


function CarrosselShows() {
  const [slideShow, setSlideShow] = useState(0)

  function proximoShow() {
    setSlideShow((prev) => (prev + 1) % 3)
  }
  function showAnterior() {
    setSlideShow((prev) => (prev - 1 + 2) % 3)
  }

  return (
    <div className="tudocarrossel">
      {/* Carrossel de Shows */}
      <div className="carrossel">
        <h1 className='carrosselShFeEvTEXTO'>Shows</h1>
        <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideShow * 35}%)` }}>
          <CardEventos />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy1 />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy2 />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy3 />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy4 />
          <div className="espacoShowFestivais"></div>
          <CardEventosCopy5 />
        </div>
        <button className="carrossel-botao2 anterior2" onClick={showAnterior}>‹</button>
        <button className="carrossel-botao2 proximo2" onClick={proximoShow}>›</button>
      </div>
    </div>
  )
}

export default CarrosselShows
