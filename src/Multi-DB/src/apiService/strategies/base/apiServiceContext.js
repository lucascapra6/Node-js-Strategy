const IApiService = require('../interfaces/apiServiceInterface')
class ApiServiceContext extends IApiService {
    constructor(service) {
        super()
        this.service = service
    }
    createRoutes() {
        return this.service.createRoutes()
    }
}

module.exports = ApiServiceContext
