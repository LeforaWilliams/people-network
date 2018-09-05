import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import { Homepage } from "./homepage.js";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <Homepage />;
}

//have to call render once to see all of our code
ReactDOM.render(elem, document.querySelector("main"));

/*
>three componenets: registration, welcome, logo
> registration has to collect user data and reload page when button is clicked or show error message

> only render welcome page when logged out on login show logo
>determine wheter or not logged in with the URL and store in request . session

> we chek in the server wheter or not they are logged in

>registration almost same as petiton but when button clikc component gathers info by adding listeners on the fields
*/
