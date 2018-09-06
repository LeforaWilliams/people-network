import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import { App } from "./app.js";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

//have to call render once to see all of our code
ReactDOM.render(elem, document.querySelector("main"));
