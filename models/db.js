//conexao ao banco de dados
const password = require('./senha')
const Sequelize = require('sequelize');
let sequelize;
if(process.env.NODE_ENV == "production"){
    sequelize = new Sequelize('dafvhi3t9qcu5a','lwnvkpeenakrks','fd88d349b6623b5499499c4c6916f9866bb8ad930747febd1c31b8607c7555e4',{
        host:'ec2-34-225-82-212.compute-1.amazonaws.com',
        dialect:'postgres'
    })
}else{
    sequelize = new Sequelize('almoxarifado','postgres', password,{
        host:'localhost',
        dialect:'postgres'
    });
    
}
sequelize.authenticate().then(function(){
    console.log('Servidor conectado com sucesso!')
}).catch(function(err){
    console.log('Falha ao se conectar:'+err)
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};