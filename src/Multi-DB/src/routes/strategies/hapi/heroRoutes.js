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
                    return this.db.create(payload)
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
    updateWithPut() {
        return {
            path: '/putHero',
            method: 'PUT',
            config: {
                validate: {
                    failAction:(request, headers, error) => {
                        console.log(error)
                        throw error
                    },
                    payload: Joi.object({
                        id: Joi.string().required().min(1).max(100),
                        newHero: Joi.object().required()
                    })
                }
            },
            handler: (request, headers) => {
                try {
                    const {id, newHero} = request.payload
                    return this.db.update(id, newHero)
                } catch (e) {
                    console.log(e)
                    return {
                        status: false,
                        msg:'Erro interno no servidor'
                    }
                }
            }
        }
    }
    updateWithPatch() {
        return {
            path: '/patchHero',
            method: 'PATCH',
            config: {
                validate: {
                    failAction:(request, headers, error) => {
                        console.log(error)
                        throw error
                    },
                    // payload: Joi.object({
                    //     id: Joi.string().required().min(1).max(100),
                    //     newHero: Joi.object().required()
                    // })
                }
            },
            handler: (request, headers) => {
                try {
                    return 'up'
                } catch (e) {
                    console.log(e)
                    return {
                        status: false,
                        msg:'Erro interno no servidor'
                    }
                }
            }
        }
    }
}
module.exports = MongoHeroRoutes
