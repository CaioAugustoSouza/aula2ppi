import express from 'express'
import path from 'path'

const porta = 3000;
const host = '0.0.0.0';
const app = express();

//Declarar à aplicação express onde está a fonte dos arquivos estáticos.

// app.use (express.static(path.join(process.cws(),'publico')));
app.use(express.static('./publico'));
var listaProdutos = [];
app.use('/cadastrarProdutos', (req, resp) => {
    const nome = req.query.nome;
    const tipo = req.query.tipo;
    const descricao = req.query.descricao;
    const cidade = req.query.cidade;
    const estado = req.query.estado;
    const produtoNovo = req.query.produtoNovo === 'on';

    listaProdutos.push({
        nome: nome,
        tipo: tipo,
        descricao: descricao,
        cidade: cidade,
        estado: estado,
        produtoNovo: produtoNovo
    });
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write('</head>');
    resp.write(`<h1>Produto ${nome} cadastrado com sucesso!</h1>`);
    resp.write('<br>');
    resp.write('<body>');
    resp.write('<a href ="/cadastroProdutos.html"><p>Fazer novo cadastro!</p></a>');
    resp.write('<br>');
    resp.write('<a href ="/listarProdutos"><p>Listar Produtos Cadastrados!</p></a>');
    resp.write('<br>');
    resp.write('</body>');
    resp.write('</html>');
    resp.end();
});

app.use('/listarProdutos', (req, resp) => {
    resp.write('<!DOCTYPE html>');
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<meta charset="UTF-8">');
    resp.write (`<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">`)
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<div class="container mt-5">');
    resp.write(`<h1>Lista dos produtos.</h1>`);
    resp.write('<table class="table table-bordered table-dark">');
    resp.write('<thead>');
    resp.write('<tr>');
    resp.write('<th scope="col">Nome: </th>');
    resp.write('<th scope="col">Descrição: </th>');
    resp.write('<th scope="col">Tipo: </th>');
    resp.write('<th scope="col">Origem: </th>');
    resp.write('<th scope="col">Produto novo: </th>');
    resp.write('</tr>');
    resp.write('</thead>');
    for (let i = 0; i < listaProdutos.length; i++){  
        resp.write('<tbody>');    
        resp.write('<tr>');    
        resp.write(`<td>${listaProdutos[i].nome} </td>`);
        resp.write(`<td>${listaProdutos[i].descricao} </td>`);
        resp.write(`<td>${listaProdutos[i].tipo} </td>`);
        resp.write(`<td>${listaProdutos[i].cidade} - ${listaProdutos[i].estado}</td>`);
        if (listaProdutos[i].produtoNovo)
            resp.write(`<td>Sim</td>`);
        else
            resp.write(`<td>Não</td>`);
        resp.write('</tr>');
        resp.write('</tbody>');
    }
    resp.write('</table>');
    resp.write('<br>');
    resp.write('<hr>');
    resp.write('<a href ="/"><p>Voltar!</p></a>');
    resp.write('</div>');
    resp.write('</body>');
    
    resp.write(`<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
    crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
    crossorigin="anonymous"></script>`);
    resp.write('</html>');
    resp.end();
});



app.listen(porta, host, () => {
    console.log(`servidor executado na porta http://${host}:${porta}`);
})
