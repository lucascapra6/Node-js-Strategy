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
    const DEFAULT_ITEM_CADASTRAR = {
        id:1,
        nome:'pikachu',
        tipo:'eletrico'
    }
    const DEFAULT_ITEM_ATUALIZAR = {
        id:2,
        nome: 'blastoise',
        tipo:'agua'
    }
    before(async() => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar pokemon utilizando os arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await database.listarPokemon()
        assert.ok(result, expected)
    })
    it('deve conter o id, nome e tipo do pokemon esperado', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const result = await database.listarPokemon()
        assert.deepStrictEqual(result[0], expected)
    })
    it('deve cadastrar um pokemon', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const result = await database.listarPokemon(DEFAULT_ITEM_CADASTRAR.nome)
        assert.deepStrictEqual(expected, result[0])
    })
    it('deve remover o pokemon pelo nome', async () => {
        const expected = true
        const result = await database.remover(DEFAULT_ITEM_CADASTRAR.nome)
        assert.deepStrictEqual(result, expected)
    })
    it('deve atualizar as informacoes do pokemon selecionado', async () => {
        const expected = [DEFAULT_ITEM_CADASTRAR, {...DEFAULT_ITEM_ATUALIZAR, nome: 'charmander', tipo:'fogo'}]
        const pokemonUpdated = {nome: 'charmander', tipo:'fogo'}
        const result = await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, pokemonUpdated )
        assert.deepStrictEqual(result, expected)
    })
})
