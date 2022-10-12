const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes', //nome do banco
    'lucascapra6', // usuario
    'password', //senha
    {
        host:'localhost', //onde está sendo hosteado o banco de dados
        dialect:'postgres', // banco de dados usado
        quoteIdentifiers: false, //stopa erros de padrão
        operatorsAliases:false // stopa erros de deprecation
    }
)
