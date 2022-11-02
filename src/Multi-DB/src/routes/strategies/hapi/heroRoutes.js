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
                try {
                    const {skip, limit, nome} = request.query
                    const query = nome ? nome : {}
                    const invalidType = isNaN(limit) || isNaN(skip)
                    if(invalidType) throw Error('Tipo do parâmetro limit ou skip invalido, insira um número')
                    return this.db.read(query, skip, limit)
                } catch (e) {
                    console.log(e)
                    return {
                        status: false,
                        msg: 'Erro interno no servidor'
                    }
                }
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
