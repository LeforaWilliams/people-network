import * as io from "socket.io-client";
import {
    getOnlineUsers,
    newUserOnline,
    userHasLeft,
    chatMessage,
    recentMessages,
    privateMessage,
    newPrivateMessage
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
            store.dispatch(chatMessage(data));
        });

        socket.on("chatMessages", data => {
            store.dispatch(recentMessages(data));
        });

        socket.on("privateMessageDb", data => {
            console.log("SOCKET JS NEW");
            store.dispatch(newPrivateMessage(data));
        });

        socket.on("privateChatHistory", data => {
            store.dispatch(privateMessage(data));
        });
    }

    return socket;
}
