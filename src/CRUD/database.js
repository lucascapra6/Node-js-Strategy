const {readFile, writeFile} = require('fs')
const {promisify} = require('util')
const {stringify} = require("mocha/lib/utils");

const promisifyAsync = promisify(readFile)
const promisifyWriteFile = promisify(writeFile)

class Database {
    constructor() {
        this.fileName = "pokemons.json"
    }
    async obterDadosArquivo() {
        const arquivo = await promisifyAsync(this.fileName, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async listarPokemon(nome) {
        const getDadosPokemons = await this.obterDadosArquivo()
        const selectedPokemon = getDadosPokemons.filter(item => nome ? item.nome === nome : true)
        return selectedPokemon
    }
    async escreverArquivo(data) {
        await promisifyWriteFile(this.fileName, JSON.stringify(data))
        return true
    }
    async cadastrar(pokemon) {
        const pokemons = await this.obterDadosArquivo()
        const id = pokemon.id <= 2 ? pokemon.id : Date.now()
        const pokemonComId = {id, ...pokemon}
        const finalData = [...pokemons, pokemonComId]
        const result = await this.escreverArquivo(finalData)
        return result
    }
}
module.exports = Database