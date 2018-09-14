import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { online } = this.props;
        console.log("ONLINE DATA", online);

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
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    console.log("GLOBAL STATE IN ONLINE COMPONENT", reduxState);
    return {
        online: reduxState.users
    };
}

export default connect(mapStateToProps)(Online);
