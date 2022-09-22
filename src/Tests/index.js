const assert = require('assert');
const PokemonHttpRequester = require("../services/PokemonHttpRequester.js")
const pokemonHttpRequester = new PokemonHttpRequester()

// const getPokemonName = async () => {
//     const response = await pokemonHttpRequester.getPokemon('pikachu')
//     console.log(response)
// }

describe('Pokemon Tests', () => {
    it('deve retornar pikachu', async() => {
        const expected = 'pikachu'
        const pokemonToGet = 'pikachu'
        const pokemon = await pokemonHttpRequester.getPokemon(pokemonToGet)
        const resultado = pokemon.data.name
        assert.deepStrictEqual(resultado, expected)
    })
})
