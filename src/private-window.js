import React from "react";
import axios from "./axios.js";
import { connect } from "react-redux";
import { getSocket } from "./socket";
import { privateMessage, nullPrivateMessage } from "./action";

class PrivateChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postMessage = this.postMessage.bind(this);
  }

  componentDidMount() {
    this.setState({ otherUserId: this.props.match.params.id });
    const socket = getSocket();
    socket.emit("privateChatHistory", this.props.match.params.id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.otherUserId != nextProps.match.params.id) {
      console.log("STATIC", prevState.otherUserId, nextProps.match.params.id);
      nextProps.dispatch(nullPrivateMessage());

      return {
        otherUserId: nextProps.match.params.id
      };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.elem) {
      this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }

    if (!this.props.privateMessages) {
      const socket = getSocket();
      socket.emit("privateChatHistory", this.props.match.params.id);
    }
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

  render() {
    const { privateMessages } = this.props;

    if (!privateMessages) {
      return null;
    }
    return (
      <div className="chat-wrap ">
        <h2> Private Chat </h2>
        <div className="chat-messages " ref={elem => (this.elem = elem)}>
          {privateMessages.map(message => {
            return (
              <div key={message.chatid} className="chat-unit">
                {/*<img
                  className="border-radius chat-image"
                  src={message.imageurl}
                />*/}
                <p className="chat-sender inline">
                  {message.name} {message.surname}:{" "}
                </p>
                <p className="inline">{message.message} </p>
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
