import openSocket from 'socket.io-client';
// import Rx from 'rxjs/Rx';
// import createSync from 'rxsync';

const port = parseInt(window.location.search.replace('?', ''), 10) || 8000;
const socket = openSocket(`http://localhost:${port}`);

function createRankSession(rankSession) {
    socket.emit('createRankSession', rankSession);
}

// const subscribeToTimer = (cb) => {
//     socket.on('timer', timestamp => cb(timestamp));
//     socket.emit('subscribeToTimer', 1000);
// };

export {
    createRankSession
};