import axios from "./axios.js";

export async function receiveUsers() {
    const { data } = await axios.get("/relations");
    console.log("DATA FROM RECIVE USERS ACTION JS", data);
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
