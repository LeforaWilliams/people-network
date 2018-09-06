import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class Registration extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("Handlechange is running");
        //want to capture user input and put it into the state
        //this will equal to this.name, this.surname...
        this[e.target.name] = e.target.value;
    }

    submit() {
        axios
            .post("/register", {
                email: this.email,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div>
                {this.state.error && (
                    <div className="error">
                        Something went wrong. Please try again!
                    </div>
                )}
                <input
                    placeholder="Name"
                    name="firstname"
                    onChange={this.handleChange}
                />
                <input
                    onChange={this.handleChange}
                    placeholder="Last Name"
                    name="lastname"
                />
                <input
                    onChange={this.handleChange}
                    placeholder="Email"
                    name="email"
                />
                <input
                    onChange={this.handleChange}
                    placeholder="Password"
                    name="password"
                    type="password"
                />
                <button onClick={this.submit}> Register </button>
                <p>
                    <Link to="/login">Login here</Link> if you already have an
                    account
                </p>
            </div>
        );
    }
}
