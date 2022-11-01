const assert = require('assert')
const Context = require('../db/strategies/base/contextStrategy')
const MongoDB = require('../db/strategies/mongodb/mongodb')
const heroSchema = require('../db/strategies/mongodb/schemas/heroesSchema')
const MOCK_HEROI_CREATE = {
    name:'Spiderman',
    skill:'Climb walls'
}
const MOCK_HEROI_READ = {
    name:'Aquaman',
    skill:'live under watter'
}
const MOCK_HEROI_TO_UPDATE = {
    name:'Superman',
    skill:'Super strength'
}
const MOCK_HEROI_UPDATED = {
    name:'Flash',
    skill:'Super speed'
}

let HEROI_UPDATE_ID = ''

describe('MongoDB Strategy', function () {
    const connection = MongoDB._connect()
    const mongoStrategy = new Context(new MongoDB(connection, heroSchema))
    this.beforeAll(async () => {
        mongoStrategy.create(MOCK_HEROI_READ)
        const result = await mongoStrategy.create(MOCK_HEROI_TO_UPDATE)
        HEROI_UPDATE_ID = result.id
    })
    it('mongoDB connection estabilished', async function() {
        const expected = 'Conectado'
        const result = await mongoStrategy.isConnected()
        assert.deepStrictEqual(result, expected)
    })
    it('create a hero', async function() {
        const {name, skill} = await mongoStrategy.create(MOCK_HEROI_CREATE)
        const result = {name, skill}
        const expected = MOCK_HEROI_CREATE
        assert.deepEqual(result, expected)
    })
    it('list a hero', async function() {
        const [{name, skill}] = await mongoStrategy.read({name: MOCK_HEROI_READ.name})
        const result = {name, skill}
        const expected = MOCK_HEROI_READ

        assert.deepEqual(result, expected)
    })
    it('update a hero', async function () {
        const ITEMS_UPDATED = 1
        const result = await mongoStrategy.update(HEROI_UPDATE_ID, MOCK_HEROI_UPDATED)
        assert.deepEqual(result.modifiedCount, ITEMS_UPDATED)
    })
    it('delete a hero', async function() {
        const ITEMS_REMOVED = 1
        const [heroToDelete] = await mongoStrategy.read({name: MOCK_HEROI_READ.name})
        const result = await mongoStrategy.delete(heroToDelete._id)
        assert.deepEqual(result.deletedCount, ITEMS_REMOVED)
    })
})
