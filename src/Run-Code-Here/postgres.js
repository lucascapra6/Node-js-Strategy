const Postgres = require('../Multi-DB/src/db/strategies/postgres/postgres')
const Context = require('../Multi-DB/src/db/strategies/base/contextStrategy')
const heroScheme = require('../Multi-DB/src/db/strategies/postgres/schemes/heroesScheme')

async function postgres() {
    const connection = Postgres._connect()
    const modelScheme = await Postgres._defineModel(connection, heroScheme)
    const contextPostgres = new Context(new Postgres(connection, modelScheme))

    const result = await contextPostgres.read()
    return result
}

postgres()
