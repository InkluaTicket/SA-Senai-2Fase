import React from 'react'
import Rodape from '../components/Rodape'
import Navbar from '../components/Navbar';
import "../styles/SobreNos.css"
import { Link } from 'react-router-dom';

function SobreNos() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <section className="container">
          <img src="./img/grupo.png" alt="Imagem do grupo" className="grupo" height={450} />
        </section>

        <section>
          <header>
            <h1 className="title">Sobre nós</h1>
            <hr className="linha-verde" />
          </header>

          <article className="paragrafo">
            <p className='pg'>
              Nossa jornada começa com jovens estudantes do SENAI, movidos por um compromisso genuíno de enfrentar um grande problema social. Nossa missão é melhorar as condições de entretenimento para pessoas com deficiência, garantindo que elas tenham acesso igualitário e inclusivo a momentos de lazer e cultura.
            </p>

            <p className='pg'>
              Somos um grupo de estudantes dedicados a fazer a diferença. Acreditamos que todos têm o direito ao entretenimento de qualidade, independentemente de suas limitações físicas ou sensoriais. Por isso, estamos empenhados em desenvolver soluções inovadoras e acessíveis que permitam uma experiência mais rica e inclusiva para todos.
            </p>

            <p className='pg'>
              Para alcançar esse objetivo, buscamos parcerias com empresas e organizações que compartilham dos mesmos princípios e valores de inclusão e respeito às pessoas com deficiência. Juntos, queremos criar um impacto positivo e duradouro, promovendo uma sociedade mais justa e equitativa.
            </p>

            <p className='pg'>
              Nosso projeto envolve a criação de dispositivos e tecnologias assistivas, bem como a adaptação de espaços e eventos culturais para torná-los mais acessíveis. Além disso, estamos comprometidos em conscientizar a sociedade sobre a importância da inclusão, incentivando mais empresas a adotarem práticas inclusivas em suas atividades.
            </p>

            <p className='pg'>
              Acreditamos que, ao unir forças com parceiros comprometidos com a causa, podemos transformar a realidade do entretenimento para pessoas com deficiência, oferecendo-lhes mais oportunidades de diversão e integração social. Nossa visão é de um futuro onde todos possam participar plenamente da vida cultural e recreativa, sem barreiras ou limitações.
            </p>

            <p className='pg'>
              Venha fazer parte dessa transformação conosco! Juntos, podemos construir um mundo mais inclusivo e acolhedor para todos.
            </p>

          </article>
          <hr className="linha-verde" />
        </section>

        <section className="call-to-action">
          <h1>Chegou o momento de agir!</h1>

          <p className="paragrafo">
            Agora estamos juntos de novo e melhores do que nunca no que fazemos de melhor. Queremos fazer a diferença no mundo e no nosso país, e precisamos da sua ajuda para isso!
            Adicionamos novas funcionalidades ao nosso site para pessoas cegas, um novo design e uma nova paleta de cores para tornar a experiência mais inclusiva.
          </p>
        </section>

        <Rodape />
      </main>

    </>
  )
}

export default SobreNos;
