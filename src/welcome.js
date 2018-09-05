import React from "react";
import ReactDOM from "react-dom";
import { Registration } from "./registration.js";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Homepage } from "./homepage.js";
import { Login } from "./login.js";

export function Welcome() {
    return (
        <div id="welcome-wrap" className="flex-container">
            <h1>THIS IS THE SOCIAL NETWORK</h1>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
