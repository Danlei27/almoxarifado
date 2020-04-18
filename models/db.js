//conexao ao banco de dados
const password = require('./senha')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('almoxarifado','postgres', password,{
    host:'localhost',
    dialect:'postgres'
});
sequelize.authenticate().then(function(){
    console.log('Servidor conectado com sucesso!')
}).catch(function(err){
    console.log('Falha ao se conectar:'+err)
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};