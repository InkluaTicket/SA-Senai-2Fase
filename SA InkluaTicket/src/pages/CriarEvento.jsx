import React from "react";
import "../styles/CriarEvento.css";
import jwt_decode from 'jwt-decode'
import Navbar from "../components/Navbar";
import { useState } from "react";

function CriarEvento() {
  
  const [showInput, setShowInput] = useState(false); // Estado para controlar a exibição do input
  const [imgPreview, setPrev] = useState(null)
  
  const token = localStorage.getItem('tokenEmpresa')
    let empresaId = null;
    const decode = jwt_decode(token)
    empresaId = decode.id
    const [FormEvento, setFormE] = useState({ Nome: '', Descricao: '', DataInicio: '', DataFim: '', Endereco: '', 
     Descricao: '', Categoria: '', LinkIngressos: '', empresa: empresaId})

  const handleButtonClick = () => {
    setShowInput(true); 
  };

  
  const UploadImagemEvento = (e) => {

  

   document.getElementById('upload').click();

  }

  const OutraAcessibilidade = (item) => {

    if(item === 'Outro?'){

      setShowInput((prev) => !prev);

    }else{

      console.log('Deu b.o')

    }

  }

  const handleSubmit =  async (e) => {

    e.preventDefault();
    
    const formData = new FormData();


    formData.append('Nome', FormEvento.Nome)
    formData.append('Descricao', FormEvento.Descricao)
    formData.append('Data', FormEvento.Data)
    formData.append('empresa', FormEvento.empresa)

const response = await fetch('http://localhost:3000/criacaoevento', {


   method: 'POST',
   body: formData
   
});

if(response.ok){

    navigate('/')

}else{

  console.log('Evento não criado!')

}

}



  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>

        {imgPreview === null ? <>  <section className="corpo-pagina" onClick={ () => {if(imgPreview == null) UploadImagemEvento();}}>
          <div id="container">
            <h1 className="titles">Adicione uma foto ao seu evento:</h1>
            <div className="butao">
              <div className="colocar-foto">
                <img
                  src="./img/colocar-foto.png"
                  alt="Adicionar foto"
                  className="img-foto"
                />

                 <input id="upload" type="file" style={{display: 'none'}}
                 
                 onChange={(e) => { 

                  const file = e.target.files[0];
                 
                  setPrev(URL.createObjectURL(file));
                  console.log('Imagem adicionada!')
                  

                    }
                  } 

                 />

                <article className="comnt">Arraste ou coloque uma foto</article>
                <article className="comnt2">
                  (A dimensão recomendada é de 1600 x 838)
                </article>
              </div>
            </div>
          </div>
        </section></> : <>
       <div id="container">

       <h1 className="titles">Foto do seu evento:</h1>

        <div className="butao"> <img className="ImgPrev" src={imgPreview} alt="" /> </div>

        <button className="salvar" onClick={(e) =>{e.preventDefault(); 
          setPrev(null); console.log('Imagem removida')} }>Remover imagem</button>

        </div>

        </>}
        

        <section className="comentarios">
          <form action="">
            <h2 className="titles">Dê um nome para seu evento</h2>
            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Nome do evento"
            />

            <h2 className="titles">Data de início do evento</h2>
            <input
              type="date"
              className="comentario"
              min="2024-11-19"
              max="2024-12-31"
              aria-label="Data de início do evento"
            />

            <h2 className="titles">Data de término do evento</h2>
            <input
              type="date"
              className="comentario"
              min="2024-11-19"
              max="2024-12-31"
              aria-label="Data de término do evento"
            />

            <h2 className="titles">Insira o endereço do seu evento</h2>
            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Endereço do evento"
            />

            <h2 className="titles">
              Coloque uma breve descrição sobre seu evento
            </h2>
            <textarea
              id="comentario"
              placeholder="Máx. 315 caracteres"
              maxLength={315}
              aria-label="Descrição do evento"
            ></textarea>

            <h2 className="titles">
              Coloque os tipos de acessibilidade que seu evento fornece
            </h2>

            <section id="checkbox" aria-label="Tipos de acessibilidade">
            
              <div className="column">
                {[
                  "Deficiencia física","Deficiencia visual","Deficiencia intelectual"
                ].map((item, index) => (

                  <article key={index}>
                    <input
                      type="checkbox"
                      className="checagem"
                      id={`checkbox-${index}`}
                    />
                    <label className="info-label" htmlFor={`checkbox-${index}`}>
                      {item}
                    </label>
                  </article>
                  
                ))}
              </div>

              <div className="column">
                {["Deficiencia auditiva", "Deficiencia multipla", "Outro?"].map(

                  (item, index) => (
                    <article key={index + 3}>
                      <input
                        type="checkbox"
                        className="checagem"
                        id={`checkbox-${index + 3}`}
                        onChange={ () => OutraAcessibilidade(item)}
                      />
                      <label
                        className="info-label"
                        htmlFor={`checkbox-${index + 3}`}
                      >
                        {item}
                      </label>
                    </article>
                  
                ))}
              </div>
            </section>
            <h2 className="titles">
              {showInput && <h2 className="titles">Descreva!</h2>}
            </h2>

            {showInput && (
              <textarea
                type="text"
                id="comentario"
                placeholder="Max 315 caracteres"
                maxLength={315}
              ></textarea>
            )}

            <h2 className="titles">Escolha a categoria do seu evento </h2>

            <select aria-label="Categoria do evento"
              name="plataforma"
              required="required"
              className="comentario"
              id="custom-select"
              defaultValue="Shows"
            >
              {/* Shows, Festivais, Tecnologia, Esportes, Educação, Saúde */}
              <option value="Shows">Show</option>
              <option value="Festivais">Festivais</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="Esportes">Esportes</option>
              <option value="Educação">Educação</option>
              <option value="Saude">Saúde</option>
            </select>

            <h2 className="titles">Coloque o link do seu evento</h2>

            <input
              type="text"
              className="comentario"
              placeholder="Obrigatório"
              aria-label="Link para a compra de ingressos do evento"
            />

            <button className="salvar" onClick={handleSubmit}>Salvar Alterações</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default CriarEvento;
