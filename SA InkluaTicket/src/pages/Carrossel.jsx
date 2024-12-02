import React, { useState, useEffect } from 'react'
import '../styles/Carrossel.css'

function Carrossel() {
  const [slideAtual, setSlideAtual] = useState(0)
  const [slideShow, setSlideShow] = useState(0)
  const [slideFestival, setSlideFestival] = useState(0)
  const [slideEventos, setSlideEventos] = useState(0)

  function proximoImg() {
    setSlideAtual((prev) => (prev + 1) % 3)
  }
  function imgAnterior() {
    setSlideAtual((prev) => (prev - 1 + 3) % 3)
  }
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     proximoImg();
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, []);


  function proximoShow() {
    setSlideShow((prev) => (prev + 1) % 4)
  } function showAnterior() {
    setSlideShow((prev) => (prev - 1 + 4) % 4)
  }

  function proximoFestival() {
    setSlideFestival((prev) => (prev + 1) % 4)
  } function festivalAnterior() {
    setSlideFestival((prev) => (prev - 1 + 4) % 4)
  }

  function proximoEventos() {
    setSlideEventos((prev) => (prev + 1) % 4)
  } function eventosAnterior() {
    setSlideEventos((prev) => (prev - 1 + 4) % 4)
  }

  return (
    <div className="tudocarrossel">
      <div className="carrosselPrincipal">
        <h2>Eventos em alta</h2>
        <div className="carrosselTudoImgTt" style={{ transform: `translateX(-${slideAtual * 100}%)` }}>
          <div className="carrosselsImgsTts">
            <div className="carrossel-item">
              <div className="carrosselImgTt">
                <img src="./img/imgC.jpg" className="imgs123" />
              </div>
              <div className="carrosselImgTtDois">
                <div className="textosDosShows">
                  <h2>h1 bla bla bla bla</h2>
                  <h3>h2 descrição do shows bla bla bla bla</h3>
                  <h3>h2 data do shows bla bla bla bla</h3>
                  <h3>h2 localização do shows bla bla bla bla</h3>
                  <button className='btCarrosselPrincipal'>Ver Mais</button>
                </div>
              </div>
            </div>

            <div className="carrossel-item2">
              <div className="carrosselImgTt2">
                <img src="./img/imgI.png" className="imgs123" />
              </div>
              <div className="carrosselImgTtDois2">
                <div className="textosDosShows2 ">
                  <h2>h1 bla bla bla bla 2</h2>
                  <h3>h2 descrição do shows bla bla bla bla 2</h3>
                  <h3>h2 data do shows bla bla bla bla 2</h3>
                  <h3>h2 localização do shows bla bla bla bla 2</h3>
                  <button className='btCarrosselPrincipal'>Ver Mais</button>
                </div>
              </div>
            </div>

            <div className="carrossel-item3">
              <div className="carrosselImgTt3">
                <img src="./img/imgS.jpg" className="imgs123" />
              </div>
              <div className="carrosselImgTtDois3">
                <div className="textosDosShows3">
                  <h2>h1 bla bla bla bla</h2>
                  <h3>h2 descrição do shows bla bla bla 3</h3>
                  <h3>h2 data do shows bla bla bla bla 3</h3>
                  <h3>h2 localização do shows bla bla bla bla 3</h3>
                  <button className='btCarrosselPrincipal'>Ver Mais</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        <button className="carrossel-botao anterior" onClick={imgAnterior}>‹</button>
        <button className="carrossel-botao proximo" onClick={proximoImg}>›</button>
      </div>

      {/* carrosssel de Shows e Festivais e Eventos */}
      <div className="carrosselShowsFestivaisEventos">
        {/* Carrossel de Shows */}
        <div className="carrossel">
          <h2>Shows</h2>
          <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideShow * 35}%)` }}>
            <div className="cartao">
              <h3>Show 1</h3>
              <p>Detalhes sobre o Show 1</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 2</h3>
              <p>Detalhes sobre o Show 2</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 3</h3>
              <p>Detalhes sobre o Show 3</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 4</h3>
              <p>Detalhes sobre o Show 4</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 5</h3>
              <p>Detalhes sobre o Show 5</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 6</h3>
              <p>Detalhes sobre o Show 6</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 7</h3>
              <p>Detalhes sobre o Show 7</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 8</h3>
              <p>Detalhes sobre o Show 8</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 9</h3>
              <p>Detalhes sobre o Show 9</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 10</h3>
              <p>Detalhes sobre o Show 10</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 11</h3>
              <p>Detalhes sobre o Show 11</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Show 12</h3>
              <p>Detalhes sobre o Show 12</p>
            </div>
          </div>
          <button className="carrossel-botao2 anterior2" onClick={showAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoShow}>›</button>
        </div>

        {/* Carrossel de Festivais */}
        <div className="carrossel">
          <h2>Festivais</h2>
          <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideFestival * 35}%)` }}>
            <div className="cartao">
              <h3>Festival 1</h3>
              <p>Detalhes sobre o Festival 1</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 2</h3>
              <p>Detalhes sobre o Festival 2</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 3</h3>
              <p>Detalhes sobre o Festival 3</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 4</h3>
              <p>Detalhes sobre o Festival 4</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 5</h3>
              <p>Detalhes sobre o Festival 5</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 6</h3>
              <p>Detalhes sobre o Festival 6</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 7</h3>
              <p>Detalhes sobre o Festival 7</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 8</h3>
              <p>Detalhes sobre o Festival 8</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 9</h3>
              <p>Detalhes sobre o Festival 9</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 10</h3>
              <p>Detalhes sobre o Festival 10</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 11</h3>
              <p>Detalhes sobre o Festival 10</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Festival 12</h3>
              <p>Detalhes sobre o Festival 10</p>
            </div>
          </div>
          <button className="carrossel-botao2 anterior2" onClick={festivalAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoFestival}>›</button>
        </div>

        {/* Carrossel de Eventos */}
        <div className="carrossel">
          <h2>Eventos</h2>
          <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideEventos * 35}%)` }}>
            <div className="cartao">
              <h3>Eventos 1</h3>
              <p>Detalhes sobre o Eventos 1</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 2</h3>
              <p>Detalhes sobre o Eventos 2</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 3</h3>
              <p>Detalhes sobre o Eventos 3</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 4</h3>
              <p>Detalhes sobre o Eventos 4</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 5</h3>
              <p>Detalhes sobre o Eventos 5</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 6</h3>
              <p>Detalhes sobre o Eventos 6</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 7</h3>
              <p>Detalhes sobre o Eventos 7</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 8</h3>
              <p>Detalhes sobre o Eventos 8</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 9</h3>
              <p>Detalhes sobre o Eventos 9</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 10</h3>
              <p>Detalhes sobre o Eventos 10</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 11</h3>
              <p>Detalhes sobre o Eventos 11</p>
            </div>
            <div className="espacoShowFestivais"></div>
            <div className="cartao">
              <h3>Eventos 12</h3>
              <p>Detalhes sobre o Eventos 12</p>
            </div>
          </div>
          <button className="carrossel-botao2 anterior2" onClick={eventosAnterior}>‹</button>
          <button className="carrossel-botao2 proximo2" onClick={proximoEventos}>›</button>
        </div>

      </div>

    </div>
  )
}

export default Carrossel
