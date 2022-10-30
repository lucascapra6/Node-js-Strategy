class NotImplementedExcepetion extends Error {
    constructor(props) {
        super(props);
    }
}

class IApiService {
    createRoutes() {
        throw new NotImplementedExcepetion('Created Method was not implemented')
    }
}

module.exports = IApiService
