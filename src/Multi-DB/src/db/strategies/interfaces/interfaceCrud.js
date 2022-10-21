class NotImplementedExcepetion extends Error {
    constructor(props) {
        super(props);
    }
}

//interface e suas assinaturas
class ICrud {
    async _connect() {
        throw new NotImplementedExcepetion('Created Method was not implemented')
    }
    async defineModel() {
        throw new NotImplementedExcepetion('Created Method was not implemented')
    }
    async isConnected() {
        throw new NotImplementedExcepetion('Created Method was not implemented')
    }
    create(item) {
        throw new NotImplementedExcepetion('Created Method was not implemented')
    }
    read(query) {
        throw new NotImplementedExcepetion('Read Method was not implemented')
    }
    update(id, item) {
        throw new NotImplementedExcepetion('update Method was not implemented')
    }
    delete(id) {
        throw new NotImplementedExcepetion('delete Method was not implemented')
    }
}

module.exports = ICrud
