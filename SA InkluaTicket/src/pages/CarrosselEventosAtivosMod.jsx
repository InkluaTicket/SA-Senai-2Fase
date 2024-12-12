import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import '../styles/CarrosselEventosAtivosMod.css';
import CardEventos from './cardEventos';
import CardEventosCopy from './CardEventosCopy';
import CardEventosCopy1 from './CardEventosCopy1';
import CardEventosCopy2 from './CardEventosCopy2';
import CardEventosCopy3 from './CardEventosCopy3';
import CardEventosCopy4 from './CardEventosCopy4';
import CardEventosCopy5 from './CardEventosCopy5';

function CarrosselEventosAtivosMod() {

  const navigator = useNavigate();
    const [EventosAnalise, setAnalise] = useState([])
  

    const SelectEvent = async () => {
        try {
            const response = await fetch('http://localhost:3000/eventosAceitos', {
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
    

    const [slideEventoAtivoMod, setSlideEventoAtivoMod] = useState(0)

    function proximoEventoAtivoMod() {
        setSlideEventoAtivoMod((prev) => (prev + 1) % 3)
    }
    function EventoAtivoModAnterior() {
        setSlideEventoAtivoMod((prev) => (prev - 1 + 3) % 3)
    }

    useEffect(() => {SelectEvent();}, [])

  return (
    <div className="tudocarrosselEventoAtivoMod">
      {/* Carrossel de Eventos Ativos do Painel do Moderador */}
      <div className="carrosselEventoAtivoMod">
        <h1 className='carrosselShFeEvTEXTOEventoAtivoMod'>Eventos Ativos</h1> <img className='iconAtivo' src="./img/IconAtivo.png" />
        <div className="carrossel-conteudoEventoAtivoMod" style={{ transform: `translateX(-${slideEventoAtivoMod * 35}%)` }}>
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
        <button tabIndex={-1} aria-label='voltar carrossel' className="botao1EventoAtivo anterior2EventoAtivoMod" onClick={EventoAtivoModAnterior}>‹</button>
        <button tabIndex={-1} aria-label='passar carrossel' className="botao2EventoAtivo proximo2EventoAtivoMod" onClick={proximoEventoAtivoMod}>›</button>
      </div>
    </div>
  )
}

export default CarrosselEventosAtivosMod
