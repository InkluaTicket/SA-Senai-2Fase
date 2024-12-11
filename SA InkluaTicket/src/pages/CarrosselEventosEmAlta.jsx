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
        <h1 className='carEvent'>Eventos em alta</h1>
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
                      <h2 className='carTts'>Conferência Brasileira Clima & Carbono 2024</h2>
                      <h3 className='carTts'>Promovido pela Aliança Brasil NBS, a Conferência Brasileira Clima e Carbono é um encontro anual que reúne  profissionais e especialistas do setor. </h3>
                      <h3 className='carTts'>15 out - 2024 • 08:00 / 16 out - 2024 • 22:00</h3>
                      <h3 className='carTts'>Teatro Santander, São Paulo - SP</h3>
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
                      <h2 className='carTts'>INDIE POP</h2>
                      <h3 className='carTts'>uma edição da indiepop.
                        unindo o mainstream com a autenticidade do alternativo,
                        vamos curtir juntos uma noite fodaaa!</h3>
                      <h3 className='carTts'>21 set - 2024 • 23:00 / 22 set - 2024 • 05:00</h3>
                      <h3 className='carTts'>Rua dos Inconfidentes, 1068, Belo Horizonte - MG</h3>
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
                      <h2 className='carTts'>27º Congresso Internacional UNIDAS</h2>
                      <h3 className='carTts'>no evento de alcance nacional que promete reunir instituições filiadas.</h3>
                      <h3 className='carTts'>27 nov - 2024 • 08:00 / 29 nov - 2024 • 19:00</h3>
                      <h3 className='carTts'>CentroSul Florianópolis, Florianópolis - SC</h3>
                    </div>
                    <button className="btCarrosselPrincipal">Ver Mais</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Repetir para outros itens */}
          </div>
        </div>
        <button aria-label='Botão carrossel' className="carrossel-botao anterior" onClick={imgAnterior}>
          ‹
        </button>
        <button aria-label='Botão carrossel' className="carrossel-botao proximo" onClick={proximoImg}>
          ›
        </button>
      </div>
    </div>
  )
}

export default CarrosselEventosEmAlta
