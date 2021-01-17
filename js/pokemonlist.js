"use strict"

//import * as html_tags from './html_tags.js';
//CORS ISSUE - WILL COME BACK LATER AND REWORK IMPORTS

// let create_el = html_tags.create_el;
// let get_el = html_tags.get_el;
//implement views 10, 25, 50, 100, All
let div = () => { return document.createElement('div'); }
let pokemonClassList;

let api_limit = 10;
let api_offset = 0;

let pokelist = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${api_limit}&offset=${api_offset}`)
    .then(pokemon_list => pokemon_list.json())
    .then(pokemon_list_data => {
        let pokemon_keys = Object.keys(pokemon_list_data.results);
        let pokemon_values = Object.values(pokemon_list_data.results);
        
        let pokedex_id = document.getElementById('pokedex');
        let pokemonClassList = document.getElementsByClassName('pokemonCard');
        let get_pokemon, get_pokemon_type, pokemon, pokemon_id, pokemon_id_int, pokemon_card_photo, pokemon_card_photo_url, pokemon_name, pokemon_type;

    
        //decide what information to show
        //filter results
        //search bar

        (function() { return pokedex_id.innerHTML = ''; })();
        
        for (let i = 0; i < pokemon_values.length; i++) {
            pokemon = div();
            pokemon.className = `pokemonCard`;
            pokemon.id = 'pokemon' + pokemon_id_int;
            get_pokemon = () => {
                fetch(`${pokemon_values.url}`)
                .then(pokemon_data = pokemon_data.json())
                .then(pokemon_card_data => {
                
                pokemon_card_photo = div();
                pokemon_card_photo_url = `${pokemon_card_data.sprites.front_default}}`     
                pokemon_card_photo.innerHTML = `<img src="${pokemon_card_photo_url}" alt="photo of ${document.getElementById('pokemonName')}" />`

                pokemon_id = div();
                pokemon_id_int = () => {
                    let id = pokemon_card_data.id;
                    if (id < 10)
                        id = `00${id}`;
                    else if (id > 10 && id < 100)
                        id= `0${id}`;
                }
                pokemon_id.innerText = pokemon_id_int();
                
                pokemon_name = div();
                pokemon_name.id = 'pokemonName';
                pokemon_name.innerText = `${pokemon_values[i].name}`;
                
                pokemon_type = div();
                pokemon_type.id = 'pokemonType';
                get_pokemon_type = () => {
                    let type_1_name, type_1_url, type_2_name, type_2_url;
                    if (pokemon_card_data.types.length == 1){
                        type_1_name = pokemon_card_data.types[0].type.name;
                        type_1_url = pokemon_card_data.types[0].type.url;
                    }  
                    else {
                        type_1_name = pokemon_card_data.types[0].type.name;
                        type_1_url = pokemon_card_data.types[0].type.url;  
                        type_2_name = pokemon_card_data.types[1].type.name;
                        type_2_url = pokemon_card_data.types[1].type.url;  
                    }
                }

                console.log('hello');
            })
            get_pokemon();
        }          
    }
console.log(pokemon_values);
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