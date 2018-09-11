import React from "react";
import axios from "./axios.js";
import { Link } from "react-router-dom";

export class FriendButton extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.makeRequest = this.makeRequest.bind(this);
        this.changeButtonText = this.changeButtonText.bind(this);
    }

    componentDidMount() {
        axios
            .get("/check-status", {
                params: { otherUserID: this.props.otherUserID }
            })
            .then(data => {
                console.log("IN COMPONENET DID MOUNT", data);
                this.setState({
                    status: data.status,
                    receiver: data.receiver,
                    sender: data.sender
                });
            });
    }

    changeButtonText() {
        this.setState({
            buttonChanged: true
        });
    }

    makeRequest() {
        if (!this.state.status) {
            axios
                .post("/make-request", { userID: this.props.otherUserID })
                .then(data => {
                    this.setState({
                        status: data.status,
                        receiver: data.receiver,
                        sender: data.sender
                    });
                })
                .catch(err => {
                    console.log("ERROR WHEN MAKING A REQUEST- AXIOS", err);
                });
        } else if (this.state.status === "pending") {
            axios
                .post("/accept-request", { userID: this.props.otherUserID })
                .then(() => {
                    this.setState({
                        status: "friends",
                        receiver: data.receiver,
                        sender: data.sender
                    });
                });
        }
    }

    render() {
        let buttonText;
        if (!this.state.status) {
            buttonText = "Make Request";
        } else if ((this.state.status = "pending")) {
            if (
                this.state.status == "pending" &&
                this.props.otherUserID == this.state.receiver
            ) {
                buttonText = "Pending(later cancel req)";
            } else {
                buttonText = "Accept Request";
            }
        } else if (this.state.status == "friends") {
            buttonText = "Friends";
        }

        return (
            <div className="friend-button-wrap">
                <button className="friend-button" onClick={this.makeRequest}>
                    {" "}
                    {buttonText}{" "}
                </button>
            </div>
        );
    }
}
