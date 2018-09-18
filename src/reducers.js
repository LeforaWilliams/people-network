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
    if (action.type == "GET_ONLINE_USERS") {
        state = {
            ...state,
            users: action.users
        };
    }
    if (action.type == "NEW_USER_ONLINE") {
        state = {
            ...state,
            users: [...state.users, action.newUser]
        };
    }
    if (action.type == "REMOVE_USER") {
        state = {
            ...state,
            users: state.users.filter(user => {
                return user.id != action.user;
            })
        };
    }

    if (action.type == "GET_CHAT_MESSAGE") {
        state = {
            ...state,
            recentMessages: [...state.recentMessages, action.data]
        };
    }

    if (action.type == "GET_RECENT_MESSAGES") {
        state = {
            ...state,
            recentMessages: action.data
        };
    }

    return state;
}
