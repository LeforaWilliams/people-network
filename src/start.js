import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./welcome.js";
import { App } from "./app.js";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers.js";
import { Provider } from "react-redux";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

//have to call render once to see all of our code
ReactDOM.render(elem, document.querySelector("main"));
