import * as types from '../actions/actionTypes';
import {browserHistory} from 'react-router';
import {RANK_BOARDS} from '../constants/routeConstants';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import moment from 'moment';

const _updateState = (data) => {
    return _dispatchSuccess(types.UPDATE_SESSION, data);
};

const _dispatchSuccess = (type, payload) => {
    return {
        type: type,
        payload: payload
    };
};

const startNewSession = (data) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'socketio/sessionStart',
                payload: {
                    userName: data.userName
                }
            }
        );

        dispatch(
            {
                type: 'socketio/subscribeToBoards',
                payload: {}
            }
        );

        dispatch(
            {
                type: 'socketio/subscribeToResponses',
                payload: {}
            }
        );

        browserHistory.push(RANK_BOARDS);
    };
};

const reconnectSession = (lastUpdated) => {
    return (dispatch) => {
        dispatch(
            {
                type: 'socketio/subscribeToBoards',
                payload: {
                    lastUpdated: lastUpdated
                }
            }
        );

        dispatch(
            {
                type: 'socketio/subscribeToResponses',
                payload: {
                    lastUpdated: lastUpdated
                }
            }
        );
    };
};

const updateConnectionStatus = (data) => {
    return (dispatch, getState) => {
        if(data.connectionState === 'Offline') {
            data.lastUpdated = moment().unix();
        }

        return dispatch(updateSessionState(data));

    };
};

const updateSessionState = (data) => {
    return {
        type: types.UPDATE_SESSION,
        payload: data
    };
};


//simple thunk
const updateSession = (data) => {
    return (dispatch, getState) => {

        let appSessionState = getApplicationSessionFromState(getState());

        //first update local redux state so UI updates immediately
        dispatch(_updateState(data));

        // return post(data).then(response => {
        //     dispatch(_dispatchSuccess(types.UPDATE_SESSION, response.data));
        // }).catch(error => {
        //     console.error(error, appSessionState);
        // });
    };
};

export {
    startNewSession,
    reconnectSession,
    updateSession,
    updateSessionState,
    updateConnectionStatus
};
