import React from "react";
import Navbar from "../components/Navbar.jsx";
import Rodape from "../components/Rodape.jsx";
import "../styles/Shows.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect  } from "react";
import jwt_decode from 'jwt-decode'


function EventoDinâmico() {
    const [rating, setRating] = useState(0); // Estado para a avaliação selecionada
  const [hover, setHover] = useState(0); // Estado para a avaliação ao passar o mouse
  
  // renderização dos comentarios
  const [comments, setComments] = useState([]);
  
  const [newComment, setNewComment] = useState("");
  const [defFisica, setDefFisica] = useState(false);
const [defVisual, setDefVisual] = useState(false);
const [defAuditiva, setDefAuditiva] = useState(false);
const [defMultiplas, setDefMultiplas] = useState(false);
const [defIntelectual, setDefIntelectual] = useState(false);
const [outro, setOutro] = useState('');
const [isUser, setUser] = useState(false)

  const {id} = useParams();
    const [evento, setEvento] = useState({ Nome: '', Descricao: '', DataInicio: '', DataFim:'', Imagem: null, Local: '', empresa: null, categoria: '', Ingressos: '', Aceito: null})
    const [Comentarios, setComentarios] = useState([])
    const [idUser, setIdUser] = useState(null)
    const [comentario, setComentario] = useState({Comentario: '', Avaliação: 0, User_id: null, Evento_id: id})
    const [eventNull, setNull] = useState(false)
    const [isAdm, setAdm] = useState(false)
    const [onSubmit, setSubmit] = useState(false)
    const navigator = useNavigate();
    const token = localStorage.getItem('token') || localStorage.getItem('tokenAdm') || localStorage.getItem('tokenEmpresa');
    

    //Buscar evento
    const Eventos = async () => {

        try{

            const response = await fetch(`http://localhost:3000/detalhesEvento/${id}`);

            if(response.ok) {

                const data = await response.json();
                setEvento({Nome: data.nome, Descricao: data.descricao, DataInicio: data.data_inicio, DataFim: data.data_fim, Local: data.local_evento, Imagem: data.imagem, empresa: data.id_empresa, categoria: data.categoria, Ingressos: data.url, Aceito: data.aceito})
                setNull(data.aceito)

            
                
                

            }

        }catch(err){

            console.error('Erro na rede!', err)

        }

    }

  // Função para lidar com o envio do comentário
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        { text: newComment, stars: rating },
      ]);
      setNewComment("");
      setRating(0); // Resetar avaliação após envio
    }
  };

  const PostarComentário = async (e) => {

    e.preventDefault();
    

    if(!token){

      console.log('Login necessário para comentar!')
      
    }

      const decode = jwt_decode(token)

      const comentarioAtualizado = {

        Comentario: comentario.Comentario,
        User_id: decode.id,
        Evento_id: comentario.Evento_id,
        Avaliação: comentario.Avaliação

      }

      setComentario((prev) => ({ ...prev, User_id: decode.id}))

    const response = await fetch('http://localhost:3000/comentarios', {

      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(comentarioAtualizado)

    });

    if(response.ok){

      console.log('comentario postado!')
      window.location.reload();

    }else{

      console.log('comentario negado')

    }

  };

  //Buscar os comentários do evento acessado
  const BuscarComentarios = async () => {

   

    try{  
    const response = await fetch(`http://localhost:3000/buscarComentarios/${id}`, {

     method: 'GET',
     headers: {'Content-Type' : 'application/json'},

    })

    

    const data = await response.json();

    if(!data){
      
      console.log('Erro ao buscar comentários!')

    }


    console.log('array')

    if(Array.isArray(data)) {

    

      const comentariosComNomes = await Promise.all(data.map(async (comentario) => {

        

        const userResponse = await fetch(`http://localhost:3000/buscarUsuarioComentarios/${comentario.id_usuario}`)
        const userData = await userResponse.json();
        

        return {... comentario, NomeUsuario: userData.nome, ImagemUser: userData.foto_perfil}


      }))

      
      setComentarios(comentariosComNomes)
      console.log(comentariosComNomes)
    }

   
    console.log(Comentarios)

}catch(err){

  console.error('Erro ao buscar comentarios.', err)

}

  }

  const buscarAcessibilidades = async () => {
    try {
      const response = await fetch(`http://localhost:3000/acessibilidades/${id}`);
      if (response.ok) {
        const data = await response.json();
        
        if (data.length > 0) {
          const acessibilidade = data[0];
          
          // Atualize os estados individualmente com base na resposta
          setDefFisica(acessibilidade.deficiencia_fisica || false);
          setDefVisual(acessibilidade.deficiencia_visual || false);
          setDefAuditiva(acessibilidade.deficiencia_auditiva || false);
          setDefMultiplas(acessibilidade.deficiencia_multiplas || false);
          setDefIntelectual(acessibilidade.deficiencia_intelectual || false);
          setOutro(acessibilidade.outro || '');
        } else {
          console.log('Nenhuma acessibilidade encontrada.');
        }
      } else {
        console.log('Erro na resposta da API');
      }
    } catch (err) {
      console.error('Erro ao buscar acessibilidades:', err);
    }
  };

  const AceitarOuNegar = async (aceito) => {

      
    setEvento((prevEvento) => ({...prevEvento, Aceito: aceito}))
    
    try{

     const response = await fetch(`http://localhost:3000/aceitar/${id}/evento`,{

      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({aceito})

     });

     

    

     if(response.ok){

      
      
        navigator('/PainelModerador');

     }else{

        console.error('Erro ao atualizar evento')

     }


    }catch(err){

      console.error('erro na rede!', err);
      

    }

}
  

// UseEffect para buscar e logar as acessibilidades


  
  useEffect(() => {

    if(token){

    const decode = jwt_decode(token)

    if(decode.papel === 'Administrador'){

      setAdm(true)

    }else if(decode.papel === 'Usuário'){

        setUser(true)

    }

}

    Eventos();
    BuscarComentarios();
    buscarAcessibilidades();
   
  }, [id])

  return (
    <div>
      
      <div className="img-container">
        <img src={evento.Imagem} className="img-frente" />
      </div>

      <div>
        <img
          src={evento.Imagem}
          className="img-fundo"
          alt="Imagem do evento"
        />
      </div>

      <section>
        <h1 aria-label="Nome do evento" tabIndex={0} className="title-show">
          {evento.Nome}
        </h1>

        <p aria-label="Local do evento" tabIndex={0} className="p-show">
          evento precencial em -
          <Link
            target="_blank"
            rel="noopener noreferrer"
            
            className="link-show"
          >
            {evento.Local}
          </Link>
        </p>

        <section>
          <div className="card-show">
            <div className="card-desc">
              <h1 className="titulo">Descrição do evento</h1>
              <p aria-label="Descrição do evento" tabIndex={0}>
               {evento.Descricao}
              </p>

              
              

              <div className="column">
  {[
    { label: "Deficiência auditiva", id: "DefAuditiva", value: defAuditiva },
    { label: "Deficiência múltipla", id: "DefMultipla", value: defMultiplas },
  ].map(({ label, id, value }, index) => (
    <article key={index + 3}>
      <input
        type="checkbox"
        className="checagem"
        id={id}
        checked={value}  // Usando o valor do estado diretamente
        readOnly  // Não permite alteração
      />
      <label className="info-label" htmlFor={id}>
        {label}
      </label>
    </article>
  ))}
</div>

<div className="column">
  {[
    { label: "Deficiência física", id: "DefFisica", value: defFisica },
    { label: "Deficiência visual", id: "DefVisual", value: defVisual },
    { label: "Deficiência intelectual", id: "DefIntelectual", value: defIntelectual },
  ].map(({ label, id, value }, index) => (
    <article key={index}>
      <input
        type="checkbox"
        className="checagem"
        id={id}
        checked={value}  // Usando o valor do estado diretamente
        readOnly  // Não permite alteração
      />
      <label className="info-label" htmlFor={id}>
        {label}
      </label>
    </article>
  ))}
</div>



              <div>
                <label aria-label="" tabIndex={0}>
                    {outro && <> outras acessibilidades que terão nesse evento: {outro} </> }
                  
                </label>
              </div>

            </div>
          </div>

          <div aria-label="" tabIndex={0} className="card-show2">
            <h1 className="titulo">Datas do evento</h1>
            <div className="itens-data">
              <p>{evento.DataInicio}</p>

              <p>à</p>

              <p>{evento.DataFim}</p>

              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={evento.Ingressos}
                className="compra"
              >
                Compar Ingressos
              </Link>
            </div>
          </div>

          
        </section>


        
        <section className="comentarios">

        
          <div style={{ width: "50%", margin: "0 auto", textAlign: "center" }}>
           {isUser &&  <>
            <h2>Deixe seu comentário</h2>
            
            <form onSubmit={PostarComentário}>
            <textarea tabIndex={0}
              value={comentario.Comentario}
              onChange={(e) => setComentario({... comentario, Comentario: e.target.value})}
              placeholder="Escreva seu comentário aqui..."
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                fontSize: "20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            ></textarea>

            <input
               type="submit"
              style={{
                backgroundColor: "#024959",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                fontSize: "20px",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              
            </input>
            </form> </>}

        
            {Comentarios.length > 0 ? (
  <>
    {Comentarios.map((ComentarioPostado) => (
      <div style={{ textAlign: 'start' }} key={`${ComentarioPostado.id_evento}-${ComentarioPostado.id_usuario}-${ComentarioPostado.id}`}>
        <ul style={{ listStyleType: "none", padding: "0px" }}>
          <li
            style={{
              background: "#fff",
              width: '100%',
              marginBottom: "30px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                borderRadius: "5px 5px 0 0",
                padding: "10px",
                backgroundColor: "#024959",
              }}
            >
              <strong style={{ color: "#fff", fontSize: "18px" }}>
                {ComentarioPostado.NomeUsuario}
                {ComentarioPostado.ImagemUser}
              </strong>
              <div style={{ marginLeft: "10px" }}>
                {[...Array(5)].map((_, starIndex) => (
                  <span
                    key={starIndex}
                    style={{
                      color:
                        starIndex < ComentarioPostado.Avaliação
                          ? "#ffc107"  // Estrela preenchida
                          : "#ccc",    // Estrela vazia
                      fontSize: "25px",
                    }}
                    aria-label={`Avaliação de ${starIndex + 1} estrela${starIndex + 1 > 1 ? "s" : ""}`}
                  >
                    &#9733; {/* Símbolo da estrela */}
                  </span>
                ))}
              </div>
            </div>

            <p>{ComentarioPostado.comentario}</p>
          </li>
        </ul>
      </div>
    ))}
  </>
) : (
  <h3>Sem comentários!</h3>
)}


          </div>
        </section>
      </section>

      { eventNull === null && isAdm ? (
<>
<div  style={{display: 'flex', justifyContent: 'center', }}> 
<button className="Aceitar" onClick={() => AceitarOuNegar (true) }>Aceitar evento</button>
<button className="Negar" onClick={() => AceitarOuNegar (false)}>Negar evento</button>
</div>

</>) : null }

      <div>
        <Rodape />
      </div>
    </div>
  );
}

export default EventoDinâmico
