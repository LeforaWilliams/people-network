import React from "react";
import { connect } from "react-redux";
import { receiveUsers } from "./action.js";
import { Link } from "react-router-dom";
import { getSocket } from "./socket";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateChat from "./private-window.js";

class Private extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(receiveUsers());
    }

    sendMessage(e) {
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
        const { friends } = this.props;

        if (friends == null) {
            return null;
        }

        return (
            <div className="private-chat-wrap">
                <h1> Start A Conversation</h1>

                <div className="friends-wrap flex-container">
                    {friends.map(user => {
                        return (
                            <div className="friend-unit" key={user.id}>
                                <Link to={`/private-chat/${user.id}`}>
                                    <img
                                        src={
                                            user.imageurl ||
                                            "http://www.psdgraphics.com/file/dark-gradient.jpg"
                                        }
                                    />
                                </Link>
                                <p>
                                    {user.name} {user.surname}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <Route path="/private-chat/:id" component={PrivateChat} />
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        friends:
            reduxState.users &&
            reduxState.users.filter(user => user.status === "friends")
    };
}

export default connect(mapStateToProps)(Private);
