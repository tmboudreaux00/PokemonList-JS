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
let list ;

let default_sort, get_pokemon, get_pokemon_type, page_view, pokedex, pokemon_array, pokemon_card_data, pokemon_card_photo, pokemon_card_photo_url, pokemon_id, pokemon_id_num, pokemon_info, pokemon_list, 
    pokemon_name, pokemon_types, sort_option, sort_pokemon,type;

pokedex = document.getElementById('pokedex');
pokemon_array = [];
default_sort = 'reverse_id';
let numberPerPageOption = 10; //USER OPTION

let api_limit = 10;
let api_offset = 0;

pokemon_list = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${api_limit}&offset=${api_offset}`)
    .then(response => response.json())
    .then(pokemon_list => {
        pokemon_list.results.forEach(pokemon => {
            throw_pokeball(pokemon);
        })
    })
}
   
let throw_pokeball = (pokemon) => {

    let pokemon_url = pokemon.url;
    fetch(pokemon_url)
    .then(response => response.json())
    .then(pokemon_card_data => {

    open_pokeball(pokemon_card_data);

    })
}

let open_pokeball = (pokemon_data) => {
                    
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
        else if (id >= 10 && id < 100)
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
    sorter(pokemon_array);
}

get_pokemon_type = (types, pokemon_types) => {
    types.forEach( t => {
        type = div();
        type.innerText = t ['type']['name'];
        pokemon_types.append(type);
    })
}

let sort_method;
let sorter = (pokemon_array) => {
    let sort_option = default_sort;
    let sort_id, sort_id_reverse;

    switch (true) {
        case (sort_option === 'id'):

            sort_id = pokemon_array.sort((a, b) => {
                    a = Number(a.getElementsByClassName('pokemonIdDisplay')[0].id);
                    b = Number(b.getElementsByClassName('pokemonIdDisplay')[0].id);
                    return a < b ? - 1 : a > b ? + 1 : 0;
            });
            sort_method = sort_id;
        
        case (sort_option === 'reverse_id'):

            sort_id_reverse = pokemon_array.sort((a, b) => {
                a = Number(a.getElementsByClassName('pokemonIdDisplay')[0].id);
                b = Number(b.getElementsByClassName('pokemonIdDisplay')[0].id);
                return a < b ? - 1 : a > b ? + 1 : 0;
        }).reverse();
        sort_method = sort_id_reverse;
    }   
    
    numberOfPages = getNumberOfPages(sort_method);
    loadList(sort_method);
    append_pokemon(sort_method);
}

let append_pokemon = (sort_method) => {
    sort_method.forEach(p => {
        pokedex.appendChild(p);
    }) 
}

let pageList = new Array();

let currentPage = 1;
let numberPerPage = numberPerPageOption;//USER SELECTION = numberPerPageOption
let numberOfPages = 1;

let next_button, previous_button, first_button, last_button;

let getNumberOfPages = (list) => {
    return Math.ceil(list.length / numberPerPage);
}

let nextPage = () => {
    currentPage += 1;
    loadList();
}

let previousPage = () => {
    currentPage -= 1;
    loadList();
}

let firstPage = () => {
    currentPage = 1;
    loadList();
}

let lastPage = () => {
    currentPage = numberOfPages;
    loadList();
}

let loadList = (sorted_list) => {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;
    pageList = sorted_list.slice(begin, end);
    check();
}

// let drawList = () => {//delete
//     for (let r = 0; r < pageList.length; r++) {
//         document.getElementById("list").innerHTML += pageList[r] + "<br/>";
//     }
// }

let check = () => {
    document.getElementById("nextPage").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previousPage").disabled = currentPage == 1 ? true : false;
    document.getElementById("firstPage").disabled = currentPage == 1 ? true : false;
    document.getElementById("lastPage").disabled = currentPage == numberOfPages ? true : false;
}

// let load = () => {
//     loadList();
// }



//CLEAR #POKEDEX INNER HTML AND RENDER VIEW
page_view = () => { 
    pokedex.innerHTML = '';
    pokemon_list();
    // load();
}; 
page_view();
/** 
 * Get the list of Pokemon from the pokemon api ​https://pokeapi.co/
 * Should have a screen that lists pokemon in a Grid Style
 * Should have a screen that shows an image of the pokemon and their informationin an intuitive way
 * Implement a search bar that filters pokemon by name
 **/