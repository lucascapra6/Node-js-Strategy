const ApiServiceContext = require('./apiService/strategies/base/apiServiceContext')
const Hapi = require('./apiService/strategies/hapi')

const apiServiceContext = new ApiServiceContext(new Hapi(5000))

apiServiceContext.createRoutes()
