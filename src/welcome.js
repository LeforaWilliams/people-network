import React from "react";
import ReactDOM from "react-dom";
import { Registration } from "./registration.js";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Homepage } from "./homepage.js";
import { Login } from "./login.js";
// Login component will be the wrap for all pages when we are logged in
//progile pic component , should also have a pic for when they don't have one
//store image in users table url for image (don't put the url of default image into database, instead leave coloum null test if it'S null and  if it )
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
