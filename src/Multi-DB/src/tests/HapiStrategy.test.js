const assert = require('assert')
const ApiServiceContext = require('../apiService/strategies/base/apiServiceContext')
const Hapi = require('../apiService/strategies/hapi/index')
const HeroRoute = require('../routes/strategies/mongo/heroRoutes')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const DbContext = require('../db/strategies/base/contextStrategy')

const connection = MongoDB._connect()
const heroScheme = require('../db/strategies/mongodb/schemas/heroesSchema')

const mongoDbStrategy = new DbContext(new MongoDB(connection, heroScheme ))
const heroRoutes = new HeroRoute(mongoDbStrategy)
const methods = HeroRoute.getMethods()
const apiServiceContext = new ApiServiceContext(new Hapi(5000))

describe.only('Hapi Strategy services', function () {
    it('create the routes', async () => {
        const response = await apiServiceContext.createRoutes(heroRoutes, methods)
        const expected = true
        assert.deepEqual(response, expected)
    })
})
