"use strict"

let pokelist = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then(response => response.json())
    .then(pokemon_list => {
        let pokemon_keys = Object.keys(pokemon_list.results);
        let pokemon_values = Object.values(pokemon_list.results);
        
        let species_list = document.getElementById('speciesList');
        let species_create = document.createElement('div');
        (function() {
            let i = 0; 
            species_list.className = '';
            return species_list.innerHTML = '';
         })();
    
        for (let i = 0; i < pokemon_values.length; i++) {
            species_create = document.createElement('div');
            species_create.className = `pokemonSpecies`;
            species_create.append(`${i}. ${pokemon_values[i].name}`);
            species_list.append(species_create);
        }

    })
}
pokelist()

/** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/