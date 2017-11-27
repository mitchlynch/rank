import * as types from '../actions/actionTypes';
//import {get, post}  from '../xhr/sessionXhr';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';

const _updateState = (data) => {
    return _dispatchSuccess(types.UPDATE_SESSION, data);
};

const _dispatchSuccess = (type, payload) => {
    return {
        type: type,
        payload: payload
    };
};

const getNewSession = () => {
    //TODO: update username to be entered from form
    return (dispatch) => {
        dispatch(
            {
                type: 'socketio/sessionStart',
                payload: {
                    userName: 'Mitch'
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
    getNewSession,
    updateSession,
    updateSessionState
};
