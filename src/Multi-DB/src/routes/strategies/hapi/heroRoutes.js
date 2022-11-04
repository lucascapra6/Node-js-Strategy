const BaseRoutes = require('../../base/baseRoutes')
const Joi = require('joi')
class MongoHeroRoutes extends BaseRoutes {
    constructor(db) {
        super()
        this.db = db
    }
    read() {
        return {
            path: '/heroes',
            method: 'GET',
            config: {
                validate: {
                    //payload -> body
                    //headers -> header
                    //params -> na URL :id
                    failAction:(request, headers, error) => {
                        throw error
                    },
                    query: Joi.object({
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)
                    })
                }
            },
            handler: (request, headers) => {
                try {
                    const {skip, limit, name} = request.query
                    const query = name ? {name: name} : {}
                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log(error)
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
            path: '/newHero',
            method: 'POST',
            config: {
                validate: {
                    failAction:(request, headers, error) => {
                        throw error
                    },
                    payload: Joi.object({
                        name: Joi.string().required().min(3).max(100),
                        skill: Joi.string().required()
                    })
                }
            },
            handler: (request) => {
                try {
                    const payload = request.payload
                    this.db.create(payload)
                    return {
                        statusCode: 200,
                        msg:'Heroi inserido com sucesso'
                    }
                }catch (error) {
                    console.log(error)
                    return {
                        status: false,
                        msg:'Erro interno no servidor'
                    }
                }
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
