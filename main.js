let button1 = document.getElementById("button1");
let ul = document.querySelector("ul");
let input = document.getElementById("To-Do");
button1.addEventListener("click", newElement);

//newElement function is to add the elements of checkbox, item, button
function newElement() {

    //this is creating checkbox button and adding some css to it.
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.style.height = "25px";
    checkbox.style.width = "25px";

    //this is my p element for the entered items with some css
    let para = document.createElement("p");
    para.innerText = input.value;
    para.style.display = "inline-block";
    para.style.padding = "1em";
    para.style.color = "#black";

    //this is my li tag created below 
    let listOfItems = document.createElement("li");
    listOfItems.style.listStyleType = "decimal";


    //making my delete button with some css 
    let del = document.createElement("button");
    del.innerText = "Delete";
    del.style.padding = "15px 32px";
    del.style.backgroundColor = "#e6a607";
    del.style.border = "none";
    del.style.color = "white";

    //if else condition for empty text box
    if (input.value == "") {
        alert("Hey Bro! Write something first!");
    } else {
        listOfItems.appendChild(checkbox);
        listOfItems.appendChild(para);
        listOfItems.appendChild(del);
        document.getElementById("To-Do").value = "";
        //li here is the child of ul
        ul.appendChild(listOfItems);
    }

    //added an event listner to see if the checkbox has been checked and then run the itemCheck function.
    checkbox.addEventListener("click", itemCheck);

    //if the item is checked, put it at the end with a text decoration of line through
    //Also I have done that bonus by making it green.
    function itemCheck() {
        if (checkbox.checked == true) {
            para.style.textDecoration = "line-through";
            ul.appendChild(listOfItems);
            para.style.color = "green";

        } else {
            para.style.textDecoration = "none";
            para.style.color = "black";
        }
    }

    //this is the event handler when del button is clicked.
    del.onclick = deleteItem;

    //Also I have again done a bonus question by adding the sound of ding
    function deleteItem() {
        listOfItems.parentNode.removeChild(listOfItems);
        let myAudio = new Audio('ding.wav');
        myAudio.play();
    }

}


//THIRD PARTY API
//added Weather API 
//Selecting elements from html file using query selector 
//Selecting search box
const searchbox = document.querySelector('.search-box');
//Selecting city from location div
let city = document.querySelector('.location .city');
//Selecting weather from current div element 
let weatherElement = document.querySelector('.current .weather');
//Selecting temperature from current div element 
let temp = document.querySelector('.current .temp');
//Selecting high and low temperature
let hilow = document.querySelector('.hi-low');
//Selecting search button
let searchButton = document.getElementById("search");
//Adding eventlistener to search button
searchButton.addEventListener('click', searchLocation);

//When the search button is clicked text from search box is sent to fetchResults function
function searchLocation() {
    fetchResults(searchbox.value);
}

//Function that gets weather data from openweathermap (https://openweathermap.org/api) site
function fetchResults(e) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=metric&APPID=14523f43734ec7c91d0223953ae0fd1b`)
        .then(weather => weather.json())
        .then(data => {
            city.innerText = `${data.name}, ${data.sys.country}`;
            temp.innerHTML = `${Math.round(data.main.temp)}<span>°c</span>`;
            weatherElement.innerText = data.weather[0].main;
            hilow.innerText = `${Math.round(data.main.temp_min)}°c / ${Math.round(data.main.temp_max)}°c`;
        })
        .catch(err => alert("Wrong City Name!!"));
}



//BROWSER API
//added drag and drop API

function dropStart(e) {
    console.log("Allowing Drop");
    e.preventDefault();
}

function drag(e) {
    console.log("drag");
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    console.log("drop");
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
}