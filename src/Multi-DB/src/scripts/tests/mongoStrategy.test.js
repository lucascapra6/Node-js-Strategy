const assert = require('assert')
const Context = require('../../db/strategies/base/contextStrategy')
const MongoDB = require('../../db/strategies/mongodb')
const mongoStrategy = new Context(new MongoDB())
describe('MongoDB Strategy', function () {
    it('mongoDB connection estabilished', async function() {
        const expected = 'Conectado'
        const result = await mongoStrategy.isConnected()
        assert.deepStrictEqual(result, expected)
    })
})
