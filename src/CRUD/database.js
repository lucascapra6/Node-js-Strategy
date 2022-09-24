const {readFile} = require('fs')
const {promisify} = require('util')

const promisifyAsync = promisify(readFile)

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
        console.log(selectedPokemon)
        return selectedPokemon
    }
}

module.exports = Database