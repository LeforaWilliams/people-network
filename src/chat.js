import React from "react";
import { connect } from "react-redux";
import { getSocket } from "./socket";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(e) {
    const socket = getSocket();
    if (e.which === 13) {
      socket.emit("chatMessage", e.target.value);
      e.target.value = " ";
    }
  }

  componentDidUpdate() {
    this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
  }

  render() {
    const { messages } = this.props;

    if (!messages) {
      return null;
    }

    return (
      <div className="chat-wrap">
        <h2> PEOPLE Chat </h2>
        <div className="chat-messages" ref={elem => (this.elem = elem)}>
          {messages.map(message => {
            return (
              <div key={message.chatid} className="chat-unit">
                <img
                  className="chat-image border-radius"
                  src={message.imageurl}
                />
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
  return {
    messages: reduxState.recentMessages
  };
}

export default connect(mapStateToProps)(Chat);
