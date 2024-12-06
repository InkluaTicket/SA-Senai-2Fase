import React, { useState, useEffect } from 'react';
import '../styles/Carrossel.css';
import CardEventos from './cardEventos';
import CardEventosCopy from './CardEventosCopy';
import CardEventosCopy1 from './CardEventosCopy1';
import CardEventosCopy2 from './CardEventosCopy2';
import CardEventosCopy3 from './CardEventosCopy3';
import CardEventosCopy4 from './CardEventosCopy4';
import CardEventosCopy5 from './CardEventosCopy5';


function Carrossel() {
  const [slideAtual, setSlideAtual] = useState(0);
  const [slideShow, setSlideShow] = useState(0)
  const [slideFestival, setSlideFestival] = useState(0)
  const [slideEventos, setSlideEventos] = useState(0)


  const imagensDeFundo = [
    '/public/img/ClimaCarbono2.png',
    '/public/img/imgI.png',
    '/public/img/img-card.png',
  ];

  function proximoImg() {
    setSlideAtual((prev) => (prev + 1) % imagensDeFundo.length);
  } function imgAnterior() {
    setSlideAtual((prev) => (prev - 1 + imagensDeFundo.length) % imagensDeFundo.length);
  }

  function proximoShow() {
    setSlideShow((prev) => (prev + 1) % 3)
  } function showAnterior() {
    setSlideShow((prev) => (prev - 1 + 2) % 3)
  }

  function proximoFestival() {
    setSlideFestival((prev) => (prev + 1) % 3)
  } function festivalAnterior() {
    setSlideFestival((prev) => (prev - 1 + 3) % 3)
  }

  function proximoEventos() {
    setSlideEventos((prev) => (prev + 1) % 3)
  } function eventosAnterior() {
    setSlideEventos((prev) => (prev - 1 + 3) % 3)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      proximoImg();
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tudocarrossel">
      <div
        className="carrosselPrincipal"
        style={{
          backgroundImage: `url(${imagensDeFundo[slideAtual]})`,
        }}
      >
        <h2>Eventos em alta</h2>
        <div className="carrosselTudoImgTt" style={{ transform: `translateX(-${slideAtual * 100}%)` }}>
          <div className="carrosselsImgsTts">
            <div className="carrossel-container">
              <div className="carrossel-item">
                <div className="carrosselImgTt">
                  <img src="./img/ClimaCarbono2.png" className="imgs123" />
                </div>
                <div className="carrosselImgTtDois">
                  <div className="textosDosShows">
                    <div className="carrosselTts">
                      <h2>Evento 1</h2>
                      <h3>Descrição do evento 1</h3>
                      <h3>Data do evento 1</h3>
                      <h3>Localização do evento 1</h3>
                    </div>
                    <button className="btCarrosselPrincipal">Ver Mais</button>
                  </div>
                </div>
              </div>
              <div className="carrossel-item2">
                <div className="carrosselImgTt2">
                  <img src="./img/imgI.png" className="imgs123" />
                </div>
                <div className="carrosselImgTtDois">
                  <div className="textosDosShows">
                    <div className='carrosselTts'>
                      <h2>Evento 2</h2>
                      <h3>Descrição do evento 2</h3>
                      <h3>Data do evento 2</h3>
                      <h3>Localização do evento 2</h3>
                    </div>
                    <button className="btCarrosselPrincipal">Ver Mais</button>
                  </div>
                </div>
              </div>
              <div className="carrossel-item3">
                <div className="carrosselImgTt3">
                  <img src="./img/img-card.png" className="imgs123" />
                </div>
                <div className="carrosselImgTtDois3">
                  <div className="textosDosShows">
                    <div className="carrosselTts">
                      <h2>Evento 3</h2>
                      <h3>Descrição do evento 3</h3>
                      <h3>Data do evento 3</h3>
                      <h3>Localização do evento 3</h3>
                    </div>
                    <button className="btCarrosselPrincipal">Ver Mais</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Repetir para outros itens */}
          </div>
        </div>
        <button className="carrossel-botao anterior" onClick={imgAnterior}>
          ‹
        </button>
        <button className="carrossel-botao proximo" onClick={proximoImg}>
          ›
        </button>
      </div>

      {/* carrosssel de Shows e Festivais e Eventos */}
      <div className="carrosselShowsFestivaisEventos">
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
            <CardEventosCopy5/>
          </div>
          <button className="carrossel-botao2 anterior2" onClick={showAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoShow}>›</button>
        </div>

        {/* Carrossel de Festivais */}
        <div className="carrossel">
          <h1 className='carrosselShFeEvTEXTO'>Festivais</h1>
          <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideFestival * 35}%)` }}>
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
            <CardEventosCopy5/>
          </div>
          <button className="carrossel-botao2 anterior2" onClick={festivalAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoFestival}>›</button>
        </div>

        {/* Carrossel de Eventos */}
        <div className="carrossel">
          <h1 className='carrosselShFeEvTEXTO'>Eventos</h1>
          <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideEventos * 35}%)` }}>
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
            <CardEventosCopy5/> 
          </div>
          <button className="carrossel-botao2 anterior2" onClick={eventosAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoEventos}>›</button>
        </div>

      </div>

    </div>
  )
}

export default Carrossel
