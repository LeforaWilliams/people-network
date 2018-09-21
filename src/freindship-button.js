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
      .get("/check", {
        params: { otherUserID: this.props.otherUserID }
      })
      .then(data => {
        this.setState({
          status: data.data.status,
          receiver: data.data.receiver,
          sender: data.data.sender
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
            status: data.data.status,
            receiver: data.data.receiver,
            sender: data.data.sender
          });
        })
        .catch(err => {
          console.log("ERROR WHEN MAKING A REQUEST- AXIOS", err);
        });
    } else if (
      this.state.status === "pending" &&
      this.state.sender === this.props.otherUserID
    ) {
      axios
        .post("/accept-request", { userID: this.props.otherUserID })
        .then(data => {
          this.setState({
            status: data.data.status
          });
        });
    } else if (this.state.status === "friends") {
      axios
        .post("/delete-friendship", { userID: this.props.otherUserID })
        .then(data => {
          this.setState({
            status: data.data.status
          });
          console.log("LOGGING STATUS AFTER DELETED", this.state.status);
        });
    }
  }

  render() {
    let buttonText;
    console.log("CURRENT STATUS", this.state.status);
    if (!this.state.status) {
      buttonText = "Make Request";
    } else if (this.state.status == "pending") {
      if (this.props.otherUserID == this.state.receiver) {
        buttonText = "Pending";
      } else {
        buttonText = "Accept Request";
      }
    } else if (this.state.status == "friends") {
      buttonText = "Delete Friendship";
    }

    return (
      <div className="friend-button-wrap">
        <h2 className="friend-button" onClick={this.makeRequest}>
          {" "}
          {buttonText}{" "}
        </h2>
      </div>
    );
  }
}
