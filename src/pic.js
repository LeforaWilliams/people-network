import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class ProfilePic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="profile-pic-wrap flex-container">
                <Link to="/friends">Friends</Link>
                <Link to="/online"> Online PEOPLE</Link>
                <Link to="/private-chat"> Private Messages </Link>
                <img
                    onClick={this.props.uploaderModalFunction}
                    src={this.props.imageUrl}
                    alt={`This is the profile picture of ${
                        this.props.firstname
                    } ${this.props.lastname}`}
                />
                {/*<p> {this.props.friendLink} </p>*/}
            </div>
        );
    }
}
