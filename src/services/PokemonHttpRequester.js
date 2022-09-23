const HttpClient = require("./HttpClient.js");

class PokemonHttpRequester {
    constructor(httpClient = new HttpClient({config: {baseURL:'https://pokeapi.co/api/v2/'}})) {
        this.httpClient = httpClient
    }
    async getPokemon(pokemonName) {
        const requestConfig = {
            url:`pokemon/${pokemonName}`
        }
        const response = await this.httpClient.sendRequest(requestConfig)
        const {name, weight, order, height} = response.data
        return {
            nome: name,
            peso: weight,
            order:order,
            altura: height
        }
    }
}
module.exports = PokemonHttpRequester
