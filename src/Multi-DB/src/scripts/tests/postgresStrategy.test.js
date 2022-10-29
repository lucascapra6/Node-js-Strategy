const assert = require('assert')
const Postgres = require('../../db/strategies/postgres/postgres')
const Context = require('../../db/strategies/base/contextStrategy')
const heroesScheme = require('../../db/strategies/postgres/schemes/heroesScheme')
const MOCK_HEROI_CADASTRAR = {
    name: 'Superman',
    skill: 'Super strength'
}
const MOCK_HEROI_ATUALIZAR = { //heroi criado para ser atualizado
    name:'Flash',
    skill:'Super speed'
}

const MOCK_HEROI_DELETAR = {
    name:'Batman',
    skill: 'Money'
}
let contextPostgres;

describe.only('Postgress Strategy', function() {
    // this.timeout(Infinity)
    before(async () => {
        const connection = Postgres._connect()
        const modelScheme = await Postgres._defineModel(connection, heroesScheme)
        contextPostgres = new Context(new Postgres(connection, modelScheme))
        contextPostgres.delete()
        contextPostgres.create(MOCK_HEROI_ATUALIZAR)

    })
    it('PostgressSQL connection estabilished', async function () {
        const result = await contextPostgres.isConnected()
        const expected = true
        assert.equal(result, expected)
    } )
    it('sign in a hero in database', async function () {
        const result = await contextPostgres.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        const expected = MOCK_HEROI_CADASTRAR
        assert.deepEqual(result, expected)
    })
    it('read a hero in database', async function () {
        const [result] = await contextPostgres.read({name: MOCK_HEROI_CADASTRAR.name})
        delete result.id
        const expected = MOCK_HEROI_CADASTRAR
        assert.deepEqual(result, expected)
    })
    it('update a hero in database', async function () {
        const [heroToUpdate] = await contextPostgres.read({name: MOCK_HEROI_ATUALIZAR.name})
        const newHero = {
            ...heroToUpdate,
            name:'Spiderman',
            skill:'Climb walls'
        }
        const resultStatus = await contextPostgres.update(heroToUpdate.id, newHero)
        const [heroUpdated] = await contextPostgres.read({id: heroToUpdate.id})
        assert.deepEqual(resultStatus, [1])
        assert.deepEqual(heroUpdated, newHero)
    })
    it('delete a hero in database', async function () {
        await contextPostgres.create(MOCK_HEROI_DELETAR)
        const [heroToDelete] = await contextPostgres.read({name: MOCK_HEROI_DELETAR.name})
        const result = await contextPostgres.delete(heroToDelete.id)
        assert.deepEqual(result, 1)
    })
})
