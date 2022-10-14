const ICrud = require('../strategies/interfaces/interfaceCrud')
const Sequelize = require('sequelize')
//classe concreta do Postgres
class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null
        this._heroes = null
        this._connect()
    }
    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('authentication failed', error)
            return false
        }
    }
    async _connect() { //metodo privado, sera utilizado somente dentro dessa classe
        this._driver = new Sequelize(
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
        await this.defineModel()
    }
    async defineModel() {
        this._heroes = this._driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                required: true
            },
            skill: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName:'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        })
        await this._heroes.sync()
    }
    async create(item) {
        const  {dataValues} = await this._heroes.create(item)
        return dataValues
    }
    read(item = {}) {
        return this._heroes.findAll({where: item, raw: true})
    }
    update(id, updatedItem) {
        return this._heroes.update(updatedItem, {where: {id: id}})
    }
    delete(id) {
        console.log('item deletado no postgres')
    }
}

module.exports = Postgres
