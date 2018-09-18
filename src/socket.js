import * as io from "socket.io-client";
import {
    getOnlineUsers,
    newUserOnline,
    userHasLeft,
    chatMessage,
    recentMessages
} from "./action.js";

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", data => {
            store.dispatch(getOnlineUsers(data));
        });

        socket.on("userJoined", data => {
            store.dispatch(newUserOnline(data));
        });

        socket.on("userLeft", data => {
            store.dispatch(userHasLeft(data));
        });

        socket.on("chatMessage", data => {
            console.log("DATA FROM SERVER IN SOCKET.JS", data);
            store.dispatch(chatMessage(data));
        });

        socket.on("chatMessages", data => {
            store.dispatch(recentMessages(data));
        });
    }

    return socket;
}
