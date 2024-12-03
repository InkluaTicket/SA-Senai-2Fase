import React, { useEffect, useState } from 'react'
import '../styles/Perfil2.css';
import NavbarPefil from './NavbarPerfil';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

function Perfil() {

  const [isCheckedTrue, setChecked] = useState(false)
  const [isCheckedFalse, setCheckedFalse] = useState(false)  
  const [Pcd, setPcd] = useState(false)
  const [User, setUser] = useState('')
  const token = localStorage.getItem('token') || localStorage.getItem('tokenAdm') || localStorage.getItem('tokenEmpresa')


  const Renderizar = async () => {

    try {
      const response = await fetch('http://localhost:3000/perfil', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      });

      if (response.ok) {

        
        const decode = jwt_decode(token)

        if(decode.papel === 'Usuário'){
          const userData = await response.json();
          setUser(userData)
          console.log(userData)

          
      
        }else{

          console.log('ADM ATIVO')

        }
        
      }

    }

    catch (err) {

      console.error('Erro ao buscar usuario', err)

    }

  }


  useEffect(() => {

    Renderizar();


  }, [])

  useEffect(() => {

    if(User.possui_deficiencia){

        setChecked(true)
        setCheckedFalse(false)
        setPcd(true)

    }else{

        setCheckedFalse(true)
        setChecked(false)
        setPcd(false)

    }

  }, [User])

  return (
    <>  

<NavbarPefil/>
<div className='Corpo-containerUser'>



<div className='divUmUser'>

  <img className='iconUser' src="./img/fotoUser.png" alt="User Icon" /> 
  { Pcd &&
  <img className='verificado1User' src="./img/img logo.png" alt="" />}
  <p className='nomeUser'>{User.nome}</p>

  <label className='possuiDeficienciaUser'>Possui alguma deficiência?</label> <img className='verificado2User' src="./img/img logo.png" alt="" />
  
  <div className="checkBoxGroupUser">
  <div>
    <input type="checkbox" checked={isCheckedTrue} className="checkBoxUser" id="sim" />
    <label htmlFor="simUser">Sim</label>
  </div>
  <div>
    <input type="checkbox" checked={isCheckedFalse} className="checkBoxUser" id="nao" />
    <label htmlFor="naoUser">Não</label>
  </div>
</div>


  <label className='deficienciaUser'>Deficiência:</label>
  <input className='inptsUser' disabled value={Pcd ? User.deficiencia
          : ('Não possui')} type="text" />


  <label className='detalhesUser'>Detalhes:</label>
  <input className='inptsUser' disabled value={Pcd ? User.detalhes_deficiencia : ('Não possui')}  type="text" />

</div>


<div className="divLinhaUser"></div>


<div className='divDoisUser'>
  
  <h1 className='Frase1User'>Mantenha suas informações seguras!</h1>

  <p className='Texto1User'>Evite compartilhar seus dados pessoais com outras pessoas. 
    Suas informações são protegidas e usadas apenas para 
    melhorar sua experiência.</p>

    <h1 className='Frase2User'>Atualização é importante!</h1>
  
  <p className='Texto2User'>Mantenha suas informações atualizadas para garantir uma 
  experiência mais personalizada e eficiente.</p>

  <Link to='/GerenciamentoUser' className='gerenciarUser'>Gerenciar Perfil</Link>
  <img className='iconGerenciarUser' src="./img/gerenciamentoUser.png"/>
  
  
</div>


</div>
</>
  )
}

export default Perfil