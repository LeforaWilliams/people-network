import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";
import { FriendButton } from "./freindship-button.js";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    async componentDidMount() {
        const res = await axios.get(
            `/get-user/${this.props.match.params.userId}`
        );
        if (res.data.self) {
            console.log("IN SELF TRUE");
            return this.props.history.push("/");
        }

        this.setState({
            firstname: res.data.firstname,
            imageUrl: res.data.profilepic
        });
    }

    componenetWillRecieveProps(nextProps) {
        if (nextProps.match.params.userId != this.props.match.params.userId) {
            axios.get(`/get-user/${nextProps.match.params.userId}`);
        }
    }

    render() {
        if (!this.state.imageUrl) {
            this.state.imageUrl =
                "http://www.psdgraphics.com/file/dark-gradient.jpg";
        }

        return (
            <div className="other-profile-wrap">
                <h1> 0THER PR0FILE </h1>
                <p> USER {this.state.firstname} </p>
                <img src={this.state.imageUrl} />
                <FriendButton otherUserID={this.props.match.params.userId} />
            </div>
        );
    }
}
