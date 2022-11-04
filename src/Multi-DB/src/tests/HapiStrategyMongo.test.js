const assert = require('assert')
const ApiServiceContext = require('../apiService/strategies/base/apiServiceContext')
const Hapi = require('../apiService/strategies/hapi/index')
const HeroRoute = require('../routes/strategies/hapi/heroRoutes')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const DbContext = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
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
describe.only('Hapi Strategy services', function () {
    this.beforeAll(async () => {
        server = await apiServiceContext.createRoutes(heroRoutes, methods)
    })
    it('check the service /heroes is up', async () => {
        const result = await server.inject({
            method:'GET',
            url:'/heroes'
        })
        const response = result.statusCode
        assert.deepEqual(response, 200)
    })
    it('list heroes must return only 5 registers', async () => {
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
    it('list heroes must return a bad request', async () => {
        const limit = 'asd'
        const result = await server.inject({
            method:'GET',
            url:`/heroes?skip=0&limit=${limit}`
        })
        const response = JSON.parse(result.payload)
        assert.equal(response.statusCode, 400)
    })
    it('check if the service create hero is up', async () => {
        const response = await server.inject({
            method:'POST',
            url:'/newHero',
            payload: MOCK_CREATE_HERO
        })
        const statusCode = response.statusCode
        assert.equal(statusCode, 200)
    })
    it('create a new hero', async () => {
        const response = await server.inject({
            method:'POST',
            url:'/newHero',
            payload: MOCK_CREATE_HERO
        })
        const resultStatus = response.result.statusCode
        assert.deepEqual(resultStatus, 200)
    })
})
