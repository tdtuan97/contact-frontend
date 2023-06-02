import {io, Manager} from "socket.io-client";

const manager = new Manager(process.env.REACT_APP_SOCKET_URL, {
    reconnectionDelayMax: 10000,
    query: {
        //
    }
});

const initialState = {
    socket: manager.socket("/", {
        auth: {
            token: ""
        },
    })
};

export default initialState;
