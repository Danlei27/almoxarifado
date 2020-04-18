const express = require('express');
const app = express();
const Produto = require('./models/Produto');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
//config Template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//config bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//Rotas
app.post('/criar',function(req, res){
 if(req.body.produto.length > 0 ){// Uma condicão para adicionar o produto da tabela, caracteres > 0   
    Produto.create({
        nome: req.body.produto,//Adicionando ao banco de dados
        quantidades: req.body.quant //os campos que vem pela requisicao "req" 
    }).then(function(){
        res.redirect('/')
    }).catch(function(err){
        res.send("Houve um erro!" + err)
    })
 }else{
    res.redirect('/')
 }
}) 

app.post('/editar/:id',function(req,res){// fazendo update no banco de dados
    Produto.update({                     // atraves do metrodo post, com os campos criados
        nome: req.body.nomeed,           // na rota edit
        quantidades: req.body.proded},{
      where:{
      id : req.params.id
      }
    }).then(function(){
        res.redirect('/')
    }).catch(function(){
        res.send("Náo foi possivel editar o produto!")
    })
})
app.get('/',function(req, res){//lista de produtos 
    Produto.findAll({order:[['id','DESC']]}).then(function(produtos){//funcão que vai fazer busca na tabela, do banco
        res.render('tab',{produtos:produtos})//retorna no seu paramentro todos os campo da mesma
    })                                       //depois passo parametros a uma var                       
})                                           //em que vou renderizar na pag tab, {order:[['id', 'DESC']]} Vai buscar do mais novo, por mais antigo
app.get('/add',function(req, res){//Adicionar produtos
      res.render('cad')
})
app.get('/deletar/:id',function(req,res){//quando for solicitado uma req na rota, essa funcão faz uma busca com id passado
    Produto.destroy({where:{id : req.params.id}//recebendo o id, where busca por ele, ele estando no banco é  
    }).then(function(){                        //deletado
        res.redirect('/')
    }).catch(function(err){
        res.send("Este produto não existe!" + err)
    })
})
app.get('/edit/:id',function(req,res){//editando produto
    Produto.findAll({where:{id : req.params.id}
    }).then(function(produt){
        res.render('edit',{produt:produt})
    })
})

app.listen(8081,function(){
    console.log("Servidor rodando na porta 8081")
})

                                                    
