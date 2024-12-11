import React, { useEffect, useState } from 'react'
import '../styles/GerenciamentoEmpresa.css';
import jwt_decode from "jwt-decode"
import NavbarGerenEmpre from '../components/NavbarGerenEmpre';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import EventosPendentesEmpresa from '../components/EventosPendentesEmpresa';
import EventosAceitosEmpresa from '../components/EventosAceitosEmpresa';

function GerenciamentoEmpresa() {

  const [User, setUser] = useState('')
  const [NomeEdit, setNomeEdit] = useState(true)
  const [TelefoneEdit, setTeleEdit] = useState(true)
  const [limparFile, setLimpar] = useState(false)
  const [CEPEdit, setCEPEdit] = useState(true)
  const [DefEdit, setDefEdit] = useState(true)
  const [Pcd, setPcd] = useState(false)
  const [disabledCEP, setDisabledCEP] = useState(false)
  const [disabledTele, setDisabledTele] = useState(false)
  const [SalvarAlteracoes, setAlterar] = useState(false)
  const [MostrarPrev, setMostrar] = useState(true)
  const [imgPreview, setPrev] = useState(null)
  const [NewInfos, setNew] = useState({ NovaImagem: null, 
    NovoCEP: '', NovoTelefone: '', NovaCNPJ: ''  })

    const token = localStorage.getItem('tokenEmpresa') 
    const navigate = useNavigate();


  const dados = false

  const ChangeName = () => {

    if(NomeEdit === true)
        {setNomeEdit(false); setAlterar(true)}

    else if(Pcd){

        setNomeEdit(true); if(TelefoneEdit === true && CEPEdit === true && DefEdit === true && imgPreview === null || imgPreview === 
        false){

            setAlterar(false)
            setNew({...NewInfos, NovoNome: User.nome})
    
        }

    }else if(!Pcd && NomeEdit === false){ 
    setNomeEdit(true); if(TelefoneEdit === true && CEPEdit === true && imgPreview === null || imgPreview === false){

        setAlterar(false)
        setNew({...NewInfos, NovoNome: User.nome})
        

    }}


     
}

const ChangeTele = () => {
  if (TelefoneEdit ) {
    // Ativar o campo (tornar editável)
    setTeleEdit(false);
    setDisabledTele(false);
    setAlterar(false)
  } else {
    // Desativar o campo (tornar não editável)
    setTeleEdit(true);
    setDisabledTele(true);
    setAlterar(true)

    // Verificar condições para restaurar o estado inicial
    if (NomeEdit && CEPEdit && (!imgPreview || imgPreview === false)) {
      setAlterar(true);
      setNew((prev) => ({ ...prev, NovoTelefone: User.telefone }));
    }
  }
};

const ChangeCEP = () => {
  if (CEPEdit) {
    // Ativar o campo (tornar editável)
    setCEPEdit(false);
    setDisabledCEP(false); // Permitir edição do CEP
    setAlterar(false)
  } else {
    // Desativar o campo (tornar não editável)
    setCEPEdit(true);
    setDisabledCEP(true);
    setAlterar(true) // Bloquear edição

    // Restaurar valor inicial do CEP, se necessário
    if (!imgPreview || imgPreview === false) {
      setAlterar(true);
      setNew((prev) => ({ ...prev, NovoCEP: User.endereco }));
    }
  }
};

const Salvar = async (e) => {

  e.preventDefault();

  const formData = new FormData();


  formData.append('NovoCEP', NewInfos.NovoCEP);
  formData.append('NovoTelefone', NewInfos.NovoTelefone);



  if(NewInfos.NovaImagem){

    formData.append('NovaImagem', NewInfos.NovaImagem);

  }


  try{ 
  const response = await fetch('http://localhost:3000/editarEmpresa', {

    method: 'POST', 
    headers: {
              'Authorization': `Bearer ${token}`

             },
              
    body: formData

  })

   if(response.ok){
     const data = await response.json();
     setNew({...User, ...NewInfos} )
     
     
     window.location.reload();
     
     

   }
}catch(err){

console.error('DEU MERDA AI PATRÃO', err)

}

}

const Renderizar = async () => {

  try {
    const response = await fetch('http://localhost:3000/perfilEmpresa', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    });

    if (response.ok) {

      
      const decode = jwt_decode(token)

      if(decode.papel === 'Empresa'){
        const userData = await response.json();
        setUser(userData)
        console.log(decode)

        
    
      }else{

        console.log('ADM ATIVO')

      }
      
    }

  }

  catch (err) {

    console.error('Erro ao buscar usuario', err)

  }

}


const Cancelar = () =>{

  setCEPEdit(true)
  setNomeEdit(true)
  setTeleEdit(true)
  setDefEdit(true)
  setAlterar(false)
  setMostrar(true)
  setLimpar(true)
  setPrev(null)

  if(NewInfos.NovaImagem){
      setNew({NovoNome: User.nome, NovoTelefone: User.telefone, NovoCEP: User.endereco, NovaImagem: 
   User.imagem, NovaDetalhesDef: User.detalhes_deficiencia})
  }else{
  
    setNew({NovoNome: User.nome, NovoTelefone: User.telefone, NovoCEP: User.endereco, NovaImagem: null, NovaDetalhesDef: User.detalhes_deficiencia})
  
  }
  

}


  const Logout = () => {

    localStorage.removeItem('tokenEmpresa') 
    navigate('/')

  }

  useEffect(() =>{

Renderizar();

  }, [])

  useEffect(() => {

    setNew({ 
        NovaImagem: User.imagem, 
        NovoCEP: User.endereco, 
        NovoTelefone: User.telefone
         })

        
        

        console.log(NewInfos)

  }, [User])

  return (

    <>

    <NavbarGerenEmpre/>

    <div className='container-GerenEmpre'>

      <div className='divUmEmpre'>
      <img tabIndex={0} onClick={Logout} className='iconsairEmpre' src="./img/icon-LogOut.png" />
      <h1  className='sairGerenEmpre'>SAIR DA CONTA</h1>

      <div className='div-excluirEmpre'>
        <h1 className='excluirEmpre'>EXCLUIR CONTA</h1>
        <img className='iconLixoEmpre' src="./img/iconLixo.png" alt="" />
        </div>

        {  MostrarPrev ? <><> {NewInfos.NovaImagem ? <> <img className='iconUserGerenc' style={{marginLeft: '260px', borderRadius:'50%'}} src={NewInfos.NovaImagem} alt="" /> </> : <> <img className='iconUserGeren' src="./img/fotoUser.png" alt="User Icon" /></>}  </>  </> : 
        <> <img className='iconUserGerenc' src={imgPreview} style={{borderRadius: '50%', marginLeft: '260px'}} alt="" /> </>
          }

        <label className='alterarfotoEmpre'>

        <input type="file" onChange={(e) => { 

const file = e.target.files[0];
setMostrar(false)
setAlterar(true)
if(limparFile){

   e.target.value = null
   
}
setPrev(URL.createObjectURL(file))
setNew({...NewInfos, NovaImagem: file}); 


}} style={{display: 'none'}} />

          alterar foto <img className='iconeFotoEmpre' src="./img/iconFoto.png" alt="" />
        </label>

        

        <img className='verific-empresa' src="./img/verif-empresa.png" alt="" />

        <div className='div-inptMaeEmpre'>

          <div className='div-inpt1Empre'>
            <label className='labelInptsEmpre'>Nome empresa</label>
            <input className='inptsEmpre' type="text" aria-disabled='true' value={User.nome} />

            
            
            <label className='labelInptsEmpre'>Telefone</label>
          
            <InputMask
             mask="(99) 99999-9999"
             alwaysShowMask={false}
             className={disabledTele ? 'inptsEmpreHab' : 'inptsEmpre'} type="text" aria-disabled={disabledTele}
             onChange={(e) => setNew({...NewInfos, NovoTelefone: e.target.value})}
             value={NewInfos.NovoTelefone}
             ></InputMask>
 
            <img tabIndex={0} onClick={ChangeTele} onKeyDown={ ()  => {if(key === 'Enter'){ChangeTele();}}} className='LapisEditTeleEmp'
                    src="./img/iconLapis.png" alt="" />
 
            <label className='labelInptsEmpre'>CEP</label>
        

            <InputMask
             mask='99999-999'
             className={disabledCEP ? 'inptsEmpreHab' : 'inptsEmpre'}
             type="text" aria-disabled={disabledCEP}
             onChange={(e) => setNew({...NewInfos, NovoCEP: e.target.value})}
             value={NewInfos.NovoCEP}/>

          </div>

          <img tabIndex={0} onClick={ChangeCEP} onKeyDown={ ()  => {if(key === 'Enter'){ChangeCEP();}}} className='LapisEditCEPEmp'
                    src="./img/iconLapis.png" alt="" />

          <div className='div-inpt2Empre'>
            <label className='labelInptsEmpre'>E-mail</label>
            <input className='inptsEmpre' type="text" aria-disabled='true' value={User.email}/>


            <label className='labelInptsEmpre'>CNPJ</label>
            <input className='inptsEmpre' type="text" aria-disabled='true' value={User.cnpj} />
            


            <label className='labelInptsEmpre'>Senha</label>
            <input className='inptsEmpre' type="text" aria-disabled='true' value={User.senha} /> <br />
          </div>

          
        

        </div>
        {SalvarAlteracoes &&  
        <><button onClick={Salvar} className='salvarGerenUser'>Salvar alterações</button> <button onClick={Cancelar} className='cancelarGerenUser'>Cancelar</button></>}


      </div>


      <div className="divLinhaEmpre"></div>


      <div className='divDoisEmpre'>
        
        
        <h1>Eventos em análise</h1>

        <EventosPendentesEmpresa/>

        <h1>Eventos aceitos</h1>

        <EventosAceitosEmpresa/>

      

        

      </div>

    </div>

    </>

)
}


export default GerenciamentoEmpresa