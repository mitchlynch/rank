/* eslint-disable no-console */

const r = require('rethinkdb');
const io = require('socket.io')();

function createRankBoard({connection, rankBoard}) {
    rankBoard.timeStamp = new Date();

    return r.table('rankboards')
        .insert(rankBoard)
        .run(connection)
        .then((result) => {
            return r.table('rankboards').get(result.generated_keys[0]).run(connection);
        });
}


function getRankBoards({connection}) {
    let rankBoards = {};

    r.table('rankboards').run(connection, function (error, cursor) {
        return cursor.each((err, row) => {
            if (err) throw err;
            let id = row.id;
            rankBoards[id] = row
        });

    });
}

function addResponse({connection, response}) {
    response.timeStamp = new Date();

    return r.table('responses')
        .insert(response)
        .run(connection)
        .then((result) => {
            return r.table('responses').get(result.generated_keys[0]).run(connection);
        });
}

function getResponses({connection}) {
    let responses = {};

    r.table('responses').run(connection, function (error, cursor) {
        cursor.each((err, row) => {
            if (err) throw err;
            let id = row.id;
            responses[id] = row
        });

    });
    return responses;
}

function updateResponse({connection, response}) {
    response.timeStamp = new Date();
    return r.table('responses')
        .get(response.id)
        .update({upVote: response.upVote + 1})
        .run(connection)
        .then(() => {
            return r.table('responses').get(response.id).run(connection);
        });
}

function createSession({connection, rankSession}) {
    return r.table('rank_session')
        .insert({
            rankSession,
            timestamp: new Date(),
        })
        .run(connection)
        .then(() => console.log('created a new rank session ', rankSession));
}

function subscribeToBoards({socket, connection}) {
    r.table('rankboards')
        .changes({ include_initial: true })
        .run(connection, function(err, cursor) {
            cursor.each(function(err, boardRow) {
                socket.emit('action',
                    {
                        type: 'UPDATE_RANKBOARDS',
                        payload: boardRow.new_val
                    });
            });
        });
}

function subscribeToResponses({socket, connection}) {
    r.table('responses')
        .changes({ include_initial: true })
        .run(connection, function(err, cursor) {
            cursor.each(function(err, boardRow) {
                socket.emit('action',
                    {
                        type: 'UPDATE_RESPONSES',
                        payload: boardRow.new_val
                    });
            });
        });
}

r.connect({
    host: 'localhost',
    port: 28015,
    db: 'rank'
}).then((connection) => {

    io.on('connection', (socket) => {
        socket.on('action', (action) => {
            switch (action.type) {
                case 'socketio/sessionStart':
                    console.log('Received session start:', action.payload);
                    createSession({connection, rankSession: action.payload}).then((result) => {
                        socket.emit('action',
                            {
                                type: 'UPDATE_SESSION',
                                payload: {
                                    sessionMessage: 'Session started',
                                    userName: action.payload.userName
                                }
                            });
                    });

                    r.table('rankboards').run(connection, function (error, cursor) {
                        cursor.toArray().then((rankBoardsArray) => {
                            socket.emit('action',
                                {
                                    type: 'GET_RANKBOARDS',
                                    payload: rankBoardsArray
                                });
                        });
                    });

                    r.table('responses').run(connection, function (error, cursor) {
                        cursor.toArray().then((responsesArray) => {
                            socket.emit('action',
                                {
                                    type: 'GET_RESPONSES',
                                    payload: responsesArray
                                });
                        });
                    });

                    break;
                case 'socketio/subscribeToBoards':
                    console.log('Received board subscription:', action.payload);
                    subscribeToBoards({socket, connection});
                    break;
                case 'socketio/subscribeToResponses':
                    console.log('Received response subscription:', action.payload);
                    subscribeToResponses({socket, connection});
                    break;
                case 'socketio/sessionUpdate':
                    console.log('Received update session:', action.payload);
                    socket.emit('action',
                        {
                            type: 'UPDATE_SESSION',
                            payload: {
                                sessionMessage: 'Session updated'
                            }
                        });
                    break;
                case 'socketio/createRankBoard':
                    console.log('Received create rankboard:', action.payload);
                    createRankBoard({connection, rankBoard: action.payload});
                    // createRankBoard({connection, rankBoard: action.payload}).then((result) => {
                    //     socket.emit('action',
                    //         {
                    //             type: 'UPDATE_RANKBOARDS',
                    //             payload: result
                    //         });
                    // });
                    break;
                case 'socketio/updateRankBoard':
                    console.log('Received update rankboard:', action.payload);
                    socket.emit('action',
                        {
                            type: 'UPDATE_RANKBOARDS',
                            payload: action.payload
                        });
                    break;
                case 'socketio/addResponse':
                    console.log('Received add response:', action.payload);
                    addResponse({connection, response: action.payload});
                    //     .then((result) => {
                    //     socket.emit('action',
                    //         {
                    //             type: 'UPDATE_RESPONSES',
                    //             payload: result
                    //         });
                    // });
                    break;
                case 'socketio/updateResponse':
                    console.log('Received update response:', action.payload);
                    updateResponse({connection, response: action.payload});
                    //     .then((result) => {
                    //     socket.emit('action',
                    //         {
                    //             type: 'UPDATE_RESPONSES',
                    //             payload: result
                    //         });
                    // });
                    break;
            }
        });
    });
});


const port = parseInt(process.argv[2], 10) || 8000;
io.listen(port);
console.log('socket.io listening on port ', port);

