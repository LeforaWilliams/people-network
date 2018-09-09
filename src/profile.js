import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios.js";
import { Link } from "react-router-dom";

{
    /*click handler on bio button
    if bio is null--> show buuton if not show bio with edit button
    > fetch bio in component did mount in App component
    > set the state with the fetched information
    >*/
}

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
                    {bio ? (
                        <div className="bio-content-wrap">
                            <p className="bio-content"> {bio} </p>
                            <p className="edit-bio" onClick={toggleBio}>
                                {" "}
                                Edit bio
                            </p>
                        </div>
                    ) : (
                        <p onClick={toggleBio}>Add a bio</p>
                    )}

                    {showBio && (
                        <textarea
                            className="bio-text-box"
                            onKeyDown={this.setBio}
                            defaultValue={bio}
                        />
                    )}

                    <div>
                        <img src={imageUrl} />
                    </div>
                </div>
            </div>
        );
    }
}
