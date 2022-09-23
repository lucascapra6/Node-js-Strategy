const assert = require('assert');
const PokemonHttpRequester = require("./src/services/PokemonHttpRequester.js")
const pokemonHttpRequester = new PokemonHttpRequester()

describe('Pokemon Tests', () => {
    it('deve retornar nome, peso, order e altura do pokemon', async() => {
        const expected = {
            nome: 'pikachu',
            peso: 60,
            altura:4,
            order: 35,
        }
        const pokemonToGet = 'pikachu'
        const pokemon = await pokemonHttpRequester.getPokemon(pokemonToGet)
        const resultado = pokemon
        assert.deepStrictEqual(resultado, expected)
    })
})
