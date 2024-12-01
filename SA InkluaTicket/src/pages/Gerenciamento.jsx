import React from 'react';
import jwt_decode from "jwt-decode"
import '../styles/Corpo.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Gerenciamento() {

  const [User, setUser] = useState('')
  const [Mostrar, setMostrar] = useState(false)
  const [isDisable, setDisable] = useState(true)
  const [NewInfos, setNew] = useState({NovoNome:'', NovaImagem: null, 
  NovoCEP: '', NovoTelefone: '', NovaDetalhesDef: ''  })

  const [SalvarEdicoes, setSalvar] = useState(false)
  const [imgPreview, setPrev] = useState(null)
  const [limparFile, setLimpar] = useState(false)
  const [isCheckedTrue, setChecked] = useState(false)
  const [isCheckedFalse, setCheckedFalse] = useState(false)
  const [Pcd, setPcd] = useState(false)
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || localStorage.getItem('tokenAdm')


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

  const Logout = () => {

    localStorage.removeItem('token') || localStorage.removeItem('tokenAdm')
    navigate('/')

  }

  useEffect(() => {

    Renderizar();

  }, [])

  useEffect(() => {

    setNew({ NovoNome: User.nome, 
        NovaImagem: User.imagem, 
        NovoCEP: User.endereco, 
        NovoCPF: User.cpf,
        NovaDetalhesDef: User.detalhes_deficiencia,
        NovoTelefone: User.telefone })

        
        if(User.possui_deficiencia){

            setChecked(true)
            setCheckedFalse(false)
            setPcd(true)

        }else{

            setCheckedFalse(true)
            setChecked(false)
            setPcd(false)

        }

        console.log(User)

  }, [User])

  return (
    <div className='Corpo-container'>

      <div className='divUm'>
        <h1 className='dadosDaConta'>Dados da Conta</h1>

        <img className='iconUser' src="./img/fotoUser.png" alt="User Icon" />

        <label className='alterarfoto'>
            <input type="file" style={{display: 'none'}} />
          alterar foto <img className='iconeFoto' src="./img/iconFoto.png" alt="Change Photo Icon" />
        </label>

        {Pcd && <> 
        <img className='verificado' src="./img/img logo.png" alt="" /></>}

        <div className='div-inptMae'>

          <div className='div-inpt1'>

            <label className='labelInpts'>Nome</label>
            <input className='inpts' type="text" disabled={isDisable} value={NewInfos.NovoNome}  onChange={(e) => 
                 setNew({...NewInfos, NovoNome: e.target.value})}/>

              <img className={Pcd ? 'LapisEditNomeDef' :'LapisEditNome' } src="./img/iconLapis.png" alt="" />

            <label className='labelInpts'>Telefone</label>
            <input className='inpts' type="text" disabled value={NewInfos.NovoTelefone}/>

            <img className={Pcd ? 'LapisEditTeleDef' : 'LapisEditTele'} src="./img/iconLapis.png" alt="" />

            
            <label className='labelInpts'>CEP</label>
            <input className='inpts' type="text" disabled value={NewInfos.NovoCEP}/> <br />

            <img className={Pcd ? 'LapisEditCEPDef' : 'LapisEditCEP'} src="./img/iconLapis.png" alt="" />


            
          </div>

          <div className='div-inpt2'>

          <label className='labelInpts'>E-mail</label>
          <input className='inpts' type="text" disabled value={User.email}/>

            <label className='labelInpts'>CPF</label>
            <input className='inpts' type="text" disabled value={User.cpf} />

            <label className='labelInpts'>Senha</label>
            <input className='inpts' type="text" disabled value={User.senha}/> <br />



            
          </div>

        </div>

        <button onClick={Logout} className='sair'>Sair da conta</button>


      </div>


      <div className="divLinha"></div>


      <div className='divDois'>
        
        <h1 className='especificacoes'>Especificações</h1>

        <div className='div-excluir'>
        <h1 className='excluir'>EXCLUIR CONTA</h1>
        <img className='iconLixo' src="./img/iconLixo.png" alt="User Icon" />
        </div>



        <label className='possuiDeficiencia'>Possui alguma deficiência?</label> <img className='verificado2' src="./img/img logo.png" alt="" />
        <input type="checkbox" className='checkBox' checked={isCheckedTrue} /> <label className='sim'>Sim</label>
        <input type="checkbox" className='checkBox' checked={isCheckedFalse}/> <label className='nao'>Não</label>


        <label className='deficiencia'>Deficiência:</label>
        <input className='inptsTela2' type="text" disabled value={Pcd ? User.deficiencia
          : ('Não possui')}/>


        <label className='detalhes'>Detalhes:</label>
        <input className='inptsTela2' type="text" />
      </div>


    </div>
  );
}


export default Gerenciamento;