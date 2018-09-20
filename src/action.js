import axios from "./axios.js";

export async function receiveUsers() {
    const { data } = await axios.get("/relations");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        users: data
    };
}

export async function acceptFriend(id) {
    const { data } = await axios.post("/accept-request/", { userID: id });
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id
    };
}

export async function deleteFriend(id) {
    const { data } = await axios.post("/delete-friendship/", { userID: id });
    return {
        type: "UNFRIEND",
        id
    };
}

export function getOnlineUsers(users) {
    return {
        type: "GET_ONLINE_USERS",
        users
    };
}

export function newUserOnline(newUser) {
    return {
        type: "NEW_USER_ONLINE",
        newUser
    };
}

export function userHasLeft(user) {
    return {
        type: "REMOVE_USER",
        user
    };
}

export function chatMessage(data) {
    return {
        type: "GET_CHAT_MESSAGE",
        data
    };
}

export function recentMessages(data) {
    return {
        type: "GET_RECENT_MESSAGES",
        data
    };
}

export function privateMessage(data) {
    return {
        type: "GET_PRIVATE_MESSAGES",
        data
    };
}

export function newPrivateMessage(data) {
    return {
        type: "NEW_PM",
        data
    };
}

export function nullPrivateMessage() {
    return {
        type: "NULL_PM"
    };
}
