const axios = require('axios')
class HttpClient {
    constructor({httpLibAdapter = axios, config}) {
        this.config = config
        this.httpLibAdapter = httpLibAdapter.create(config)
    }
    async sendRequest(requestConfig) {
        try {
            const response = await this.httpLibAdapter.request(requestConfig)
            return response
        } catch (e) {
            console.log('Error')
        }
    }
}
module.exports = HttpClient
