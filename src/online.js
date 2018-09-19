import React from "react";
import { connect } from "react-redux";
import Chat from "./chat.js";

class Online extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { online } = this.props;

        if (!online) {
            return null;
        }

        return (
            <div className="online-wrap flex-container">
                <h1>Online</h1>
                <div className="online-users-wrap">
                    {online.map(user => {
                        return (
                            <div key={user.id} className="online-user-unit">
                                <div className="media-body">
                                    <img src={user.imageurl} />
                                    <p>
                                        {user.name} {user.surname}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Chat />
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        online: reduxState.online_users
    };
}

export default connect(mapStateToProps)(Online);
