const assert = require('assert')
const ApiServiceContext = require('../apiService/strategies/base/apiServiceContext')
const Hapi = require('../apiService/strategies/hapi/index')
const HeroRoute = require('../routes/strategies/hapi/heroRoutes')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const DbContext = require('../db/strategies/base/contextStrategy')
const connection = MongoDB._connect()
const heroScheme = require('../db/strategies/mongodb/schemas/heroesSchema')

const mongoDbStrategy = new DbContext(new MongoDB(connection, heroScheme ))
const heroRoutes = new HeroRoute(mongoDbStrategy)
const methods = HeroRoute.getMethods()
const apiServiceContext = new ApiServiceContext(new Hapi(5000))
 let server = {}

const MOCK_CREATE_HERO = {
    name: 'Chapolin colorado',
    skill:'Marreta biônica'
}
const MOCK_HERO_TO_UPDATE = {
    name:'Lanterna Verde',
    skill:'Anel'
}
const MOCK_UPDATED_HERO = {
    name:'Homem Formiga',
    skil:'Diminuir de tamanho'
}

let HERO_TO_UPDATE_ID;
describe.only('Hapi Strategy services', function () {
    this.beforeAll(async () => {
        server = await apiServiceContext.createRoutes(heroRoutes, methods)

        const heroToUpdate = await server.inject({
            method:'POST',
            url:'/newHero',
            payload: MOCK_HERO_TO_UPDATE
        })
        const heroToUpdateData = JSON.parse(heroToUpdate.payload)
        HERO_TO_UPDATE_ID = heroToUpdateData._id
    })
    it('check if the endpoint /heroes is up', async () => {
        const result = await server.inject({
            method:'GET',
            url:'/heroes'
        })
        const response = result.statusCode
        assert.deepEqual(response, 200)
    })
    it('/heroes must return only 5 registers', async () => {
        const limit = 5
        const skip = 0
        const result = await server.inject({
            method:'GET',
            url:`/heroes?skip=${skip}&limit=${limit}`
        })
        const data = JSON.parse(result.payload)
        const numberOfRegisters = data.length
        assert.deepEqual(numberOfRegisters, 5)
    })
    it('/heroes must return a bad request', async () => {
        const limit = 'asd'
        const result = await server.inject({
            method:'GET',
            url:`/heroes?skip=0&limit=${limit}`
        })
        const response = JSON.parse(result.payload)
        assert.equal(response.statusCode, 400)
    })
    it('check if the endpoint /newHero is up', async () => {
        const response = await server.inject({
            method:'POST',
            url:'/newHero',
            payload: MOCK_CREATE_HERO
        })
        const statusCode = response.statusCode
        assert.equal(statusCode, 200)
    })
    it('create a new hero with the endpoint /newHero', async () => {
        const response = await server.inject({
            method:'POST',
            url:'/newHero',
            payload: MOCK_CREATE_HERO
        })
        const resultStatus = response.statusCode
        assert.deepEqual(resultStatus, 200)
    })
    it('check if the endpoint /putHero is up and replacing the hero ', async () => {
        const response = await server.inject({
            method:'PUT',
            url:'/putHero',
            payload: {id: HERO_TO_UPDATE_ID, newHero: MOCK_UPDATED_HERO}
        })
        const resultStatus = response.statusCode
        assert.deepEqual(resultStatus, 200)
        assert.deepEqual(response.result.modifiedCount, 1)
    })
    it('check if the endpoint /patchHero is up', async () => {
        const response = await server.inject({
            method:'PATCH',
            url:'/patchHero',
            payload: {id: HERO_TO_UPDATE_ID, newHero: MOCK_UPDATED_HERO}
        })
        const resultStatus = response.statusCode
        assert.deepEqual(resultStatus, 200)
    })
})
