import React from "react";

export default function(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        console.log("ACTION IN REDUCER", action);
        state = {
            ...state,
            users: action.users
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        status: "friends"
                    };
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            users: state.users.filter(user => {
                return user.id != action.id;
            })
        };
    }

    return state;
}
