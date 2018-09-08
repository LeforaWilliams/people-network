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
        console.log("IN SET BIO", e);
    }

    render() {
        const {
            setBio,
            toggleBio,
            showBio,
            bio,
            firstname,
            lastname,
            imageUrl
        } = this.props;

        return (
            <div>
                <div className="bio-section">
                    <h1>
                        {firstname} {lastname}
                    </h1>

                    {showBio ? (
                        <textarea
                            onChange={setBio}
                            onKeyDown={setBio}
                            defaultValue={bio}
                        />
                    ) : (
                        <p onClick={toggleBio}>Add a bio</p>
                    )}

                    <div>
                        <img src={imageUrl} />
                    </div>
                </div>
            </div>
        );
    }
}
