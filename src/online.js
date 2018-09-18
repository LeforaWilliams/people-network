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
            <div>
                <h1>Connect with online users</h1>
                <div className="online-wrap flex-contianer">
                    {online.map(user => {
                        return (
                            <div key={user.id} className="online-user-unit">
                                <img src={user.imageurl} />
                                <p>
                                    {user.name} {user.surname}
                                </p>
                            </div>
                        );
                    })}
                </div>;
                <Chat />
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    return {
        online: reduxState.users
    };
}

export default connect(mapStateToProps)(Online);
