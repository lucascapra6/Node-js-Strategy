const ICrud = require('../strategies/interfaces/interfaceCrud')

//classe concreta do Postgres
class MongoDB extends ICrud {
    constructor() {
        super();
    }
    create(item) {
        console.log('item criado no mongo')
    }
    read(query) {
        console.log('item lido no mongo')
    }
    update(id, item) {
        console.log('item atualizado no mongo')
    }
    delete(id) {
        console.log('item deletado no mongo')
    }
}

module.exports = MongoDB
