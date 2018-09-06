import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.firstname}</h1>
                <img
                    onClick={this.props.uploaderModalFunction}
                    src={this.props.imageUrl}
                    alt={`This is the profile picture of ${
                        this.props.firstname
                    } ${this.props.lastname}`}
                />
            </div>
        );
    }
}
