import {GET_RANKBOARDS, UPDATE_RANKBOARDS} from '../actions/actionTypes';
import {buildObjectStateFromArray, mergePayloadDeep} from './normalizedStateOperations';

const rankBoardsReducer = (rankBoards = {}, action) => {

    switch (action.type) {
        case GET_RANKBOARDS:
            return buildObjectStateFromArray(action.payload);
        case UPDATE_RANKBOARDS:
            return mergePayloadDeep(rankBoards, action.payload);
        default :
            return rankBoards;
    }
};

export default rankBoardsReducer;
