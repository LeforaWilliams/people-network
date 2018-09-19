import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.setBio = this.setBio.bind(this);
    }

    setBio(e) {
        {
            /*
            console.log("IN SET BIO", e.target.value);
            when logging e.target.value on keydown, the log displays a on letter delay. Why?*/
        }
        if (e.which === 13) {
            axios
                .post("/bioupload", { bio: e.target.value })
                .then(newBio => {
                    this.props.updateBio(newBio.data.newBio);
                    this.props.toggleBio();
                })
                .catch(err => {
                    console.log(
                        "ERROR IN BIOUPLOAD POST IN PROFILE COMPONENT",
                        err
                    );
                });
        }
    }

    render() {
        const {
            toggleBio,
            showBio,
            bio,
            firstname,
            lastname,
            imageUrl,
            updateBio
        } = this.props;

        return (
            <div>
                <div className="bio-section">
                    <h1>
                        {firstname} {lastname}
                    </h1>
                    <div className="profile-image flex-container">
                        <img src={imageUrl} />
                    </div>
                    {bio ? (
                        <div className="bio-content-wrap">
                            <p className="bio-content"> {bio} </p>
                            <img
                                src="/images/edit.svg"
                                className="edit-bio"
                                onClick={toggleBio}
                                title="Edit Bio"
                                id="pencil"
                            />
                        </div>
                    ) : (
                        <p onClick={toggleBio}>Add a bio</p>
                    )}

                    {showBio && (
                        <textarea
                            className="bio-text-box "
                            onKeyDown={this.setBio}
                            defaultValue={bio}
                        />
                    )}
                </div>
                <h2 className="bottom-top">
                    Location {this.props.location || "EARTH"}{" "}
                </h2>
            </div>
        );
    }
}
