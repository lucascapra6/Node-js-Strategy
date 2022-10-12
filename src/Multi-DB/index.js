const ContextStrategy = require('./src/db/strategies/base/contextStrategy')
const MongoDb = require('./src/db/strategies/mongodb')
const Postgres = require('./src/db/strategies/postgres')

const contextMongodb = new ContextStrategy(new MongoDb())
const contextPostgres = new ContextStrategy(new Postgres())

contextMongodb.read()
contextPostgres.read()
