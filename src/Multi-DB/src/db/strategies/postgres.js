const ICrud = require('../strategies/interfaces/interfaceCrud')

//classe concreta do Postgres
class Postgres extends ICrud {
    constructor() {
        super();
    }
    create(item) {
        console.log('item criado no postgres')
    }
    read(query) {
        console.log('item lido no postgres')
    }
    update(id, item) {
        console.log('item atualizado no postgres')
    }
    delete(id) {
        console.log('item deletado no postgres')
    }
}

module.exports = Postgres
