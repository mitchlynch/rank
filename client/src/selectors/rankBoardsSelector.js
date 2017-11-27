const getRankBoardsFromState = (state) => {
    return state.rankBoards;
};

const getRankBoardFromState = (state, id) => {
    return state.rankBoards[id];
};

export {getRankBoardsFromState, getRankBoardFromState};