
import '../styles/CarrosselEventosSoli.css';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/CardEventos.css'

function CarrosselEventosSolicitados() {

  const navigator = useNavigate();
    const [EventosAnalise, setAnalise] = useState([])

    const SelectEvent = async () =>{

      try{

       const response = await fetch('http://localhost:3000/eventosAnalise', {

          method: 'GET',
          headers: {'Content-type' : 'application/json'}
       })

       if(response.ok){

          const data = await response.json();
          setAnalise(data)


       }else{

          console.error('Erro ao buscar eventos pendentes!')

       }

      }catch(err){

          console.error('Erro de rede:', err);

      }

  }



    const [slideEventoSoli, setSlideEventoSoli] = useState(0)

  function proximoEventoSoli() {
    setSlideEventoSoli((prev) => (prev + 1) % 3)
  }
  function EventoSoliAnterior() {
    setSlideEventoSoli((prev) => (prev - 1 + 3) % 3)
  }

  useEffect(() => {

    SelectEvent();

  }, [])

  return (
    <div className="tudocarrosselEventSoli">
      {/* Carrossel de Eventos Solicitados */}
      <div className="carrosselEventSoli">
        <h1 className='carrosselShFeEvTEXTOEventSoli'>Eventos Solicitados</h1> <img className='iconAnalise' src="./img/icon-analize.png" />
        <div className="carrossel-conteudoSoliciEventSoli" style={{ transform: `translateX(-${slideEventoSoli * 35}%)` }}>
        {EventosAnalise.map((evento) =>(

<ul aria-label='Card de evento' className='container'>

<li tabIndex={0} onClick={() => navigator(`/eventosAceitos/${evento.id}`)} className='Card' key={evento.id}>

<div className="card">
                <img className='imagemEvento' src={evento.imagem}/>
                <div className="div-inform">
                    <h2 aria-label='Nome do evento' className='descricao'>{evento.nome}</h2>
                    <h2 aria-label='Data de início do evento' className='data'>{evento.data_inicio} {'>'} {evento.data_fim}</h2>
                    <p aria-label='Local do evento' className='local'>{evento.local_evento}</p>
                </div>
            </div>




</li>
</ul>
))}
        </div>
        <button tabIndex={-1} className="carrossel-botao11 anterior2EventSoli" onClick={EventoSoliAnterior}>‹</button>
        <button tabIndex={-1} className="carrossel-botao22 proximo2EventSoli" onClick={proximoEventoSoli}>›</button>
      </div>
    </div>
  )
}

export default CarrosselEventosSolicitados
