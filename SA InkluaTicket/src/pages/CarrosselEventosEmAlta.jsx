import React, { useState, useEffect } from 'react';
import '../styles/Carrossel.css';


function CarrosselEventosEmAlta() {
  const [slideAtual, setSlideAtual] = useState(0);

  const imagensDeFundo = [
    '/public/img/ClimaCarbono2.png',
    '/public/img/imgI.png',
    '/public/img/img-card.png',
  ];

  function proximoImg() {
    setSlideAtual((prev) => (prev + 1) % imagensDeFundo.length);
  }
  function imgAnterior() {
    setSlideAtual((prev) => (prev - 1 + imagensDeFundo.length) % imagensDeFundo.length);
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
    </div>
  )
}

export default CarrosselEventosEmAlta
