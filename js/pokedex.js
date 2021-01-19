"use strict"

//import * as html_tags from './html_tags.js';
//CORS ISSUE - WILL COME BACK LATER AND REWORK IMPORTS

// let create_el = html_tags.create_el;
// let get_el = html_tags.get_el;
//implement views 10, 25, 50, 100, All
//filter results
//search bar
//x = results view selection (e.g. 10, 25, 50) 
//y = results page view
//onSelection => y = x
//onClick => y += y


let div = () => { return document.createElement('div'); }


let default_sort, get_pokemon, get_pokemon_type, pokedex, pokemon, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_id_num, pokemon_list_values, 
    pokemon_name, pokemon_types, sort_pokemon, type_1, type_2;

pokemon_array = [];
default_sort;
pokedex = document.getElementById('pokedex');
let pokedex_copy = pokedex;    
console.log(pokemon_array);
let api_limit = 10;
let api_offset = 0;

let pokelist = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${api_limit}&offset=${api_offset}`)
    .then(pokemon_list => pokemon_list.json())
    .then(pokemon_list_data => {
        pokemon_list_values = Object.values(pokemon_list_data.results);
        pokemon = pokemon;
        pokemon_array = pokemon_array;
        //CLEAR #POKEDEX INNER HTML
       (function() { return pokedex.innerHTML = ''; })(); 
        get_pokemon = () => {
            
            for (let i = 0; i < api_limit; i++) {
                fetch(pokemon_list_values[i].url)
                .then(pokemon_card => pokemon_card.json())
                .then(pokemon_card_list_data => {
                    
                    pokemon_card_data = pokemon_card_list_data;
                
                    pokemon = div();
                    pokemon.className = `pokemonCard`;

                    pokemon_card_photo = div();
                    pokemon_card_photo_url = pokemon_card_data.sprites.front_default;
                    pokemon_card_photo.innerHTML = `<img src="${pokemon_card_photo_url}" alt="photo of ${pokemon_list_values[i].name}" />`;

                    pokemon_id = div();
                    pokemon_id_num = () => {
                        let id = pokemon_card_data.id;
                        if (id < 10)
                        id = `00${id}`;
                        else if (id >= 10 && id < 100)
                        id = `0${id}`;
                        return id;
                    }
                    
                    pokemon_id.id = pokemon_id_num()
                    pokemon_id.className = 'pokemonIdDisplay'
                    pokemon_id.innerText = pokemon_id.id;
                    pokemon.id = 'pokemon' + pokemon_id.id;
                    pokemon_name = div();
                    pokemon_name.id = 'pokemonName';
                    pokemon_name.innerText = `${pokemon_list_values[i].name}`;

                    pokemon_types = div();
                    pokemon_types.id = `pokemon${pokemon_id.id}Types`;
                    type_1 = div();
                    type_2 = div();
                    get_pokemon_type = () => {
                        let type_1_name, type_1_url, type_2_name, type_2_url;
                        type_1_name = pokemon_card_data.types[0].type.name;
                        type_1_url = pokemon_card_data.types[0].type.url;
                        type_1.innerText = type_1_name;
        
                        if (pokemon_card_data.types.length > 1){
                            type_2_name = pokemon_card_data.types[1].type.name;
                            type_2_url = pokemon_card_data.types[1].type.url;  
                            type_2.innerText = type_2_name;
                        }
                    }
                    get_pokemon_type();

                    pokemon_types.append(
                        type_1,
                        type_2
                    )
                   
                    pokemon.append(
                        pokemon_card_photo,
                        pokemon_id,
                        pokemon_name,
                        pokemon_types
                    )  
                         
                }) 
                return pokemon;
            }   //endfor 

            // pokemon_array.sort((a, b) => {
            //     a = Number(a.getElementsByClassName('pokemonIdDisplay')[0].id);
            //     b = Number(b.getElementsByClassName('pokemonIdDisplay')[0].id);
            //     return a < b ? - 1 : a > b ? + 1 : 0;
            // });
            // default_sort = pokemon_array;
                    
            // default_sort.filter(element => {
            //     return element !== undefined;
            // })

            // pokemon_array = default_sort;
            
            //pokedex_copy.append()
            return pokemon + '3';
        } 
        get_pokemon();
        return pokemon + '2';
    })
    get_pokemon()
    return pokemon + '1'; ; 
}
console.log(pokelist());
pokelist()

/** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/