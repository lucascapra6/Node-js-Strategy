const Hapi = require('hapi');

class HapiService  {
    constructor(port) {
        this.app = new Hapi.Server({
            port: port
        })
    }
     async _start() {
        await this.app.start()
        console.log('servidor rodando na porta', this.app.info.port)
        return true
    }
    _listRoutes(instance, methods) {
        return methods.map(method => instance[method]())
    }
    async createRoutes(instance, methods) {
        this.app.route(this._listRoutes(instance, methods))
        return this._start()
    }
}

module.exports = HapiService
