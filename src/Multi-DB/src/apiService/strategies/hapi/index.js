const Hapi = require('hapi');
const DbContext = require('../../../db/strategies/base/contextStrategy')
const Mongo = require('../../../db/strategies/mongodb/mongodb')
const connection = Mongo._connect()
const heroScheme = require('../../../db/strategies/mongodb/schemas/heroesSchema')
const mongodb = new DbContext(new Mongo(connection, heroScheme))
class HapiService  {
    constructor(port, routes) {
        this.app = new Hapi.Server({
            port: port
        })
        this.routes = routes
    }
     async _start() {
        await this.app.start()
        console.log('servidor rodando na porta', this.app.info.port)
        return true
    }
    async createRoutes() {
        this.app.route([this.routes.read(), this.routes.create()])
        return this._start()
    }
}

module.exports = HapiService
