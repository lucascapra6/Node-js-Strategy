const ICrud = require('../strategies/interfaces/interfaceCrud')
const Mongoose = require('mongoose')
//classe concreta do Mongo
const CONECTION_STATUS = {
    0:'Desconectado',
    1: 'Conectado',
    2:'Conectando',
    3:'Desconectado'
}
class MongoDB extends ICrud {
    constructor() {
        super();
        this.driver = null
        this.herois = null
    }

    async isConnected() {
        const connectionState = CONECTION_STATUS[this.driver.readyState]
        if(connectionState === 'Conectado') return connectionState
        if(connectionState !=='Conectando') return connectionState
        await new Promise(resolve => setTimeout(resolve, 1000)) //promisse para esperar 1 segundo antes de prosseguir

        return CONECTION_STATUS[this.driver.readyState]
    }

    _connect() {
        Mongoose.connect('mongodb://lucas:mysecretpassword@localhost:27017/herois', {useNewUrlParser: true},
            (error) => {
                if(!error) return
                console.log('Falha na conexão', error)
            }
        )

        const connection = Mongoose.connection
        connection.once('open',() => console.log('database running'))
        this.driver = connection
    }

    async defineModel() {
        const heroiSchema = new Mongoose.Schema({
            name: {
                type:String,
                required: true
            },
            skill: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this.herois = Mongoose.model('herois', heroiSchema )

    }

    create(item) {
        return this.herois.create(item)
    }
    read(item, skip = 0, limit = 10) { //skip: skipa a quantidade de itens indicados  //limit: limita a quantidade de itens que virão
        return this.herois.find(item).skip(skip).limit(limit)
    }
    update(id, item) {
        console.log(id)
        return this.herois.updateOne({id}, {_$set: item})
    }
    delete(id) {
        console.log('item deletado no mongo')
    }
}

module.exports = MongoDB
