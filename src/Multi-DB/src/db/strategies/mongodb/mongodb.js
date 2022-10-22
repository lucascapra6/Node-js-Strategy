const ICrud = require('../../strategies/interfaces/interfaceCrud')
const Mongoose = require('mongoose')
//classe concreta do Mongo
const CONECTION_STATUS = {
    0:'Desconectado',
    1: 'Conectado',
    2:'Conectando',
    3:'Desconectado'
}
class MongoDB extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection
        this._schema = schema
    }
    static _connect() {
        Mongoose.connect('mongodb://lucas:mysecretpassword@localhost:27017/herois', {useNewUrlParser: true},
            (error) => {
                if(!error) return
                console.log('Falha na conexão', error)
            }
        )

        const connection = Mongoose.connection
        connection.once('open',() => console.log('database running'))
        return connection
    }

    async isConnected() {
        const connectionState = CONECTION_STATUS[this._connection.readyState]
        if(connectionState === 'Conectado') return connectionState
        if(connectionState !=='Conectando') return connectionState
        await new Promise(resolve => setTimeout(resolve, 1000)) //promisse para esperar 1 segundo antes de prosseguir

        return CONECTION_STATUS[this._connection.readyState]
    }

    create(item) {
        return this._schema.create(item)
    }
    read(item, skip = 0, limit = 10) { //skip: skipa a quantidade de itens indicados  //limit: limita a quantidade de itens que virão
        return this._schema.find(item).skip(skip).limit(limit)
    }
    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }
    delete(id) {
        return this._schema.deleteOne({_id: id})
    }
}

module.exports = MongoDB
