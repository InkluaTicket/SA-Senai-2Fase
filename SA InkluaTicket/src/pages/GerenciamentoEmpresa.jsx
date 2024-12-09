import React from 'react'
import '../styles/GerenciamentoEmpresa.css';
import NavbarGerenEmpre from '../components/NavbarGerenEmpre';

function GerenciamentoEmpresa() {
  return (

    <>

    <NavbarGerenEmpre/>

    <div className='container-GerenEmpre'>

      <div className='divUmEmpre'>
      <img className='iconsairEmpre' src="./img/icon-LogOut.png" />
      <h1 className='sairGerenEmpre'>SAIR DA CONTA</h1>

      <div className='div-excluirEmpre'>
        <h1 className='excluirEmpre'>EXCLUIR CONTA</h1>
        <img className='iconLixoEmpre' src="./img/iconLixo.png" alt="" />
        </div>

        <img className='iconEmpre' src="./img/fotoUser.png" alt="" />

        <label className='alterarfotoEmpre'>
          alterar foto <img className='iconeFotoEmpre' src="./img/iconFoto.png" alt="" />
        </label>

        <img className='verific-empresa' src="./img/verif-empresa.png" alt="" />

        <div className='div-inptMaeEmpre'>

          <div className='div-inpt1Empre'>
            <label className='labelInptsEmpre'>Nome empresa</label>
            <input className='inptsEmpre' type="text" />


            <label className='labelInptsEmpre'>E-mail</label>
            <input className='inptsEmpre' type="text" />


            <label className='labelInptsEmpre'>Senha</label>
            <input className='inptsEmpre' type="password" /> <br />
          </div>

          <div className='div-inpt2Empre'>
            <label className='labelInptsEmpre'>CNPJ</label>
            <input className='inptsEmpre' type="text" />


            <label className='labelInptsEmpre'>Telefone</label>
            <input className='inptsEmpre' type="text" />


            <label className='labelInptsEmpre'>Endereço</label>
            <input className='inptsEmpre' type="password" /> <br />
          </div>

        </div>

      </div>


      <div className="divLinhaEmpre"></div>


      <div className='divDoisEmpre'>
        
        <h1 className='eventosEmpre'>Eventos</h1>

        

      </div>

    </div>

    </>

)
}


export default GerenciamentoEmpresa