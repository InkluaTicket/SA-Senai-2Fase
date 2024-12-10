import React from 'react';
import jwt_decode from "jwt-decode"
import '../styles/GerenciamentoUser.css';
import { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import NavbarGerenciamentoP from '../components/NavbarGerenciamentoP';


function Gerenciamento() {

  const [User, setUser] = useState('')
  const [MostrarPrev, setMostrar] = useState(true)
  const [SalvarAlteracoes, setAlterar] = useState(false)
  const [NewInfos, setNew] = useState({NovoNome:'', NovaImagem: null, 
  NovoCEP: '', NovoTelefone: '', NovaDetalhesDef: ''  })

  const [imgPreview, setPrev] = useState(null)
  const [limparFile, setLimpar] = useState(false)
  const [isCheckedTrue, setChecked] = useState(false)
  const [isCheckedFalse, setCheckedFalse] = useState(false)
  const [NomeEdit, setNomeEdit] = useState(true)
  const [TelefoneEdit, setTeleEdit] = useState(true)
  const [CEPEdit, setCEPEdit] = useState(true)
  const [DefEdit, setDefEdit] = useState(true)
  const [Pcd, setPcd] = useState(false)
  const [alteraçõesSucesso, setSucesso] = useState(false)
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

  const Logout = () => {

    localStorage.removeItem('token') || localStorage.removeItem('tokenAdm')
    navigate('/')

  }

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

    if(TelefoneEdit === true)
        {setTeleEdit(false); setAlterar(true)}

    else if(Pcd){

        setTeleEdit(true); if(NomeEdit === true && CEPEdit === true && DefEdit === true && imgPreview === null 
             || imgPreview === 
        false){

            setAlterar(false)
            setNew({...NewInfos, NovoTelefone: User.telefone})
    
        }
    }

    else if(!Pcd && TelefoneEdit === false){ 
    setTeleEdit(true); if(NomeEdit === true && CEPEdit === true && imgPreview === null || imgPreview === false){

        setAlterar(false)
        setNew({...NewInfos, NovoTelefone: User.telefone})

    }} 

  }

  const ChangeCEP = () => {

    if(CEPEdit === true)
        {setCEPEdit(false); setAlterar(true)}

    else if(Pcd){

        setCEPEdit(true); if(TelefoneEdit === true && NomeEdit === true && DefEdit === true && imgPreview === null 
            || imgPreview === 
        false){

            setAlterar(false)
            setNew({...NewInfos, NovoCEP: User.endereco})
     
        }}

    else if(!Pcd && CEPEdit === false){ 
    setCEPEdit(true); if(TelefoneEdit === true && NomeEdit === true && imgPreview === null || imgPreview === false){

        setAlterar(false)
        setNew({...NewInfos, NovoCEP: User.endereco})

    }} 

  }

  const ChangeDef = () => {

    if(DefEdit === true)
        {setDefEdit(false); setAlterar(true)}; 

    if(DefEdit === false){ 
    setDefEdit(true); if(TelefoneEdit === true && NomeEdit === true && CEPEdit === true  &&imgPreview === null  || imgPreview === false){

        setAlterar(false)

        if(NewInfos.NovaDetalhesDef === null){ 
        setNew({...NewInfos, NovaDetalhesDef: 'Não possui'})
      }else{

        
setNew({...NewInfos, NovaDetalhesDef: User.detalhes_deficiencia})

      }

    }} 

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
     User.foto_perfil, NovaDetalhesDef: User.detalhes_deficiencia})
    }else{
    
      setNew({NovoNome: User.nome, NovoTelefone: User.telefone, NovoCEP: User.endereco, NovaImagem: null, NovaDetalhesDef: User.detalhes_deficiencia})
    
    }
    

  }

  const Salvar = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append('NovoNome', NewInfos.NovoNome);
    formData.append('NovoCEP', NewInfos.NovoCEP);
    formData.append('NovaTelefone', NewInfos.NovoTelefone);
    formData.append('NovaDetalhesDef', NewInfos.NovaDetalhesDef)


    if(NewInfos.NovaImagem){

      formData.append('NovaImagem', NewInfos.NovaImagem);

    }


    try{ 
    const response = await fetch('http://localhost:3000/editar', {

      method: 'POST', 
      headers: {
                'Authorization': `Bearer ${token}`

               },
                
      body: formData

    })

     if(response.ok){
       const data = await response.json();
       setNew({...User, ...NewInfos} )
       setSucesso(true)
       
       setTimeout(() => {

       window.location.reload();
       
       }, 1000)
       
       
       

     }
}catch(err){

  console.error('DEU MERDA AI PATRÃO', err)

}

  }



  useEffect(() => {

    Renderizar();

  }, [])

  useEffect(() => {

    setNew({ NovoNome: User.nome, 
        NovaImagem: User.foto_perfil, 
        NovoCEP: User.endereco, 
        NovoCPF: User.cpf,
        NovaDetalhesDef: User.detalhes_deficiencia,
        NovoTelefone: User.telefone
         })

        
        if(User.possui_deficiencia){

            setChecked(true)
            setCheckedFalse(false)
            setPcd(true)

        }else{

            setCheckedFalse(true)
            setChecked(false)
            setPcd(false)

        }

        console.log(NewInfos)

  }, [User])

  return (
    <>
    <NavbarGerenciamentoP/>  
    <div className='Corpo-container'>


      <div className='divUm'>
        
      <img tabIndex={0} onClick={Logout} className='iconsair' alt='Sair da conta' src="./img/icon-LogOut.png" />
      <h1 className='sairGerenUser'>SAIR DA CONTA</h1>

        {  MostrarPrev ? <><> {NewInfos.NovaImagem ? <> <img className='iconUserGerenc' style={{marginLeft: '260px', borderRadius:'50%'}} src={NewInfos.NovaImagem} alt="" /> </> : <> <img className='iconUserGeren' src="./img/fotoUser.png" alt="User Icon" /></>}  </>  </> : 
        <> <img className='iconUserGerenc' src={imgPreview} style={{borderRadius: '50%', marginLeft: '260px'}} alt="" /> </>
          }


        <label tabIndex={0} aria-label='alterar foto de perfil' className='alterarfotoGeren'>
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
          alterar foto <img className='iconeFoto' src="./img/iconFoto.png" alt="Change Photo Icon" />
        </label>

        {Pcd && <> 
        <img className='verificado' src="./img/img logo.png" alt="" /></>}

        <div className='div-inptMae'>

          <div className='div-inpt1'>

            <label className='labelInpts'>Nome</label>
            <input className={NomeEdit ? "InptDisabledGerenciamento" : "inpts"} type="text" aria-disabled={NomeEdit} 
                      value= 
                     {NewInfos.NovoNome}  onChange={(e) => 
                 setNew({...NewInfos, NovoNome: e.target.value})}
                 aria-label='Nome de usuário'/>

              <img tabIndex={0} onClick={ChangeName} onKeyDown={(e) => {if(e.key === 'Enter')ChangeName}} className={Pcd ? 'LapisEditNomeDef' 
                :'LapisEditNome' } 
               src="./img/iconLapis.png" alt="Editar nome" />

            <label className='labelInpts'>Telefone</label>

             <InputMask
             mask="(99) 99999-9999"
             alwaysShowMask={false}
             className={TelefoneEdit ? "InptDisabledGerenciamento" : "inpts"} type="text" aria-disabled={TelefoneEdit} 
             onChange={(e) => setNew({...NewInfos, NovoTelefone: e.target.value})}
             value={NewInfos.NovoTelefone}
             aria-label='Telefone'
             ></InputMask>


            <img tabIndex={0} onClick={ChangeTele} onKeyDown={ (e)  => {if(e.key === 'Enter')ChangeTele}} className={Pcd ? 'LapisEditTeleDef' : 'LapisEditTele'} 
                    src="./img/iconLapis.png" alt="Editar Telefone" />

            
            <label className='labelInpts'>CEP</label>
            <InputMask
             mask='99999-999'
             className={CEPEdit ? "InptDisabledGerenciamento" : "inpts"} 
             type="text" aria-disabled={CEPEdit} 
             aria-label='CEP'
             value={NewInfos.NovoCEP}/> <br />

            <img tabIndex={0} onClick={ChangeCEP} onKeyDown={ (e) => {if(e.key === 'Enter')ChangeCEP}} className={Pcd ? 'LapisEditCEPDef' : 'LapisEditCEP'} 
                    src="./img/iconLapis.png" alt="Editar CEP" />


            
          </div>

          <div className='div-inpt2'>

          <label className='labelInpts'>E-mail</label>
          <input className='InptDisabledGerenciamento' type="text" aria-disabled value={User.email}
          aria-label='E-mail não editavel'/>

            <label className='labelInpts'>CPF</label>
            <input className='InptDisabledGerenciamento' type="text" aria-disabled value={User.cpf}
            aria-label='CPF não editavel' />

            <label className='labelInpts'>Senha</label>
            <input className='InptDisabledGerenciamento' aria-label='Senha não editavel' type="text" aria-disabled value={User.senha}/> <br />



            
          </div>

        </div>


         {SalvarAlteracoes &&  
        <><button onClick={Salvar} aria-label='Botão salvar alterações' role='alert' className='salvarGerenUser'>Salvar alterações</button> <button aria-label='Botão cancelar alterações' role='alert' onClick={Cancelar} className='cancelarGerenUser'>Cancelar</button></>}
        {alteraçõesSucesso && <><p role='alert'>Alterações bem sucedidas!</p></>}
        


      </div>


      <div className="divLinha"></div>


      <div className='divDois'>
        
        <h1 className='especificacoes'>Especificações</h1>

        <div className='div-excluir'>
        <h1 className='excluir'>EXCLUIR CONTA</h1>
        <img className='iconLixo' src="./img/iconLixo.png" alt="User Icon" />
        </div>



        <label tabIndex={0} className='possuiDeficiencia'>Possui alguma deficiência?</label> <img className='verificado2' src="./img/img logo.png" alt="" />
        <input type="checkbox" className='checkBox' aria-label='Sim' checked={isCheckedTrue} /> <label className='sim'>Sim</label>
        <input type="checkbox" className='checkBox' aria-label='Não' checked={isCheckedFalse}/> <label className='nao'>Não</label>


        <label className='deficiencia'>Deficiência:</label>
        <input className='inptsTela2' type="text" disabled value={Pcd ? User.deficiencia
          : ('Não possui')}/>


        <label className='detalhes'>Detalhes:</label>
        <input className={DefEdit ? 'inptsTela2Disabled' : 'inptsTela2'} onChange={(e) => setNew({...NewInfos, NovaDetalhesDef: e.target.value})} disabled={DefEdit} type="text" value={Pcd ? NewInfos.NovaDetalhesDef : 'Não possui'} 
        />

        { Pcd &&  
        <img tabIndex={0} onClick={ChangeDef} onKeyDown={(e) => {if(e.key === 'Enter')ChangeDef}} className={Pcd ? 'LapisEditDetalhesDef' : 'LapisEditDetalhes'} 
                    src="./img/iconLapis.png" alt="Editar detalhes de sua deficiência" />}
      </div>


    </div>
    </>
  );
}


export default Gerenciamento;