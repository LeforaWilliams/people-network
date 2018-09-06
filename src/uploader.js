import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitProfileImage() {
        axios.post("/user", {
            imageUrl: this.state.imageUrl
        });
    }

    render() {
        return (
            <div>
                <h1> Upload your image here</h1>
                <input
                    onClick={this.props.updateImage}
                    name="imageUpload"
                    placeholder="Upload Image"
                    type="file"
                    accept="image/*"
                />
            </div>
        );
    }
}
