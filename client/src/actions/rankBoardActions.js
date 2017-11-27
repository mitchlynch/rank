import * as types from '../actions/actionTypes';

const createRankBoard = (data) => {
    return {
        type:'socketio/createRankBoard',
        payload: data
    };
};

const updateRankBoard = (data) => {
    return {
        type:'socketio/updateRankBoard',
        payload: data
    };
};

const addResponse = (data) => {
    return {
        type:'socketio/addResponse',
        payload: data
    };
};

const updateResponse = (data) => {
    return {
        type:'socketio/updateResponse',
        payload: data
    };
};

const updateSessionState = (data) => {
    return {
        type: types.UPDATE_SESSION,
        payload: data
    };
};

export {
    updateSessionState,
    createRankBoard,
    updateRankBoard,
    addResponse,
    updateResponse
};
