import React, { useState } from 'react';
import '../styles/TelaCadastro.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import InputMask from 'react-input-mask';

function TelaCadastro() {

  const [Form, setForm] = useState({Nome: '', Email: '', Senha: '', Endereco: '', Telefone: '', 
    CPF: '', Deficiencia: 'Não especificado', PCD: false})


    const [mostrarOp, setOp] = useState(false)
    const [disable, setDisable] = useState(true)
    

    const opcoes = [

      'Deficiência visual',
      'Deficiência física',
      'Deficiência cognitiva',
      'Deficiência auditiva',
      'Não especificado'

    ]

  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  

  function alternarVerSenha() {
    setVerSenha((prevState) => !prevState);
  }

  function alternarConfirmarVerSenha () {
    setVerConfirmarSenha((prevState) => !prevState);
  }

  const handleFocus = () => {
    
    setOp(true); 

  };

  const handleBlur = () => {

    setTimeout(() => {

      setOp(false); 
 
     }, 150)
 

  }

  const handleOpClick = (op) => {

    setForm({...Form, Deficiencia: op})
    setOp(false)

  }

  const handleChange = (e) =>{

    setForm({...Form, Deficiencia: e.target.value})

  }

  const Check = () => {

    let checado = document.getElementById('PCD')

    if(checado.checked){

      setDisable(false)
      setForm({...Form, PCD: true})
      
      
    }else{

      setDisable(true)
      setForm({...Form, Deficiencia: 'Não especificado', PCD: false})
      

      

    }

  }

  useEffect(() => {
    console.log(Form.PCD);
    console.log(Form.Deficiencia) // Sempre que `Form.PCD` mudar, o valor será exibido no console
  }, [Check]);


  return (
    <div>
      <div className='tudoCadastro'>
        <div className="parteAzul">

          <Link className="btVoltarIMG" to='/'><img src="./img/seta .png"  alt="Voltar" /></Link>

          <img className='imagemscadastrar' src="./img/IMG.png" alt="Imagem Cadastro" />
          <img className='imagemscadastrar2' src="./img/image.png" alt="Imagem Cadastro" />
        </div>
        <div className="parteBranca">
          <div className="cadastrar">
            <h1 className='Cadastre-se'>Cadastre-se</h1>
            <h3>Digite seus dados abaixo</h3>
          </div>
          <div className="tudoInputsCheckBT">
            <div className="partesInputsUmDois">
              <div className="parteUmInpus">
                <div className="inputsLocal">
                  <label>Nome de usuário

                    <input type="text" className='tamanhoInputs' 
                    placeholder='Digite seu nome de Usuário' onChange={(e) => setForm({...Form, Nome: e.target.value})} />

                  </label>
                </div>
                <div className="inputsLocal">
                  <label>Email

                   <input type="email" className='tamanhoInputs' placeholder='Digite seu E-mail' 
                    onChange={(e) => setForm({...Form, Email: e.target.value})} />

                  

                  </label>
                </div>
                <div className="inputsLocal">
                  <label>CPF
                    <InputMask
                  mask="999.999.999-99"
                  alwaysShowMask={false}
                  className="tamanhoInputs"
                  placeholder="Digite seu CPF"
                  onChange={(e) => setForm({ ...Form, CPF: e.target.value })}
                   >
                  </InputMask>
                  </label>
                </div>
                <div className="inputsLocal">
                  <label>Telefone
                  <InputMask
                  mask="(99) 99999-9999"
                  alwaysShowMask={false}
                  className="tamanhoInputs"
                  placeholder="Digite seu telefone"
                  onChange={(e) => setForm({ ...Form, CPF: e.target.value })}
                   >
                  </InputMask>
                  </label>
                </div>
              </div>
              <div className="parteDoisInpus">
                <div className="inputsLocal">
                  <label>Endereço
                    <input type="text" className='tamanhoInputs' placeholder='Digite seu Endereço' 
                    onChange={(e) => setForm({...Form, Endereco: e.target.value})} />
                  </label>
                </div>
                <div className="inputsLocal">
                  <label>Senha
                    <input
                      type={verSenha ? "text" : "password"}
                      className='tamanhoInputs'
                      placeholder='Digite sua senha'
                      onChange={(e) => setForm({...Form, Senha: e.target.value})}
                    />
                    <button className='btSenha' onClick={alternarVerSenha}>
                      {verSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                    </button>
                  </label>
                </div>
                <div className="inputsLocal">
                  <label>Confirme sua senha
                    <input
                      type={verConfirmarSenha ? "text" : "password"}
                      className='tamanhoInputs'
                      placeholder='Digite sua senha novamente'
                    />
                    <button className='btSenha' onClick={alternarConfirmarVerSenha}>
                      {verConfirmarSenha ? <><img className='olhoSenha' src="../img/unnamed.png" alt="" /></> : <><img className='olhoSenha' src="../img/unnamed (1).png" alt="" /></>}
                    </button>
                  </label>
                </div>
                <div className="inputsLocal">
                  <label>Tipo de deficiência <img src="./img/img logo.png" className="imgTipo" alt="Logo Tipo" />
                    <input type="text"
                    id='InptDeficiencias'
                    className={disable ? "InptDisabled" :"tamanhoInputs" }
                    placeholder="Não especificado"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disable}
                    onChange={handleChange}
                    value={Form.Deficiencia}
                    />
                   
                   {mostrarOp && (
  <ul>
    {opcoes.map((op, index) => (
      <li
        key={index}
        onMouseDown={() => handleOpClick(op)} // Corrigido para a forma correta
      >
        {op}
      </li>
    ))}
  </ul>
)}

                  </label>
                </div>
              </div>
            </div>

            <div className="checkboxPCD">
              <label className='labelCheckbox'>
                <input id='PCD' type="checkbox" className='inputsCheckbox' onChange={Check} />Você é Pessoa PCD
                <img src="./img/img logo.png" className="imgPCD" alt="Logo PCD" />
              </label>
              <label className='labelCheckbox'>
                <input type="checkbox" className='inputsCheckbox' />Eu li e aceito os termos de uso
              </label>
            </div>
              <label className='labelCheckbox1'>
                Já possui uma conta? <a href="#">Fazer login</a>
              </label>
            <div className="btLocal">
              <button className='btCadastrar'>Cadastrar</button><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaCadastro;
