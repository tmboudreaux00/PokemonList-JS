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
let class_pokemonCard, class_pokemonIdDiv, class_pokemonName, class_pokemonTypes, current_page, default_limit, default_offset, default_sort, first_button, get_10, get_20, get_50, get_100, get_all, get_limit, get_reverse, i, j, last_button, limit, next_button, number_of_pages, number_per_page, 
    offset, page, previous_button, pokedex, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_info,
    pokemon_name, pokemon_types, reverse, reverse_record, sort_by_id, sort_method, sort_option, type;
    let id_array;
    let name_array;
    let type_array;
    let search_bar;
    let new_type_array;
    let check_search;
    search_bar = document.getElementById('searchBar');
    //FUNCTION INIT
let append_pokemon, check, div, first_page, get_form, get_number_of_pages, get_pokemon, get_pokemon_type, get_user_selection, last_page, limiter, load_button, next_page, open_pokeball, page_view, 
pokemon_id_num, pokemon_list, previous_page, set_limit, sort_pokemon, sorter, throw_pokeball;
let pokemon_add_class, pokemon_remove_class;    


div = () => { return document.createElement('div'); }

pokedex = document.querySelector('#pokedex');

limiter = document.forms['getPokemonForm']['pokemonPerPage'];
first_button = document.getElementById("firstPage");
last_button = document.getElementById("lastPage");
load_button = document.getElementById('loadButton');
next_button = document.getElementById("nextPage");
previous_button = document.getElementById("previousPage");

class_pokemonCard = document.getElementsByClassName('pokemonCard');
class_pokemonIdDiv = document.getElementsByClassName('pokemonIdDiv');
class_pokemonName = document.getElementsByClassName('pokemonName');
class_pokemonTypes = document.getElementsByClassName('pokemonTypesDiv');

sort_by_id = 'id';

get_10 = 10;
get_20 = 20;
get_50 = 50;
get_100 = 100;
get_all = 151;

current_page = 0;
number_of_pages = 0;
let search_array;
let check_load
check_load = false;
check_search = false;
let limit_record;
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

let init_search = () => {

    if (!check_search) {
        current_page = 1;
        check_search = true;
        check_load = false;
        load_pokedex(current_page, check_load, check_search);
    }
    //test_func(limit, offset, reverse); //
}
search_bar.addEventListener('click', init_search); //if search.val != null/undefined, ignore

// let id_pokemon, id_pokemonName;
//id_pokemon = document.querySelector(`.pokemon${i}`);
//id_pokemonName = document.querySelector(`.${p.name}`);
 
let search_pokemon = () => { //KEYUP EVENTS
    
    //** */
    let filter;
    let id_filter;
    let name_filter;
    let type_filter;

    filter = search_bar.value.toLowerCase();
    class_pokemonName = document.getElementsByClassName('pokemonName');
    class_pokemonCard = pokedex.getElementsByClassName('pokemonCard');
    class_pokemonTypes = document.getElementsByClassName('pokemonTypesDiv');
    class_pokemonIdDiv = document.getElementsByClassName('pokemonIdDiv');

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
    
    // } else if (p === 'type') {
    //     for (i = 0; i < class_pokemonCard.length; i++) {

    //         pFilter = class_pokemonTypes[i].textContent || class_pokemonName[i].textContent;
    //         if (pFilter.toLowerCase().indexOf(filter) > - 1) {
    //             class_pokemonCard[i].style.display = '';
    //         } else {
    //             class_pokemonCard[i].style.display = 'none'
    //         }
    // }
    
    // for (i = 0; i < class_filterTag.length; i++) {
    //     if (class_pokemonCard[i] != undefined) {
    //         name_tag = class_pokemonCard[i].getElementsByClassName('filterTag')[0];
    //     }
    //     //console.log(name_tag);
    //     for (j = 1; j < 3; j++) {
    //         if (class_pokemonCard[i] != undefined) {
    //             new_tag = class_pokemonCard[i].getElementsByClassName('filterTag')[j];
    //             if (new_tag != undefined) {
    //                 type_tag = new_tag;
    //             }    
    //         }
    //     }
    //     console.log(name_tag);
    //     console.log(type_tag);
    // }
    //   pokemon_remove_class(class_filterTag[i], "show");
    //   if (class_filterTag[i].className.indexOf(p) > -1) pokemon_add_class(class_FilterTag[i], "show");
    // }
    
    // for (i = 0; i < class_filterTag.length; i++) {
    //     tag = class_filterTag[i];

    //     let pid;
    //     pid = class_pokemonCard[i].id;
    //     if (tag != undefined && pid != undefined) {
    //         pFilter = tag.innerText;
    //         console.log(pid);
            
    //         if (pFilter.toLowerCase().indexOf(filter) > -1) {
    //             //pid.style.display = "";
    //             console.log(pid);
    //         } else {
    //         //pid.style.display = "none";
            
    //     } }
    //    // console.log(tag);
    // }  
}

pokemon_add_class = (element, name) => {
    let arr1, arr2;
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
    let arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(' ');
}

search_bar.addEventListener('keyup', search_pokemon)


/** END CONSTRUCTION ZONE */

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

get_form = (e) => {
    e.preventDefault();
    check_load = false;
    check_search = false;
    current_page = 1;
    load_pokedex(current_page, check_load, check_search);
}

let load_pokedex = (current_page, check_load, check_search) => {

    limit = document.forms['getPokemonForm']['pokemonPerPage'].value;
    reverse = document.forms['getPokemonForm']['checkbox'].checked;

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
    let new_limit = limit;
    let new_offset = offset;

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

//CLEAR #POKEDEX INNER HTML AND RENDER VIEW
page_view = (limit, offset, reverse) => {
    pokedex.innerHTML = '';
    let row;
    let num_rows = (Math.ceil(limit / 5));

    for (i = 0; i < num_rows; i++) {
        row = div();
        row.className = 'pokemonRow';
        row.id = `row${i + 1}`;
        pokedex.append(row);
    }
    pokemon_list(limit, offset, reverse, num_rows);
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
    pokemon_card_photo.className = 'pokemonPhoto'
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

    pokemon_id.id = pokemon_id_num();
    pokemon_id.className = 'pokemonIdDiv';
    pokemon_id.innerText = pokemon_id.id;
    pokemon_info.id = 'pokemon' + pokemon_id.id;
    pokemon_name = div();
    pokemon_name.className = 'filterTag pokemonName';
    pokemon_name.id = `${pokemon_data.name}`;
    pokemon_name.innerText = `${pokemon_data.name}`;
    id_array.push(pokemon_id.innerText);
    name_array.push(pokemon_name.innerText);

    pokemon_types = div();
    pokemon_types.className = 'filterTag pokemonTypesDiv';

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
        type.className = `pokemonType type${i + 1} ${t ['type']['name']}`;
        type.innerText = t ['type']['name'];
        pokemon_types.append(type);
        new_type_array.push(`${t ['type']['name']}`);
    });
    type_array = [...new Set(new_type_array)]
};

sorter = (pokemon_array, reverse, limit) => {
    let sort_id;
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
    let num_rows = (Math.ceil(limit / 5));
    let row;

    search_array = new Array();

    pokemon_array.forEach((p, i) => {
        search_array.push(p.childNodes);
        for (j = 1; j < (num_rows + 1); j++){
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