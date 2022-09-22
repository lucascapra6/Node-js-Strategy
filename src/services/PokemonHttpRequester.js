const HttpClient = require("./HttpClient.js");

class PokemonHttpRequester {
    constructor(httpClient = new HttpClient({config: {baseURL:'https://pokeapi.co/api/v2/'}})) {
        this.httpClient = httpClient
    }
    async getPokemon(name) {
        const requestConfig = {
            url:`pokemon/${name}`
        }
        const response = await this.httpClient.sendRequest(requestConfig)
        return response
    }
}
module.exports = PokemonHttpRequester
