import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CardEventosEmpresa.css'
import '../styles/CarrosselEmpresaAceitos.css'

function EventosAceitosEmpresa() {
    const navigator = useNavigate();
    const [EventosAnalise, setAnalise] = useState([])
  

    const SelectEvent = async () => {
        try {
            const response = await fetch('http://localhost:3000/EventosAceitosEmpresa', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('tokenEmpresa')}`,
                },
            });
    
            // Log completo da resposta para depuração
            console.log('Status:', response.status);
            console.log('Resposta:', response);
    
            if (response.ok) {
                const data = await response.json();
                console.log('Eventos recebidos:', data); // Verifique se os dados estão corretos
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

<div className="tudocarrosselEmpAceito">

       {EventosAnalise.length == 0 ? <> <h1 className='semEventos'>Sem eventos</h1> <img className="vazio" src="./img/icon-vazio.png" alt="" /> </> : <>{/* Carrossel de Festivais */}
      <div className="carrosselEmpAceito">
   
        <div className="carrossel-conteudoEmpAceito" style={{ transform: `translateX(-${slideFestival * (100 / totalSlides)}%)`, }}>
          

        {EventosAnalise.map((evento) =>(

<ul aria-label='Card de evento' className='container'>

<li tabIndex={0} className='Card'  onClick={() => navigator(`/eventosAceitos/${evento.id}`)} key={evento.id}>

<div className="cardEmp">
                <img className='imagemEventoEmp' src={evento.imagem}/>
                <div className="div-informEmp">
                    <h2 aria-label='Nome do evento' className='descricaoEmp'>{evento.nome}</h2>
                    <h2 aria-label='Data de início do evento' className='dataEmp'>{evento.data_inicio} {'>'} {evento.data_fim}</h2>
                    <p aria-label='Local do evento' className='localEmp'>{evento.local_evento}</p>
                </div>
            </div>




</li>
</ul>
))}

        </div>
        <button className="carrossel-botao2Emp anterior2EmpAceito" onClick={festivalAnterior}>‹</button>
        <button className="carrossel-botao2Emp proximo2EmpAceito" onClick={proximoFestival}>›</button>
      </div> </>}

      
    </div>
</div>
    
  )
}

export default EventosAceitosEmpresa
