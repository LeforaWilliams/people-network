import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import { ProfilePic } from "./pic.js";
import { Uploader } from "./uploader.js";
import { Profile } from "./profile.js";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./OtherProfile.js";
import Friends from "./friends.js";
import Logout from "./logout.js";
import Online from "./online.js";
import Private from "./private-chat.js";

export class App extends React.Component {
    constructor() {
        super();

        this.state = {};
        this.makeUploaderVisible = this.makeUploaderVisible.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.updateBio = this.updateBio.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
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

    toggleBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }

    updateBio(newBio) {
        this.setState({ bio: newBio });
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

        const { firstname, lastname, imageUrl, bio, showBio } = this.state;

        return (
            <BrowserRouter>
                <div id="app-wrap">
                    <Logout />
                    <ProfilePic
                        uploaderModalFunction={this.makeUploaderVisible}
                        imageUrl={imageUrl}
                        firstname={firstname}
                        lastname={lastname}
                        userID={this.state.userID}
                    />

                    {this.state.uploaderVisible && (
                        <Uploader updateImage={this.updateImage} />
                    )}

                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    firstname={firstname}
                                    lastname={lastname}
                                    imageUrl={imageUrl}
                                    bio={bio}
                                    toggleBio={this.toggleBio}
                                    showBio={showBio}
                                    updateBio={this.updateBio}
                                />
                            )}
                        />
                        <Route path="/user/:userId" component={OtherProfile} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/online" component={Online} />
                        <Route exat path="/private-chat/" component={Private} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
