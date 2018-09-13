import React from "react";
import axios from "./axios.js";
import { connect } from "react-redux";
import { receiveUsers, acceptFriend, deleteFriend } from "./action.js";

class Friends extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.dispatch(receiveUsers());
    }

    render() {
        const { friends, wannabes } = this.props;
        console.log("LOGGING FRIENDS AND WANNABES", this.props);
        if (wannabes == null) {
            return null;
        }

        return (
            <div>
                <h1> Relationships </h1>
                <div className="wannabes-wrap">
                    <h2> These 37d03d requested to be your freind </h2>
                    {wannabes.map(user => {
                        return (
                            <div key={user.id} className="wannabe-unit">
                                <p>
                                    {user.name} {user.surname}
                                </p>

                                <img
                                    src={
                                        user.imageurl ||
                                        "http://www.psdgraphics.com/file/dark-gradient.jpg"
                                    }
                                />
                                <button
                                    className="friend-button"
                                    onClick={() => {
                                        this.props.dispatch(
                                            acceptFriend(user.id)
                                        );
                                    }}
                                >
                                    Accept Request
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="friends-wrap">
                    <h2>These 37d03d are your friends </h2>
                    {friends.map(user => {
                        return (
                            <div className="friend-unit" key={user.id}>
                                <p>
                                    {user.name} {user.surname}
                                </p>
                                <img
                                    src={
                                        user.imageurl ||
                                        "http://www.psdgraphics.com/file/dark-gradient.jpg"
                                    }
                                />
                                <button
                                    className="friend-button"
                                    onClick={() => {
                                        this.props.dispatch(
                                            deleteFriend(user.id)
                                        );
                                    }}
                                >
                                    End Friendship
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(reduxState) {
    console.log("IN MAPS STATE TO PROPS", reduxState);
    return {
        wannabes:
            reduxState.users &&
            reduxState.users.filter(user => user.status === "pending"),
        friends:
            reduxState.users &&
            reduxState.users.filter(user => user.status === "friends")
    };
}

export default connect(mapStateToProps)(Friends);
