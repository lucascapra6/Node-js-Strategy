const assert = require('assert')
const Context = require('../../db/strategies/base/contextStrategy')
const MongoDB = require('../../db/strategies/mongodb')
const mongoStrategy = new Context(new MongoDB())

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
    this.beforeAll(async () => {
        mongoStrategy.create(MOCK_HEROI_READ)
        const result = await mongoStrategy.create(MOCK_HEROI_TO_UPDATE)
        HEROI_UPDATE_ID = result._id
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
        console.log(HEROI_UPDATE_ID)
        const result = await mongoStrategy.update(HEROI_UPDATE_ID, MOCK_HEROI_UPDATED)
        const _SUCCESS = 1
        assert.deepEqual(result, _SUCCESS)
    })
})
