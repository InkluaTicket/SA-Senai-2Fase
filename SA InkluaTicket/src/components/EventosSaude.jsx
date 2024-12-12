import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/CardEventos.css'

function EventosSaude() {
    const navigator = useNavigate();
    const [EventosAnalise, setAnalise] = useState([])
  

    const SelectEvent = async () => {
        try {
            const response = await fetch('http://localhost:3000/eventosSaude', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
            });
    
            // Log completo da resposta para depuração
            console.log('Status:', response.status);
            console.log('Resposta:', response);
    
            if (response.ok) {
                const data = await response.json();
                setAnalise(data);
               
            } else {
                const errorData = await response.json(); // Para ver detalhes do erro
                console.error('Erro na resposta:', errorData);
            }
        } catch (err) {
            console.error('Erro de rede:', err);
        }
    };
    


    const [slideFestival, setSlideFestival] = useState(0);
     
    const totalSlides = EventosAnalise.length;

  function proximoFestival() {
    if (totalSlides > 0) {
        setSlideFestival((prev) => (prev + 2) % totalSlides);
    }
  }
  function festivalAnterior() {
    if (totalSlides > 0) {
        setSlideFestival((prev) => (prev - 2 + totalSlides) % totalSlides);
    }
  }


    useEffect(() => {

     SelectEvent();
     

    }, [])

  return (
    
<div>

<div className="tudocarrossel">

       {EventosAnalise.length == 0 ? <> <h1 className='semEventos'>Sem eventos</h1> <img className="vazio" src="./img/icon-vazio.png" alt="" /> </> : <>{/* Carrossel de Festivais */}
      <div className="carrossel">
        <div className="carrossel-conteudo" style={{ transform: `translateX(-${slideFestival * (100 / totalSlides)}%)`, }}>
          

        {EventosAnalise.map((evento) =>(

<ul aria-label='Card de evento saúde' className='container'>

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
        <button className="carrossel-botao2 anterior2" onClick={festivalAnterior}>‹</button>
        <button className="carrossel-botao2 proximo2" onClick={proximoFestival}>›</button>
      </div> </>}

      
    </div>
</div>
    
  )
}

export default EventosSaude
