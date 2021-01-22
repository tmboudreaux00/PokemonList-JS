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
let current_page, first_button, default_limit, default_offset, default_sort, get_10, get_20, get_50, get_100, get_all, get_limit, get_reverse, last_button, limit, next_button, number_of_pages, number_per_page, 
    offset, page, previous_button, pokedex, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_info,
    pokemon_name, pokemon_types, reverse, reverse_record, sort_by_id, sort_method, sort_option, type;
    
    
    //FUNCTION INIT
    let append_pokemon, check, div, first_page, get_form, get_number_of_pages, get_pokemon, get_pokemon_type, get_user_selection, last_page, limiter, load_button, next_page, open_pokeball, page_view, 
    pokemon_id_num, pokemon_list, previous_page, set_limit, sort_pokemon, sorter, throw_pokeball;
    
    div = () => { return document.createElement('div'); }
    
    pokedex = document.querySelector('#pokedex');
    

limiter = document.forms['getPokemonForm']['pokemonPerPage'];
first_button = document.querySelector("#firstPage");
last_button = document.querySelector("#lastPage");
load_button = document.querySelector('#loadButton');
next_button = document.querySelector("#nextPage");
previous_button = document.querySelector("#previousPage");

sort_by_id = 'id';

get_10 = 10;
get_20 = 20;
get_50 = 50;
get_100 = 100;
get_all = 151;

current_page = 0;
number_of_pages = 0;

let check_load = false;
let limit_record;

/** CONSTRUCTION ZONE */

default_sort = sort_by_id;
sort_option = sort_by_id; //USER OPTION --- ONLY ID AVAILABLE --- FUTURE SORT A - Z?

let test_func = () => {
    console.log(current_page);
}



/** END CONSTRUCTION ZONE */


pokemon_list = (limit, offset, reverse) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
    .then(response => response.json())
    .then(pokemon_list => {
        pokemon_list.results.forEach(pokemon => {
            throw_pokeball(pokemon, reverse, limit);
        })
    })
}
   
throw_pokeball = (pokemon, reverse, limit) => {

    let pokemon_url = pokemon.url;
    fetch(pokemon_url)
    .then(response => response.json())
    .then(pokemon_card_data => {
    open_pokeball(pokemon_card_data, reverse, limit);

    })
}

open_pokeball = (pokemon_data, reverse, limit) => {
                    
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
    sorter(pokemon_array, reverse, limit);
}

get_pokemon_type = (types, pokemon_types) => {
    types.forEach( t => {
        type = div();
        type.innerText = t ['type']['name'];
        pokemon_types.append(type);
    })
}

sorter = (pokemon_array, reverse, limit) => {
    let sort_id;
    switch (true) {
        case (sort_option === sort_by_id):
            sort_id = pokemon_array.sort((a, b) => {
                a = Number(a.getElementsByClassName('pokemonIdDisplay')[0].id);
                b = Number(b.getElementsByClassName('pokemonIdDisplay')[0].id);
                
                return a < b ? - 1 : a > b ? + 1 : 0;
            });
            
            if (reverse === true) {
                sort_method = sort_id.reverse();
                break;
            } else { 
                sort_method = sort_id;
                break;
            }
    }
    append_pokemon(sort_method, limit)
    check(); 
}

append_pokemon = (pokemon_array, limit) => {
    let num_rows = (Math.ceil(limit / 5));
    let row;
    pokemon_array.forEach((p, i) => {
        for (let j = 1; j < (num_rows + 1); j++){
            row = document.getElementById(`row${j}`);
            row.className = 'd-flex';
            if (Math.ceil((i + 1) / 5) === j) {
                row.append(p)
            }
        }
    }) 
}

    get_number_of_pages = (limit) => {
   number_of_pages = Math.ceil(get_all / limit);
}

check = () => {
    next_button.disabled = current_page == number_of_pages ? true : false;
    previous_button.disabled = current_page == 1 ? true : false;
    first_button.disabled = current_page == 1 ? true : false;
    last_button.disabled = current_page == number_of_pages ? true : false;
}

//CLEAR #POKEDEX INNER HTML AND RENDER VIEW
page_view = (limit, offset, reverse) => {
    pokedex.innerHTML = '';
    let row;
    let num_rows = (Math.ceil(limit / 5));

    for (let i = 0; i < num_rows; i++) {
        row = div();
        row.className = 'pokemonRow';
        row.id = `row${i + 1}`;
        pokedex.append(row);
    }
    pokemon_list(limit, offset, reverse, num_rows);
}; 

set_limit = (limit, reverse, current_page) => {
    offset = 0;
    let new_limit = limit;
    let new_offset = offset;

    /** WORK IN PROGRESS FOR REVERSE VIEWS, RESET DATA IF CHANGING LIMIT  **/

    switch(true) {
        case (current_page == number_of_pages && limit == get_10 || current_page == number_of_pages && limit == get_50):
            new_limit = 1;
            new_offset = 150;
            break;
        case (current_page == number_of_pages && limit == get_20):
            new_limit = 11;
            new_offset = 140;
            break;
        case (current_page == number_of_pages && limit == get_100):
            new_limit = get_all - limit;
            new_offset = get_100;
            break;
        default:  
            case (current_page < number_of_pages && current_page != 1):
                new_offset = (current_page - 1) * limit;
                break; 

    }


    switch(reverse) { //check to see if removing case(reverse===true) and replacing switch(true) with switch(reverse)
        case (current_page == 1):
            new_offset = get_all - limit;
            break;
        case (current_page == number_of_pages && limit == get_10):
            
            gitbreak;
        case (current_page == number_of_pages && limit == get_20):
            new_offset = get_all - limit;
            break;
        case (current_page == number_of_pages && limit == get_50):
            new_offset = get_all - limit;
            break;
        case (current_page == number_of_pages && limit == get_100):
            new_offset = get_all - limit;
            break;
        default:
            case (current_page < number_of_pages && current_page != 1):
                new_offset = (current_page - 1) * limit;
                break; 

        // case (limit === get_all): //change to default if not other case
        //     break;
    }
    limit = new_limit;
    offset = new_offset;
        // case (reverse_sort === false):
        //     case (limit === get_10):
        //         break;
        //     case (limit === get_20):
        //         api_offset = get_20;
        //         break;
        //     case (limit === get_50):
        //         api_offset = get_50;
        //         break;
        //     case (limit === get_100):
        //         api_offset = get_100;
        //         break;
        //     case (limit === get_all):
        //         api_offset = get_all;
        //         break;
  
    page_view(new_limit, new_offset, reverse)
}

get_pokemon = (limit, reverse, current_page) => {
    if (reverse === true) {
        set_limit(limit, true, current_page);
    } else {
        set_limit(limit, false, current_page);
    }
}

let load_pokedex = (current_page) => {

    limit = document.forms['getPokemonForm']['pokemonPerPage'].value;
    reverse = document.forms['getPokemonForm']['checkbox'].checked;

    if (check_load === true) {
        reverse = reverse_record;
        limit = limit_record;
    }

    pokemon_array = new Array();
    check_load = true;
    limit_record = limit;
    reverse_record = reverse; 
    get_number_of_pages(limit);
    get_pokemon(limit, reverse, current_page);

}

get_form = (e) => {
    e.preventDefault();
    check_load = false;
    current_page = 1;
    load_pokedex(current_page);
}

next_page = (e) => {
    e.preventDefault();
    current_page += 1;
    load_pokedex(current_page);
}


previous_page = (e) => {
    e.preventDefault();
    current_page -= 1;
    load_pokedex(current_page);
}

first_page = (e) => {
    e.preventDefault();
    current_page = 1;
    load_pokedex(current_page);
}

last_page = (e) => {
    e.preventDefault();
    current_page = number_of_pages;
    load_pokedex(current_page);
}

window.onload = () => {
    last_button.disabled = true; 
    first_button.disabled = true; 
    next_button.disabled = true; 
    previous_button.disabled = true;
}
load_button.addEventListener('click', get_form);
next_button.addEventListener('click', next_page);
previous_button.addEventListener('click', previous_page);
first_button.addEventListener('click', first_page);
last_button.addEventListener('click', last_page);
    /** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/