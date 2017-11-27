import { combineReducers } from 'redux';
import applicationSessionReducer from './applicationSessionReducer';
import rankBoardsReducer from './rankBoardsReducer';
import responsesReducer from './responsesReducer';

const rootReducer = combineReducers({
    applicationSession: applicationSessionReducer,
    rankBoards: rankBoardsReducer,
    responses: responsesReducer
});

export default rootReducer;
