const ICrud = require('../interfaces/interfaceCrud')

//classe abstrata
class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy
    }

    isConnected() {
        return this._database.isConnected()
    }
    create(item) {
        return this._database.create(item)
    }
    read(item, skip, limit) {
        return this._database.read(item, skip, limit)
    }
    update(id, updatedItem) {
        return this._database.update(id, updatedItem)
    }
    delete(id) {
        return this._database.delete(id)
    }
}

module.exports = ContextStrategy
