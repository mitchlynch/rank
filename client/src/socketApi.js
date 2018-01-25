import openSocket from 'socket.io-client';
import {getDataFromSessionStorage} from './store/sessionStorage';
//import Rx from 'rxjs/Rx';
// import createSync from 'rxsync';

//TODO: this is temp code to just see how two client can communicate and disconnect/reconnect. normally be hardcoded port
const getPort = () => {
    let socketPort = getDataFromSessionStorage('socketPort');
    let urlParams = new URLSearchParams(window.location.search);
    const sp = urlParams.get('sp');
    if(!socketPort && sp) {
        socketPort = sp;
    } else {
        socketPort = 8000;
    }
    return socketPort;
};

const port = getPort();
const socket = openSocket(`http://localhost:${port}`);

function createRankSession(rankSession) {
    socket.emit('createRankSession', rankSession);
}

const subscribeToConnectionEvent = (cb) => {
    socket.on('connect', () => cb({
        connectionState: 'Online',
        port
    }));
    socket.on('disconnect', () => cb({
        connectionState: 'Offline',
        port
    }));
    socket.on('connect_error', () => cb({
        connectionState: 'Offline',
        port
    }));
};

export {
    createRankSession,
    subscribeToConnectionEvent
};