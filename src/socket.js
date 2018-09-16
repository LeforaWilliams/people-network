import * as io from "socket.io-client";
import { getOnlineUsers, newUserOnline, userHasLeft } from "./action.js";

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
            console.log("This user has just left- SOCKET.JS", data);
            store.dispatch(userHasLeft(data));
        });
    }

    return socket;
}
