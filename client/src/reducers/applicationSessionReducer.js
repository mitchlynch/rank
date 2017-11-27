import {UPDATE_SESSION} from '../actions/actionTypes';
import {mergePayloadFlat} from './normalizedStateOperations';

const applicationSessionReducer = (applicationSession = {}, action) => {
    switch (action.type) {

        case UPDATE_SESSION:
            return mergePayloadFlat(applicationSession, action.payload);
        default :
            return applicationSession;
    }
};

export default applicationSessionReducer;
