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
        return (
            <div onClick={this.logout} className="logout-wrap">
                <img src="/images/closed-eye.png" title="Logout" />
            </div>
        );
    }
}
