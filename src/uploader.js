import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submitProfileImage = this.submitProfileImage.bind(this);
    }

    submitProfileImage(e) {
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append("file", file);
        axios
            .post("/picupload", formData)
            .then(url => {
                console.log(url.data.imageurl);
                this.props.updateImage(url.data.imageurl);
            })
            .catch(function(err) {
                console.log("ERROR IN CATCH UPLOADER COMPONENT", err);
            });
    }

    render() {
        return (
            <div>
                <h1> Upload your image here</h1>
                <input
                    onChange={this.submitProfileImage}
                    name="imageUpload"
                    placeholder="Upload Image"
                    type="file"
                    accept="image/*"
                />
            </div>
        );
    }
}
