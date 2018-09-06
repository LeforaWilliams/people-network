import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import { ProfilePic } from "./pic.js";
import { Uploader } from "./uploader.js";

//Import all the components that you want to see in app

export class App extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.makeUploaderVisible = this.makeUploaderVisible.bind(this);
        this.updateImage = this.updateImage.bind(this);
    }

    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }

    makeUploaderVisible() {
        this.setState({
            uploaderVisible: true
        });
    }

    updateImage(imageUrl) {
        this.setState({
            imageUrl: imageUrl,
            uploaderVisible: false
        });
    }

    render() {
        if (!this.state.userID) {
            return (
                <div>
                    Loading...Dont have the data yet. I guess we can also add a
                    loading screen here{" "}
                </div>
            );
        }

        if (!this.state.imageUrl) {
            this.state.imageUrl =
                "http://www.psdgraphics.com/file/dark-gradient.jpg";
        }

        return (
            <div>
                <ProfilePic
                    uploaderModalFunction={this.makeUploaderVisible}
                    imageUrl={this.state.imageUrl}
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    userID={this.state.userID}
                />

                {this.state.uploaderVisible && (
                    <Uploader updateImage={this.updateImage} />
                )}
            </div>
        );
    }
}
