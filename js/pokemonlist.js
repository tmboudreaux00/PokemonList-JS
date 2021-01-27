"use strict"

//import * as html_tags from './html_tags.js';
//CORS ISSUE - WILL COME BACK LATER AND REWORK IMPORTS

// let create_el = html_tags.create_el;
// let get_el = html_tags.get_el;

//VAR INIT
let arr1, arr2, check_load, check_search, class_pokemonCard, class_pokemonIdDiv, class_pokemonName, class_pokemonTypes, current_page, default_sort, filter, first_button, i, id, id_array, 
    id_filter, j, last_button, limit, limit_record, name_array, name_filter, new_limit, new_offset, new_type_array, next_button, num_rows, number_of_pages, 
    offset, page, previous_button, pokedex, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_info,
    pokemon_name, pokemon_types, pokemon_url, reverse, reverse_record, row, search_array, search_bar, sort_by_id, sort_id, sort_method, sort_option, type, type_array, type_filter;
    
//FUNC INIT
let append_pokemon, ascend_list, check, descend_list, disable_page_buttons, div, first_page, get_form, get_number_of_pages, get_pokemon, get_pokemon_type, last_page, load_button, 
    load_pokedex,
    next_page, open_pokeball, page_view, 
    pokemon_add_class, pokemon_remove_class, pokemon_id_num, pokemon_list, previous_page, search_init, search_pokemon, set_limit, sorter, throw_pokeball;   

const get_10 = 10;
const get_20 = 20;
const get_50 = 50;
const get_100 = 100;
const get_all = 151;

div = () => { return document.createElement('div'); }

pokedex = document.querySelector('#pokedex');
first_button = document.getElementById('firstPage');
last_button = document.getElementById('lastPage');
load_button = document.getElementById('mbInnerButton');
next_button = document.getElementById("nextPage");
previous_button = document.getElementById("previousPage");

search_bar = document.getElementById('searchBar');

sort_by_id = 'id';

current_page = 1;
number_of_pages = 1;
check_load = false;
check_search = false;
reverse = false;

id_array = new Array();
name_array = new Array();
pokemon_array = new Array();
type_array = new Array();
new_type_array = new Array();

/** CONSTRUCTION ZONE */

default_sort = sort_by_id;
sort_option = sort_by_id; //USER OPTION --- ONLY ID AVAILABLE --- FUTURE SORT A - Z?

let test_func = (limit, offset, reverse) => {

    console.log(`${limit} ${offset} ${reverse}`);
}

ascend_list = (e) => {
    e.preventDefault();
    reverse = false;
    check_search = false;
    if (!check_search && !check_load) { //if not a search func// if not a previous load
            get_form(e); // get form data
    } else { // not a search func but is a previous load
        load_pokedex(current_page, check_load, check_search);
    }
}

descend_list = (e) => {
    e.preventDefault();
    reverse = true;
    check_search = false;
    if (!check_search && !check_load) { //if not a search func// if not a previous load
        get_form(e); // get form data
    } else { // not a search func but is a previous load
        load_pokedex(current_page, check_load, check_search);
    }
}

/** END CONSTRUCTION ZONE */

search_init = () => {
    if (check_search === false) {
        reverse = false;
        current_page = 1;
        check_load = false;
        check_search = true;
        load_pokedex(current_page, check_load, check_search);
    }
}
 
search_pokemon = () => { //KEYUP EVENTS
    reverse = false;
    class_pokemonCard = pokedex.getElementsByClassName('pokemonCard');
    class_pokemonIdDiv = document.getElementsByClassName('pokemonIdDiv');
    class_pokemonName = document.getElementsByClassName('pokemonName');
    class_pokemonTypes = document.getElementsByClassName('pokemonTypesDiv');
    
    filter = search_bar.value.toLowerCase();
    
    for (i = 0; i < class_pokemonCard.length; i++) {
        id_filter = class_pokemonIdDiv[i].textContent || class_pokemonIdDiv[i].innerHTML;
        name_filter = class_pokemonName[i].textContent || class_pokemonName[i].innerHTML;
        type_filter = class_pokemonTypes[i].textContent || class_pokemonTypes[i].innerHTML;
        if (id_filter.toLowerCase().indexOf(filter) > - 1 || name_filter.toLowerCase().indexOf(filter) > - 1 || type_filter.toLowerCase().indexOf(filter) > - 1) {
            class_pokemonCard[i].style.display = '';
        } else {
            class_pokemonCard[i].style.display = 'none'
        }
    }
}

pokemon_add_class = (element, name) => {
    arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    
    console.log(element);
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

pokemon_remove_class = (element, name) => {
    arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(' ');
}

/**
 * ASCEND LIST
 * 
 * DESCEND LIST
 */

first_page = (e) => {
    e.preventDefault();
    current_page = 1;
    load_pokedex(current_page, check_load, check_search);
}

last_page = (e) => {
    e.preventDefault();
    current_page = number_of_pages;
    load_pokedex(current_page, check_load, check_search);
}

next_page = (e) => {
    e.preventDefault();
    current_page += 1;
    load_pokedex(current_page, check_load, check_search);
}

previous_page = (e) => {
    e.preventDefault();
    current_page -= 1;
    load_pokedex(current_page, check_load, check_search);
}

get_form = (e) => {
    if (!check_load) {
        e.preventDefault();
    }
    check_load = false;
    check_search = false;
    current_page = 1;
    load_pokedex(current_page, check_load, check_search);
}

load_pokedex = (current_page, check_load, check_search) => {
    console.log(reverse);
    limit = document.forms['getPokemonForm']['pokemonPerPage'].value;

    if (check_load) {
        reverse = reverse_record;
        limit = limit_record;
    } else if (check_search) {
        limit = get_20; //change to get_all
    }

    pokemon_array = new Array();
    check_load = true;
    limit_record = limit;
    reverse_record = reverse; 
    get_number_of_pages(limit);
    get_pokemon(limit, reverse, current_page);
}

get_pokemon = (limit, reverse, current_page) => { //possibly remove function and move set_limit call to load_pokedex
    if (reverse === true) {
        set_limit(limit, true, current_page);
    } else {
        set_limit(limit, false, current_page);
    }
}

set_limit = (limit, reverse, current_page) => {
    offset = 0;
    new_limit = limit;
    new_offset = offset;

    if (reverse === false) {
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
    } else {
        switch(true) {
            case (current_page == 1):
                new_offset = get_all - limit;
                break;
            case (current_page == number_of_pages && limit == get_10 || current_page == number_of_pages && limit == get_50):
                new_limit = 1;
                new_offset = 0;
                break;
            case (current_page == number_of_pages && limit == get_20):
                new_limit = 11;
                new_offset = 0;
                break
            case (current_page == number_of_pages && limit == get_100):
                new_limit = get_all - limit;
                new_offset = 0;
                break;
            default:
                case (current_page < number_of_pages && current_page != 1):
                    new_offset = get_all - (current_page * limit);
                    break; 
        }
    }
    limit = new_limit;
    offset = new_offset;
    page_view(new_limit, new_offset, reverse)
}

// page_view = (limit, offset, reverse) => {
//     pokedex.innerHTML = '';
//     num_rows = (Math.ceil(limit / 5));

//     for (i = 0; i < num_rows; i++) {
//         row = div();
//         row.className = 'pokemonRow';
//         row.id = `row${i + 1}`;
//         pokedex.append(row);
//     }
//     pokemon_list(limit, offset, reverse);
// }; 

page_view = (limit, offset, reverse) => { //TESTING FOR BOOTSTRAP
    pokedex.innerHTML = '';
    num_rows = (Math.ceil(limit / 5));

    for (i = 0; i < num_rows; i++) {
        row = div();
        row.className = 'pokemonRow';
        row.id = `row${i + 1}`;
    }
    pokemon_list(limit, offset, reverse);
}; 

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

    pokemon_url = pokemon.url;
    fetch(pokemon_url)
    .then(response => response.json())
    .then(pokemon_card_data => {
        open_pokeball(pokemon_card_data, reverse, limit);
    });
}

open_pokeball = (pokemon_data, reverse, limit) => {
                    
    pokemon_info = div();
    pokemon_info.className = `pokemonCard`;

    pokemon_card_photo = div();
    pokemon_card_photo.className = 'pokemonPhoto'
    pokemon_card_photo_url = pokemon_data.sprites.front_default;
    pokemon_card_photo.innerHTML = `<img src="${pokemon_card_photo_url}" alt="photo of ${pokemon_data.name}" />`;

    pokemon_id = div();
    pokemon_id_num = () => {
        id = pokemon_data.id;
        if (id < 10)
            id = `00${id}`;
        else if (id > 9 && id < 100)
            id = `0${id}`;
        return id;
    }

    pokemon_id.id = pokemon_id_num();
    pokemon_id.className = 'pokemonIdDiv';
    pokemon_id.innerText = pokemon_id.id;
    pokemon_info.id = 'pokemon' + pokemon_id.id;
    pokemon_name = div();
    pokemon_name.className = 'pokemonName';
    pokemon_name.id = `${pokemon_data.name}`;
    pokemon_name.innerText = `${pokemon_data.name}`;
    id_array.push(pokemon_id.innerText);
    name_array.push(pokemon_name.innerText);

    pokemon_types = div();
    pokemon_types.className = 'pokemonTypesDiv';

    get_pokemon_type(pokemon_data.types, pokemon_types);

    pokemon_info.append(
        pokemon_card_photo,
        pokemon_id,
        pokemon_name,
        pokemon_types
    ); 
    pokemon_array.push(pokemon_info);
    sorter(pokemon_array, reverse, limit);
}

get_pokemon_type = (types, pokemon_types) => {
    types.forEach( (t, i) => {
        type = div();
        type.className = `border-radius-5 pokemonType type${i + 1} ${t ['type']['name']}`;
        type.innerText = t ['type']['name'];
        pokemon_types.append(type);
        new_type_array.push(`${t ['type']['name']}`);
    });
    type_array = [...new Set(new_type_array)]
};

sorter = (pokemon_array, reverse, limit) => {
    sort_id;
    switch (true) {
        case (sort_option === sort_by_id):
            sort_id = pokemon_array.sort((a, b) => {
                a = Number(a.getElementsByClassName('pokemonIdDiv')[0].id);
                b = Number(b.getElementsByClassName('pokemonIdDiv')[0].id);
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
    pokemon_array.forEach((p, i) => {
        pokedex.append(p);
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

disable_page_buttons = () => {
    last_button.disabled = true; 
    first_button.disabled = true; 
    next_button.disabled = true; 
    previous_button.disabled = true;
}

window.onload = () => {
    disable_page_buttons();
}

//MOVE TO HTML

load_button.addEventListener('click', get_form);
next_button.addEventListener('click', next_page);
previous_button.addEventListener('click', previous_page);
first_button.addEventListener('click', first_page);
last_button.addEventListener('click', last_page);
search_bar.addEventListener('click', search_init);
search_bar.addEventListener('keyup', search_pokemon)

    /** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/