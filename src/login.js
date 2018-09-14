import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class Login extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("Handlechange is running");
        this[e.target.name] = e.target.value;
    }

    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
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
                <h2> You can Log In here </h2>
                {this.state.error && (
                    <div className="error">
                        Something went wrong. Please try again!
                    </div>
                )}
                <div className="block-input-style">
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                        autocomplete="off"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                    />
                </div>

                <div>
                    <button onClick={this.submit}>Log in </button>

                    <p>
                        <Link to="/">Register here</Link> if you dont have an
                        account yet
                    </p>
                </div>
            </div>
        );
    }
}

/*
Use react router to change URL
> create hash router component
*/
