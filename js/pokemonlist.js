"use strict"

//import * as html_tags from './html_tags.js';
//CORS ISSUE - WILL COME BACK LATER AND REWORK IMPORTS

// let create_el = html_tags.create_el;
// let get_el = html_tags.get_el;

//filter results
//search bar

//onSelection => y = x
//onClick => y += y

//VARIABLE INIT
let api_limit, api_offset, current_page, first_button, default_limit, default_offset, default_sort, get_10, get_20, get_50, get_100, get_all, last_button, next_button, number_of_pages, number_per_page, 
    number_per_page_option, previous_button, pokedex, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_info,
    pokemon_name, pokemon_types, sort_by_id, sort_method, sort_option, type;
    
    
//FUNCTION INIT
let append_pokemon, check, div, first_page, get_form, get_number_of_pages, get_pokemon, get_pokemon_type, get_user_selection, last_page, limiter, load_button, next_page, open_pokeball, page_view, 
    pokemon_id_num, pokemon_list, previous_page, set_limit, sort_pokemon, sorter, throw_pokeball;
 
div = () => { return document.createElement('div'); }
load_button = document.querySelector('#loadButton');
pokedex = document.querySelector('#pokedex');

sort_by_id = 'id';

default_sort = sort_by_id;
sort_option = sort_by_id; //USER OPTION --- ONLY ID AVAILABLE --- FUTURE SORT A - Z?


get_10 = 10;
get_20 = 20;
get_50 = 50;
get_100 = 100;
get_all = 151;

current_page = 1;

/** CONSTRUCTION ZONE */


/** END CONSTRUCTION ZONE */


pokemon_list = (api_limit, api_offset, reverse_sort) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${api_limit}&offset=${api_offset}`)
    .then(response => response.json())
    .then(pokemon_list => {
        pokemon_list.results.forEach(pokemon => {
            throw_pokeball(pokemon, reverse_sort);
        })
    })
}
   
throw_pokeball = (pokemon, reverse_sort) => {

    let pokemon_url = pokemon.url;
    fetch(pokemon_url)
    .then(response => response.json())
    .then(pokemon_card_data => {

    open_pokeball(pokemon_card_data, reverse_sort);

    })
}

open_pokeball = (pokemon_data, reverse_sort) => {
                    
    pokemon_info = div();
    pokemon_info.className = `pokemonCard`;

    pokemon_card_photo = div();
    pokemon_card_photo_url = pokemon_data.sprites.front_default;
    pokemon_card_photo.innerHTML = `<img src="${pokemon_card_photo_url}" alt="photo of ${pokemon_data.name}" />`;

    pokemon_id = div();
    pokemon_id_num = () => {
        let id = pokemon_data.id;
        if (id < 10)
            id = `00${id}`;
        else if (id > 9 && id < 100)
            id = `0${id}`;
        return id;
    }

    pokemon_id.id = pokemon_id_num()
    pokemon_id.className = 'pokemonIdDisplay'
    pokemon_id.innerText = pokemon_id.id;
    pokemon_info.id = 'pokemon' + pokemon_id.id;
    pokemon_name = div();
    pokemon_name.id = 'pokemonName';
    pokemon_name.innerText = `${pokemon_data.name}`;

    pokemon_types = div();
    pokemon_types.id = `pokemon${pokemon_id.id}Types`;

    get_pokemon_type(pokemon_data.types, pokemon_types);

    pokemon_info.append(
        pokemon_card_photo,
        pokemon_id,
        pokemon_name,
        pokemon_types
    )  
    pokemon_array.push(pokemon_info);
    sorter(pokemon_array, reverse_sort);
    get_number_of_pages(number_per_page_option);
}

get_pokemon_type = (types, pokemon_types) => {
    types.forEach( t => {
        type = div();
        type.innerText = t ['type']['name'];
        pokemon_types.append(type);
    })
}

sorter = (pokemon_array, reverse_sort) => {
    let sort_id;
    switch (true) {
        case (sort_option === sort_by_id):
            sort_id = pokemon_array.sort((a, b) => {
                a = Number(a.getElementsByClassName('pokemonIdDisplay')[0].id);
                b = Number(b.getElementsByClassName('pokemonIdDisplay')[0].id);
                
                return a < b ? - 1 : a > b ? + 1 : 0;
            });
            
            if (reverse_sort === true) {
                sort_method = sort_id.reverse();
                break;
            } else { 
                sort_method = sort_id;
                break;
            }
    }
    append_pokemon(sort_method)
    check(); 
}

append_pokemon = (pokemon_array) => {
    let row = div();
    row.className = 'pokemonRow'
    

    // 10 / 5
    // 20 / 5
    // 50 / 5
    // 100 / 5
    // ceiling(151 / 5)

    pokemon_array.forEach((p, i) => {
        switch (true) {
            case (i === 0):
                pokedex.append(row);
                row.id = `row${(number_per_page_option / 5) - (number_per_page_option / 5) + i + 1}`;
                document.getElementById(`row${i + 1}`)
            case ((i + 1) % 5 === 0 && i != 0):
                pokedex.append(row);
                row.id = `row${(number_per_page_option / 5) - (number_per_page_option / 5) + i + 1}`;
                pokedex.append(p);
            case ((i - 1) === get_all - 1):
                pokedex.append(p)  
            default:
                pokedex.append(p);
        }
        // if ((index + 1) % 5 === 0) {
        //     pokedex.append('<div class="pokedexRow">' + p + '</div>');
        // } else if ((index - 1) === get_all) {
        //     pokedex.append(p + '</div>'); 
        // } else {
        //     pokedex.append(p);
        // }
    }) 
}

get_number_of_pages = (number_per_page) => {
   return Math.ceil(get_all / number_per_page);
}

check = () => {
    document.getElementById("nextPage").disabled = current_page == number_of_pages ? true : false;
    document.getElementById("previousPage").disabled = current_page == 1 ? true : false;
    document.getElementById("firstPage").disabled = current_page == 1 ? true : false;
    document.getElementById("lastPage").disabled = current_page == number_of_pages ? true : false;
}

//CLEAR #POKEDEX INNER HTML AND RENDER VIEW
page_view = (limit, offset, reverse_sort) => {
    pokedex.innerHTML = '';
    pokedex.append()
    pokemon_list(limit, offset, reverse_sort);
}; 

set_limit =(number_per_page_option, offset, reverse_sort) => {

    switch(true) {
        case (reverse_sort === true):
            case (number_per_page_option === get_10):
                api_limit = get_all - get_10;
                api_offset = api_limit - get_10;
                break;
            case (number_per_page_option === get_20):
                api_limit = get_all - get_20;
                api_offset = api_limit - get_20;
                break;
            case (number_per_page_option === get_50):
                api_limit = get_all - get_50;
                api_offset = api_limit - get_50;
                break;
            case (number_per_page_option === get_100):
                api_limit = get_all - get_100;
                api_offset = api_limit - get_100;
                break;
            case(number_per_page_option === get_all):
                api_limit = get_all;
                api_offset = 0;
                break;

        case (reverse_sort === false):
            case (number_per_page_option === get_10):
                api_limit = get_10;
                api_offset = 0;
                break;
            case (number_per_page_option === get_20):
                api_limit = get_20;
                break;
            case (number_per_page_option === get_50):
                api_limit = get_50;
                break;
            case (number_per_page_option === get_100):
                api_limit = get_100;
                break;
            case (number_per_page_option === get_all):
                api_limit = get_all;
                break;
    }
    page_view(number_per_page_option, offset, reverse_sort)
}


get_pokemon = (number_per_page_option, reverse) => {
    let offset = 0;
    let reverse_offset = get_all - number_per_page;

    if (reverse === true){
        set_limit(number_per_page_option, reverse_offset, true);
    } else {
        set_limit(number_per_page_option, offset, false);
    }
}

get_form = (e) => {
    e.preventDefault();
    let form = document.forms['getPokemonForm'];
    number_per_page_option = document.forms['getPokemonForm']['pokemonPerPage'].value;
    let reverse = document.forms['getPokemonForm']['checkbox'].checked;
    pokemon_array = new Array();
    get_pokemon(number_per_page_option, reverse);
}
load_button.addEventListener('click', get_form);



next_page = () => {
    current_page += 1;
    api_limit = change;
    api_offset = change;
    get_pokemon();
}

previous_page = () => {
    //GET FORM DATA
    current_page -= 1;
    page_view();
}

first_page = () => {
    current_page = 1;
    page_view();
}

last_page = () => {
    console.log(number_of_pages);
    current_page = number_of_pages;
    page_view();
}

/** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/