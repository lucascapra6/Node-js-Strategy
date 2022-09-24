const PokemonHttpRequester = require('../services/PokemonHttpRequester')
const pokemonHttpRequester = new PokemonHttpRequester()
const getFirstUserData = async () => {
    const response = await pokemonHttpRequester.getPokemon('pikachu')
    return response
};

getFirstUserData().then(r => console.log(r))
