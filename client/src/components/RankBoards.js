import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

const RankBoards = ({rankBoards, applicationSession, updateSessionState, createRankBoard}) => {

    const _getBoards = () => {
        if (rankBoards) {
            const boardIds = Object.keys(rankBoards);
            return boardIds.map((id) => {
                return (
                    <Link to={`RankBoard/${id}`} className="list-group-item"
                          key={id}>{rankBoards[id].description}</Link>
                );
            });
        }
    };

    const _onChangeEvent = (e) => {
        updateSessionState(e);
    };

    const _createRankBoard = (e) => {
        e.preventDefault();
        let data = {
            description: applicationSession.createRankBoard,
            duration: applicationSession.rankBoardDuration
        };

        createRankBoard(data);
    };

    const _onEnter = (e) => {
        if(e.key === 'Enter') {
            _createRankBoard(e);
        }
    };

    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h1 className="panel-title">Welcome to RankBoard!</h1>
            </div>
            <div className="panel-body">
                <form className="form-horizontal">
                    <div className="panel-body">
                    <div className="form-group">
                        <label htmlFor="rankBoardDuration">Duration</label>
                        <select value={applicationSession.rankBoardDuration || ''}
                                name="rankBoardDuration"
                                className="form-control"
                                id="rankBoardDuration"
                                onChange={_onChangeEvent}>
                            <option value="" disabled>Select Duration</option>
                            <option value="5">5 Minutes</option>
                            <option value="10">10 Minutes</option>
                            <option value="15">15 Minutes</option>
                            <option value="30">30 Minutes</option>
                            <option value="60">60 Minutes</option>
                            <option value="90">90 Minutes</option>
                            <option value="120">120 Minutes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="createRankBoard">Description/Idea/Problem</label>
                        <textarea className="form-control" name="createRankBoard"
                                  value={applicationSession.createRankBoard}
                                  id="createRankBoard" rows="3"
                                  onChange={_onChangeEvent}
                                  onKeyDown={_onEnter}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={_createRankBoard}>Create RankBoard
                    </button>
                    </div>
                </form>
            </div>

            <br />
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">RankBoards</h3>
                </div>
                <div className="panel-body">
                    <div className="list-group">
                        {_getBoards()}
                    </div>
                </div>
            </div>

        </div>
    );
};

RankBoards.propTypes = {
    applicationSession: PropTypes.object,
    rankBoards: PropTypes.object,
    updateSessionState: PropTypes.func,
    updateRankState: PropTypes.func,
    createRankBoard: PropTypes.func,
    updateRankBoard: PropTypes.func
};

export default RankBoards;
