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
        console.log("Data I get back from the other user", res);
        if (res.data.self) {
            return this.props.history.push("/");
        }

        this.setState({
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            imageUrl: res.data.profilepic,
            bio: res.data.bio
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
                {/*<h1> 0THER PR0FILE </h1>*/}
                <div className="bio-section">
                    <h1>
                        {this.state.firstname} {this.state.lastname}
                    </h1>
                    {/*<h2>  {this.state.firstname} {this.state.lastname} </h2>*/}
                    <div className="profile-image flex-container">
                        <img src={this.state.imageUrl} />
                    </div>
                    <FriendButton
                        otherUserID={this.props.match.params.userId}
                    />
                    <p className="other-bio">{this.state.bio}</p>
                    <img src="/images/paper-plane.svg" />
                </div>
                <h2 className="bottom-top">Location EARTH</h2>
            </div>
        );
    }
}
