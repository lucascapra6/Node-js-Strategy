const ICrud = require('../interfaces/interfaceCrud')

//classe abstrata
class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy
        this._connect()
    }

    async _connect() {
        this._database._connect()
        await this.defineModel()
    }
    async defineModel() {
        await this._database.defineModel()
    }
    isConnected() {
        return this._database.isConnected()
    }
    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(id, updatedItem) {
        return this._database.update(id, updatedItem)
    }
    delete(id) {
        return this._database.delete(id)
    }
}
const teste = new ContextStrategy()

module.exports = ContextStrategy
