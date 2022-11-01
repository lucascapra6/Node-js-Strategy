const BaseRoutes = require('../../base/baseRoutes')
class MongoHeroRoutes extends BaseRoutes {
    constructor(db) {
        super()
        this.db = db
    }
    read() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    create() {
        return {
            path: '/heroess',
            method: 'GET',
            handler: (request, headers) => {
                return 'teste'
            }
        }
    }
    update() {
        return {
            path: '/',
            method: 'GET',
            handler: (request, headers) => {
                return 'Home'
            }
        }
    }
}
module.exports = MongoHeroRoutes
