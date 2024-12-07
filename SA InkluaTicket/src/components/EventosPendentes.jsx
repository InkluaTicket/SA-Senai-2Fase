import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/CardEventos.css'

function EventosPendentes() {
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

    useEffect(() => {

     SelectEvent();

    }, [])

  return (
    <div>
      
      {EventosAnalise.map((evento) =>(

<ul className='container'>

<li className='Card'  onClick={() => navigator(`/eventosAceitos/${evento.id}`)} key={evento.id}>

<div className="card">
                <img className='imagemEvento' src="./img/imgS.jpg"/>
                <div className="div-inform">
                    <h2 className='descricao'>27º Congresso Internacional UNIDAS - Inovação impulsionando o propósito das autogestões</h2>
                    <h2 className='data'>27 nov - 2024 • 08:00 {'>'} 29 nov - 2024 • 19:00</h2>
                    <p className='local'>CentroSul Florianópolis, Florianópolis - SC</p>
                </div>
            </div>




</li>
</ul>
))}
    </div>
  )
}

export default EventosPendentes
