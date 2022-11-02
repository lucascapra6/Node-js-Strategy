const IApiService = require('../interfaces/apiServiceInterface')
class ApiServiceContext extends IApiService {
    constructor(service) {
        super()
        this.service = service
    }
    async createRoutes(instance, methods) {
        return this.service.createRoutes(instance, methods)
    }
}

module.exports = ApiServiceContext
