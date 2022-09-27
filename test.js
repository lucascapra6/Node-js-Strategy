const assert = require('assert');
const PokemonHttpRequester = require("./src/services/PokemonHttpRequester.js")
const pokemonHttpRequester = new PokemonHttpRequester()
const Database = require('./src/CRUD/database')
const database = new Database()
//instalado pacote nock para simular requisiçoes
const nock = require('nock')

describe('Pokemon Tests', () => {
    beforeEach(() => {
        const response = {
                name: 'pikachu',
                weight: 60,
                height:4,
                order: 35,
        }
        nock('https://pokeapi.co/api/v2').get('/pokemon/pikachu').reply(200,response)
    })
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

describe('Suite de manipulação de Pokemons', () => {
    it('deve pesquisar pokemon utilizando os arquivos', async () => {
        const expected = {
            id: 1,
            nome: 'blastoise',
            tipo: 'agua'
        }
        const result = await database.listarPokemon()
        assert.ok(result, expected)
    })
    it('deve conter o id, nome e tipo do pokemon esperado', async () => {
        const expected = {
            id: 1,
            nome: 'blastoise',
            tipo: 'agua'
        }
        const result = await database.listarPokemon()
        assert.deepStrictEqual(result[0], expected)
    })
    it('deve cadastrar um pokemon', async () => {
        const expected = {
            id:2,
            nome:'pikachu',
            tipo:'eletrico'
        }
        await database.cadastrar(expected)
        const result = await database.listarPokemon('pikachu')
        console.log(result)
        assert.deepStrictEqual(expected, result[0])
    })
})
