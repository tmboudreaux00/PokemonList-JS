"use strict"

let list = new Array();
let pageList = new Array();

let currentPage = 1;
let numberPerPage = 10;//USER SELECTION = numberPerPageOption
let numberOfPages = 1;

let next_button, previous_button, first_button, last_button;

let makeList = () => {
    for (let x = 0; x < 200; x++) {
        list.push(x);
    }
    numberOfPages = getNumberOfPages();
}

let getNumberOfPages = () => {
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

let loadList = () => {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
}

let drawList = () => {
    document.getElementById("list").innerHTML = "";
    for (let r = 0; r < pageList.length; r++) {
        document.getElementById("list").innerHTML += pageList[r] + "<br/>";
    }
}

let check = () => {
    document.getElementById("nextPage").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previousPage").disabled = currentPage == 1 ? true : false;
    document.getElementById("firstPage").disabled = currentPage == 1 ? true : false;
    document.getElementById("lastPage").disabled = currentPage == numberOfPages ? true : false;
}

let load = () => {
    makeList();
    loadList();
}

load();