const assert = require('assert')
const Postgres = require('../../db/strategies/postgres')
const Context = require('../../db/strategies/base/contextStrategy')

const contextPostgres = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    name: 'Superman',
    skill: 'Super strength'
}
describe('Postgress Strategy', function() {
    this.timeout(Infinity)
    it('PostgressSQL connection estabilished', async function () {
        const result = await contextPostgres.isConnected()
        const expected = true
        assert.equal(result, expected)
    } )
    it('sign in a hero', async function () {
        const result = await contextPostgres.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        const expected = MOCK_HEROI_CADASTRAR
        assert.deepEqual(result, expected)
    })
})
