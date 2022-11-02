const assert = require('assert')
const ApiServiceContext = require('../apiService/strategies/base/apiServiceContext')
const Hapi = require('../apiService/strategies/hapi/index')
const HeroRoute = require('../routes/strategies/hapi/heroRoutes')
const DbContext = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const HeroScheme = require('../db/strategies/postgres/schemes/heroesScheme')
const HeroRoutes = require('../routes/strategies/hapi/heroRoutes')
const apiServiceContext = new ApiServiceContext(new Hapi(5000))
let server = {}
describe('Hapi Strategy services', function () {
    this.beforeAll(async () => {
        const connection = Postgres._connect()
        const scheme = await Postgres._defineModel(connection, HeroScheme)
        const postgresContext = new DbContext(new Postgres(connection,scheme))
        const heroRoutes = new HeroRoutes(postgresContext)
        const methods = HeroRoutes.getMethods()
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
})
