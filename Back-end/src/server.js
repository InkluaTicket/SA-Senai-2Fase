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

    const {Nome, cnpj, Email, Senha} = req.body;

    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(Senha, salt);

    try{

        const result = await pool.query(

            'INSERT INTO empresa (nome, cnpj, email, senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [Nome, cnpj, Email, HashedPassword]
            
        );

        res.status(201).json(result.rows[0]);


    }catch(err){

       console.error(err.message)
       return res.status(500).json({error: 'Erro ao cadastrar empresa!'})

    }


})

//Adicionar um evento ao banco de dados
app.post('/criacaoevento', upload.none(), async (req, res) => {

   const {Nome, Descricao, Data, empresa} = req.body;

   try{

   const result = await pool.query(

        'INSERT INTO eventos (nome, descricao, data_evento, empresa_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [Nome, Descricao, Data, empresa]

   );

   res.status(201).json(result.rows[0]);


}  catch(err){

console.error('Erro ao criar evento!', err);
res.status(400).json({error: 'Erro ao criar evento!', details: err.message})

}
});

//Selecionar eventos em análise
app.get('/eventosAnalise', async(req, res) => {

    try{

        const result = await pool.query('SELECT * FROM eventos WHERE aceito IS NULL')
        res.status(200).json(result.rows)

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

    const {cnpj, Senha} = req.body;

    try{

        const result = await pool.query(

            'SELECT * FROM empresa WHERE cnpj = $1', [cnpj]

        );

        if(result.rows.length === 0){

            return res.status(400).json({message: 'Usuário não encontrado!'})

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

    console.log(token)

    

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

    if(user.imagem){
        
        const imgConvert = Buffer.from(user.imagem).toString('base64')
        user.imagem = `data:image/*;base64,${imgConvert}`;


    }

    res.json(user);

} catch( err ){

console.error(err.message)
return res.status(401).json({message: 'Usuário ', error: err.message})

}

});

//Atualizar usuario
app.post('/editar', AutenticaçãoDeToken, upload.single('NovaImagem'), async (req, res) => {

  const userId = req.user.id;

  const {NovoNome, NovoEmail, NovaSenha} = req.body;
  const imagemBuffer = req.file ? req.file.buffer : null;
   
 
  

  const fields = []
  const values = []

  if(NovoNome){

    fields.push('nome = $' + (fields.length+1));
    values.push(NovoNome);

  }
  
  if(NovoEmail){

    fields.push('email = $' + (fields.length+1));
    values.push(NovoEmail);

  }

  if(NovaSenha){

    fields.push('senha = $' + (fields.length+1));
    values.push(NovaSenha);

  }

  if(imagemBuffer){

    fields.push('imagem = $' + (fields.length+1));
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

