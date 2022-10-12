//executando a implementacao de fazer requisicoes
const PokemonHttpRequester = require('../services/PokemonHttpRequester')
const pokemonHttpRequester = new PokemonHttpRequester()
const getFirstUserData = async () => {
    const response = await pokemonHttpRequester.getPokemon('pikachu') // resolvendo com await
    const response2 = pokemonHttpRequester.getPokemon('pikachu').then(r => console.log(r)) //resolvendo com .then
    return response
};

getFirstUserData().then(r => console.log(r))
