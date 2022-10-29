const ICrud = require('../interfaces/interfaceCrud')
const Sequelize = require('sequelize')
//classe concreta do Postgres
class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection
        this._schema = schema

    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('authentication failed', error)
            return false
        }
    }
    static _connect() { //metodo privado, sera utilizado somente dentro dessa classe
        const connection = new Sequelize(
            'heroes', //nome do banco
            'lucascapra6', // usuario
            'password', //senha
            {
                host:'localhost', //onde está sendo hosteado o banco de dados
                dialect:'postgres', // banco de dados usado
                quoteIdentifiers: false, //stopa erros de padrão
                operatorsAliases: 0, // stopa erros de deprecation
            }
        )
        return connection
    }
    static async _defineModel(connection, schema) {
        //metodo estatico nao acessa o construtor, por isso a connection e o schema sao passados via parametro
        const model = connection.define(schema.name, schema.schema, schema.options)
        await model.sync()
        return model
    }
    async create(item) {
        const  {dataValues} = await this._schema.create(item)
        return dataValues
    }
    read(item = {}) {
        return this._schema.findAll({where: item, raw: true})
    }
    update(id, updatedItem) {
        return this._schema.update(updatedItem, {where: {id: id}})
    }
    delete(id) {
        const queryId = id ? {id} : {}
        return this._schema.destroy({where:queryId })
    }
}

module.exports = Postgres
