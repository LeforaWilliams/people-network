import * as io from "socket.io-client";
import { getOnlineUsers } from "./action.js";

let socket;

//function that will handle connection
export function getSocket(store) {
    //if someone comes to site that doesn't have a connection, create socket
    if (!socket) {
        socket = io.connect();

        socket.on("onlineUsers", data => {
            store.dispatch(getOnlineUsers(data));
        });
    }

    return socket;
}
