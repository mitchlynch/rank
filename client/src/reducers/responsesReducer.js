import {GET_RESPONSES, UPDATE_RESPONSES} from '../actions/actionTypes';
import {buildObjectStateFromArray, mergePayloadDeep} from './normalizedStateOperations';

const responsesReducer = (responses = {}, action) => {

    switch (action.type) {
        case GET_RESPONSES:
            return buildObjectStateFromArray(action.payload);
        case UPDATE_RESPONSES:
            return mergePayloadDeep(responses, action.payload);
        default :
            return responses;
    }
};

export default responsesReducer;
