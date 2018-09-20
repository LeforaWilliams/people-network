import React from "react";
import axios from "./axios.js";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class PrivateChat extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.postMessage = this.postMessage.bind(this);
    }

    componentDidMount() {
        const socket = getSocket();
        socket.emit("privateChatHistory", this.props.match.params.id);
    }

    postMessage(e) {
        const socket = getSocket();
        if (e.which === 13) {
            socket.emit("privateMessage", {
                message: e.target.value,
                receiver: this.props.match.params.id
            });
            e.target.value = " ";
        }
    }

    componentDidUpdate() {
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }

    render() {
        const { privateMessages } = this.props;

        if (!privateMessages) {
            return null;
        }

        return (
            <div className="chat-wrap ">
                <h2> Private Chat </h2>
                <div
                    className="chat-messages flex-container"
                    ref={elem => (this.elem = elem)}
                >
                    {privateMessages.map(message => {
                        return (
                            <div key={message.chatid} className="chat-unit">
                                {/*<img src={message.imageurl} />*/}
                                <p>{message.message} </p>
                                <p>
                                    {message.name} {message.surname}{" "}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <textarea onKeyDown={this.postMessage} />
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    console.log("IN PRIVATE WINDOW COMP", reduxState.privateMessages);
    return {
        privateMessages: reduxState.privateMessages
    };
}

export default connect(mapStateToProps)(PrivateChat);
