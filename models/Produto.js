const db = require('./db')
const Produto = db.sequelize.define('produtos',{
    nome:{
        type:db.Sequelize.STRING
    },
    quantidades:{
        type:db.Sequelize.INTEGER
    }  
})
module.exports = Produto


// Produto.sync({force:true})//gerar tabela, executar uma vez e comenta, para que rescreva a tabela

// Produto.create({//ex: como provoar tabela
//     nome:'arroz',
//     quantidades:25
// })