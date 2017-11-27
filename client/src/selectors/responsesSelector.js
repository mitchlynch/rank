import cloneDeep from 'lodash/cloneDeep';

const getResponsesFromState = (state, rankBoardId) => {
    const responses = cloneDeep(state.responses);
    const responseIds = Object.keys(responses);
    responseIds.map((id) => {
        if(responses[id].parentId !== rankBoardId) {
            delete responses[id];
        }
    });

    return responses;
};

export {getResponsesFromState};