import React from "react";
import axios from "./axios.js";

export default class Logout extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.logout = this.logout.bind(this);
    }

    logout() {
        axios.get("/logout").then(() => {
            location.replace("/");
        });
    }

    render() {
        return <p onClick={this.logout}> Logout </p>;
    }
}
