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
    async remover(pokemon) {
        if(!pokemon) {
            await this.escreverArquivo([]) //limpa a base de dados
        }
        const data = await this.obterDadosArquivo()
        const pokemonIndex = data.findIndex(item => item.nome === pokemon)
        const pokemonHasNotBeenFound = pokemonIndex === -1
        if(pokemonHasNotBeenFound) {
            throw Error('Pokemon nao encontrado')
        }
        data.splice(pokemonIndex, 1)
        const dataUpdated = data.filter(item => {
            return item.nome !== pokemon
        })
        console.log(dataUpdated)
        console.log(data)
        return await this.escreverArquivo(data)
    }
    async atualizar(id, newPokemonData) {
        const data = await this.obterDadosArquivo()
        const pokemonIndex = data.findIndex(item => item.id === id)
        const pokemonHasNotBeenFound = pokemonIndex === -1
        if(pokemonHasNotBeenFound) {
            throw Error('Pokemon nao encontrado')
        }
        data.splice(pokemonIndex, 1)
        const updatedData = [...data, {id, ...newPokemonData}]
        // const updatedData = data.map(item => {
        //     if(item.id === id) {
        //         return {...item, ...newPokemonData}
        //     }
        //     return item
        // })
        await this.escreverArquivo(updatedData)
        return updatedData
    }
}
module.exports = Database