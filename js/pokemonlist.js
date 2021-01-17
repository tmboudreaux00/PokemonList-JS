"use strict"

//import * as html_tags from './html_tags.js';
//CORS ISSUE - WILL COME BACK LATER AND REWORK IMPORTS

// let create_el = html_tags.create_el;
// let get_el = html_tags.get_el;

let div = () => { return document.createElement('div'); }
let pokemonClassList;

let pokelist = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
    .then(response => response.json())
    .then(pokemon_data => {
        let pokemon_keys = Object.keys(pokemon_data.results);
        let pokemon_values = Object.values(pokemon_data.results);
        
        let pokemon_list = document.getElementById('pokedex');
        let pokemonClassList = document.getElementsByClassName('pokemonCard');
        let pokemon, pokemon_name, pokemon_id, pokemon_photo_urls, pokemon_type;
        // let pokemon_name = '';
        // let pokemon_id = 0;
        // let pokemon_photo_urls = {
        //     photo_1: `url`,
        //     photo_2: `url`,
        //     photo_3: `url`,
        //     photo_4: `url`
        // };
        // let pokemon_type = {
        //     type_1: `url`,
        //     type_2: `url`
        // }

        //implement views 10, 25, 50, 100, All
        //create cards for each pokemon
        //decide what information to show
        //filter results
        //search bar
        (function() { return pokemon_list.innerHTML = ''; })();
        
        for (let i = 0; i < pokemon_values.length; i++) {
            pokemon = div();
            pokemon.className = `pokemonCard`;
            pokemon.id = `pokemon${i + 1}`;

            
            pokemon_id = `${i}`;
            
            pokemon_name = `${pokemon_values[i].name}`;
            
            pokemon.append(

                
                );

            pokemon_list.append(pokemon);
            
            
            
            console.log(pokemon_values);
        }

        /**
         <div class="card-renameme">
            <div>
                photo
            </div>
            <div>
                #001
            </div>
            <div>
                Name
            </div>
            <div>
                <div>Char1</div>
                <div>Char2</div>
            </div>
        </div>
         */

        //x = results view selection (e.g. 10, 25, 50) 
        //y = results page view
        //onSelection => y = x
        //onClick => y += y

    })
}
pokelist()

/** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/