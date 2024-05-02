import express from 'express'

const porta = 3000;
const host = '0.0.0.0'; //todas as interfaces (placas de rede) do pc hospedeiro
const app = express ();

//Declarar à aplicação express onde está a fonte dos arquivos estáticos.

app.use (express.static('./publico'));
var listaUsuarios =[];
app.use ('/cadastrarUsuario', (req,resp)=>{
    const nome = req.query.nome;
    const sobrenome = req.query.sobrenome;
    const endereco = req.query.endereco;
    const cep = req.query.cep;
    const usuario = req.query.usuario;
    const estado = req.query.estado;

    listaUsuarios.push({
        nome: nome,
        sobrenome: sobrenome,
        usuario: usuario
    });
    resp.write ('<h1>Cadastro realizado</h1>');
    resp.write ('<a href="/cadastroUsuario.html">cadastrar novamente</a>');
    resp.write ('<a href="/">voltar</a>');
    resp.end ();
});

app.use ('/listarUsuarios', (req, resp)=>{
    for (let i = 0 ; i<listaUsuarios.length; i++)
        resp.write (listaUsuarios[i].nome+'<br>');
});



app.listen (porta, host, ()=>{
    console.log ('servidor executado na porta http://host/porta');
})
