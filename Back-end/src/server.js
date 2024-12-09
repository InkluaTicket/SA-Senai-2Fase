const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')


require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY

const storage = multer.memoryStorage();
const upload = multer({limits: { fileSize: 100 * 1024 * 1024 }, storage});


const app = express();
const pool = new Pool({
    user: 'postgres', // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'InkluaTicket', // Nome da sua database
    password: 'postgre@33', // Substitua pela sua senha
    port: 5432, // Porta padrão do PostgreSQL
});



// Habilitar CORS para todas as rotas
app.use(cors({
    origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204 
}));
app.use(express.json());


//Adicionar um usuário ao banco de dados
app.post('/usuarios', async (req, res) => {

    const {Nome, Email, Senha, Endereco, Telefone, CPF, Deficiencia, PCD } = req.body;

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(Senha, salt);

    try{

        const result = await pool.query(

            'INSERT INTO usuarios (nome, email, senha, CPF, telefone, endereco, possui_deficiencia, deficiencia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [Nome, Email, HashedPassword, CPF, Telefone, Endereco , PCD, Deficiencia ] 

        );

      

        

        user = result.rows[0]
       
        const token = jwt.sign({

            id: user.id,
            email: user.email,
            papel: 'Usuário'

        },SECRET_KEY, {expiresIn: '1hr'});

        res.json({message: 'Logado!', token})

    } catch (err) {

      console.error(err.message);
      res.status(500).json( {error: 'Erro ao cadastrar usuário'});


    }
});

app.post('/criarempresa', async (req, res) => {

    const {Nome, CNPJ, Email, Senha, Telefone, Endereco} = req.body;

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(Senha, salt);

    try{

        const result = await pool.query(

            'INSERT INTO empresa (nome, cnpj, email, senha, telefone, endereco) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [Nome, CNPJ, Email, HashedPassword, Telefone, Endereco]
            
        );

        empresa = result.rows[0]
       
        const token = jwt.sign({

            id: empresa.id,
            email: empresa.email,
            papel: 'Empresa'

        },SECRET_KEY, {expiresIn: '1hr'});

        res.json({message: 'Logado!', token})


    }catch(err){

       console.error(err.message)
       return res.status(500).json({error: 'Erro ao cadastrar empresa!'})

    }


})

//Adicionar um evento ao banco de dados
app.post('/criacaoevento', upload.single('imagem'), async (req, res) => {

   const {Nome, Descricao, DataInicio, DataFim, Endereco, Categoria, LinkIngressos, empresa } = req.body;
   const imagemBuffer = req.file ? req.file.buffer : null;

   try{

   const result = await pool.query(
'INSERT INTO evento (nome, descricao, data_inicio, data_fim, local_evento, categoria, url, imagem, id_empresa) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                    [Nome, Descricao, DataInicio, DataFim, Endereco, Categoria, LinkIngressos, imagemBuffer, empresa]

   );

   res.status(201).json(result.rows[0]);


}  catch(err){

console.error('Erro ao criar evento!', err);
res.status(400).json({error: 'Erro ao criar evento!', details: err.message})

}
});

// Endpoint para adicionar acessibilidades
app.post('/acessibilidades', async (req, res) => {
    const { id_evento, DefFisica, DefVisual, DefIntelectual, DefAuditiva, DefMultipla, OutraDef, OutraDescricao } = req.body;

    try {
        await pool.query(
            'INSERT INTO acessibilidade (evento_id, deficiencia_fisica, deficiencia_visual, deficiencia_intelectual, deficiencia_auditiva, deficiencia_multiplas, outro) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id_evento, DefFisica, DefVisual, DefIntelectual, DefAuditiva, DefMultipla, OutraDescricao]
        );

        res.status(201).json({ message: 'Acessibilidades associadas com sucesso!' });
    } catch (err) {
        console.error('Erro ao adicionar acessibilidades!', err);
        res.status(400).json({ error: 'Erro ao adicionar acessibilidades!', details: err.message });
    }
});


//Selecionar eventos em análise
app.get('/eventosAnalise', async(req, res) => {

    try{

        const result = await pool.query('SELECT * FROM evento WHERE aceito IS NULL')

       const eventos = result.rows

       const eventosComImagem = eventos.map(evento => {
        if (evento.imagem) {
            const imgConvert = Buffer.from(evento.imagem).toString('base64');
            evento.imagem = `data:image/*;base64,${imgConvert}`;
        }

        if (evento.data_inicio) {
            const dateInicio = new Date(evento.data_inicio);
            evento.data_inicio = dateInicio.toISOString().split('T')[0]; // Removendo a parte de hora
        }
        if (evento.data_fim) {
            const dateFim = new Date(evento.data_fim);
            evento.data_fim = dateFim.toISOString().split('T')[0]; // Removendo a parte de hora
        }

        return evento;
    });

    


        res.status(200).json(eventosComImagem)

    }catch(err){

        console.error('Erro ao buscar eventos em análise!', err)
        res.status(400).json({error: 'Erro ao buscar eventos em análise!', details: err.message})
        
    }

});

app.get('/eventosAceitos', async (req,res) => {

       try{

        const result = await pool.query('SELECT * FROM eventos WHERE aceito IS true');
        res.status(200).json(result.rows)

       }catch(err){

        console.error('Erro ao buscar eventos aceitos!', err)
        res.status(400).json({error: 'Erro ao buscar eventos!', details: err.message})


       }

});

app.patch('/aceitar/:id/evento', async (req, res) => {

const { id } = req.params;
const { aceito } = req.body;

if(aceito != false && aceito != true){

    return res.status(400).json({error: 'O estado só pode ser aceito ou negado!'})

}

try{

const result = await pool.query('UPDATE eventos SET aceito  = $1 WHERE id = $2 RETURNING *', [aceito, id])

if (result.rows.length > 0) {
    return res.status(200).json(result.rows[0]); 
} else {
    return res.status(404).json({ error: 'Evento não encontrado!' });
}


}catch(err){

    console.error('Erro ao atualizar evento!', err)
    res.status(500).json({error: 'Erro ao atualizar evento!', details: err.message})
}

});

app.get('/detalhesEvento/:id', async (req,res)=> {

    const { id } = req.params;

    try{

        const result = await pool.query('SELECT * FROM eventos WHERE id = $1', [id]);
        res.status(200).json(result.rows[0]);

    }catch(err){

        console.error('O evento não foi encontrado!', err)
        res.status(400).json({error: 'Erro!', details: err.message})

    }

});





//Realizar login
app.post('/login', async(req, res) => {

    const {Email, Senha} = req.body;

    try{
        
        let result = await pool.query('SELECT * FROM moderador WHERE email = $1 ', [Email])
        let isAdm = false;
        let user = null

        if(result.rows.length > 0){

            isAdm = true

            user = result.rows[0];

        }else{

            result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [Email])

            if(result.rows.length === 0){
                return res.status(400).json({message: 'Usuário não encontrado!'})
            }

            user = result.rows[0]

        }

        const isPassword = await bcrypt.compare(Senha, user.senha);

        if(!isPassword){

            return res.status(401).json({message: 'Senha incorreta!'})

        }

        const token = jwt.sign({

            id: user.id,
            email: user.email,
            papel: isAdm ? 'Administrador' : 'Usuário'

        },SECRET_KEY, {expiresIn: '1hr'});

        res.json({message: 'Login bem sucedido!', token})

   } catch (err){

    console.error(err.message)
    res.status(500).json({message: 'Erro ao efetuar login!', error: err.message})

}


});

app.post('/loginEmpresa', async (req, res) => {

    const {CNPJ, Senha} = req.body;

    try{

        const result = await pool.query(

            'SELECT * FROM empresa WHERE cnpj = $1', [CNPJ]

        );

        if(result.rows.length === 0){

            return res.status(400).json({message: 'Empresa não encontrada!'})

        }

        const empresa = result.rows[0]

        const isPassword = await bcrypt.compare(Senha, empresa.senha )

        if(!isPassword){

            return res.status(401).json({message: 'Senha incorreta!'})

        }

        const token = jwt.sign({

         id: empresa.id,
         email: empresa.email,
         papel: 'Empresa'

        },SECRET_KEY, {expiresIn: '1hr'});

        res.json({message: 'Login bem sucedido!', token})


    }catch(err){

        console.error(err.message)
        return res.status(500).json({message: 'Erro ao efetuar login!', error: err.message})

    }

})



//Autenticar token
const AutenticaçãoDeToken = (req, res, next) => {

    const token = req.headers['authorization']?.split(' ')[1];
    

    if (!token) {

        return res.status(401).json({ message: 'Token ausente!' });

    }else{

        jwt.verify(token, SECRET_KEY, (err, user) => {

            if(err){
                return res.status(403).json({ message: 'Token inválido!' })
            }

            req.user = user

            next();

        })

    }
};

//Perfil de usuário
app.get('/perfil', AutenticaçãoDeToken, async (req, res) => {

    const userId = req.user.id

    try{
    const result = await pool.query(

        'SELECT * FROM usuarios WHERE id = $1', [userId]

    );

    if(result.rows.length === 0){

        return res.status(404).json({message: 'Usuário não encontardo!'})

    }

    const user = result.rows[0]

    if(user.foto_perfil){
        
        const imgConvert = Buffer.from(user.foto_perfil).toString('base64')
        user.foto_perfil = `data:image/*;base64,${imgConvert}`;


    }

    res.json(user);

} catch( err ){

console.error(err.message)
return res.status(401).json({message: 'Usuário ', error: err.message})

}

});

//Perfil de usuário
app.get('/perfilEmpresa', AutenticaçãoDeToken, async (req, res) => {

    const empresaId = req.user.id

    try{
    const result = await pool.query(

        'SELECT * FROM empresa WHERE id = $1', [empresaId]

    );

    if(result.rows.length === 0){

        return res.status(404).json({message: 'Empresa não encontarda!'})

    }

    const empresa = result.rows[0]

    if(empresa.imagem){
        
        const imgConvert = Buffer.from(empresa.imagem).toString('base64')
        empresa.imagem = `data:image/*;base64,${imgConvert}`;


    }

    res.json(empresa);

} catch( err ){

console.error(err.message)
return res.status(401).json({message: 'Usuário ', error: err.message})

}

});

app.post('/editarEmpresa', AutenticaçãoDeToken, upload.single('NovaImagem'), async (req, res) => {

    const empresa = req.user.id;
  
    const {NovoTelefone, NovoCEP} = req.body;
    const imagemBuffer = req.file ? req.file.buffer : null;
     
   
    
  
    const fields = []
    const values = []
  
    
    
    if(NovoTelefone){
  
      fields.push('telefone = $' + (fields.length+1));
      values.push(NovoTelefone);
  
    }
  
    if(NovoCEP){
  
      fields.push('endereco = $' + (fields.length+1));
      values.push(NovoCEP);
  
    }

  
    if(imagemBuffer){
  
      fields.push('imagem = $' + (fields.length+1));
      values.push(imagemBuffer);
  
    }
  
    if(fields.length===0){
  
      return res.status(400).json({error: 'Não há campos para atualizar!'})
  
    }
  
    let query =  `UPDATE empresa SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
    values.push(empresa);
  
    try{ 
  
    const result = await pool.query(query, values)
    
    return res.status(200).json({message: 'Empresa atualizada com sucesso!'})
  
  } catch (err){
  
      console.error('Erro ao atualizar empresa!', err)
      return res.status(500).json({error: 'Erro ao atualizar empresa!'})
  
  }
      
  
  });


//Atualizar usuario
app.post('/editar', AutenticaçãoDeToken, upload.single('NovaImagem'), async (req, res) => {

  const userId = req.user.id;

  const {NovoNome, NovoTelefone, NovoCEP, NovaDetalhesDef} = req.body;
  const imagemBuffer = req.file ? req.file.buffer : null;
   
 
  

  const fields = []
  const values = []

  if(NovoNome){

    fields.push('nome = $' + (fields.length+1));
    values.push(NovoNome);

  }
  
  if(NovoTelefone){

    fields.push('telefone = $' + (fields.length+1));
    values.push(NovoTelefone);

  }

  if(NovoCEP){

    fields.push('endereco = $' + (fields.length+1));
    values.push(NovoCEP);

  }

  if(NovaDetalhesDef){

    fields.push('detalhes_deficiencia = $' + (fields.length+1));
    values.push(NovaDetalhesDef);

  }

  if(imagemBuffer){

    fields.push('foto_perfil = $' + (fields.length+1));
    values.push(imagemBuffer);

  }

  if(fields.length===0){

    return res.status(400).json({error: 'Não há campos para atualizar!'})

  }

  let query =  `UPDATE usuarios SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;
  values.push(userId);

  try{ 

  const result = await pool.query(query, values)
  
  return res.status(200).json({message: 'Usuário atualizado com sucesso!'})

} catch (err){

    console.error('Erro ao atualizar usuário!', err)
    return res.status(500).json({error: 'Erro ao atualizar usuário!'})

}
    

});

app.post('/comentarios', async (req, res) => {

    const {Comentario, User_id, Evento_id} = req.body;

    try{ 

    const result = await pool.query(
        
    'INSERT INTO comentarios (comentario, evento_id, usuario_id ) VALUES ($1, $2, $3)', 
    [Comentario, Evento_id, User_id ]
);
    
    res.status(200).json(result.rows[0])
    
       }catch(err){

        console.error('Erro ao postar comentario!', err)
        res.status(500).json({error: 'Erro ao postar comentario!'})

       }
});

app.get('/buscarComentarios/:id', async (req, res) => {

    const {id} = req.params;

try{

    
    const result = await pool.query('SELECT * FROM comentarios WHERE evento_id = $1', [id]);4

    if(result.rows.length > 0){

     return res.json(result.rows)

    }else{

        return res.json([])

    }
    
}catch(err){


}

});

app.get('/buscarUsuarioComentarios/:userId', async (req, res) => {

    const {userId} = req.params;
   

    try{

        const result = await pool.query('SELECT nome FROM usuarios WHERE id = $1 ', [userId])

        if(result.rows.length > 0){

           return res.json(result.rows[0])

        }else{

            return res.status(404).json({ message: 'Usuário não encontrado' });

        }

    }catch(err){

    console.error('Erro ao buscar usuário:', err);
    res.status(500).json({ message: 'Erro no servidor' });

    }

})




app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

