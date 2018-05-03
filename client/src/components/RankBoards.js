import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import moment from 'moment';

const RankBoards = ({rankBoards, applicationSession, updateSessionState, createRankBoard}) => {

    const _getBoards = () => {
        if (rankBoards) {
            const boardIds = Object.keys(rankBoards);
            return boardIds.map((id) => {
                let boardStartDate = moment(rankBoards[id].timeStamp).format("dddd, MMMM Do YYYY, h:mm a");
                return (
                    <Link to={`RankBoard/${id}`} className="list-group-item"
                          key={id}>{rankBoards[id].description}
                        <p><small>{`Posted by: ${rankBoards[id].owner} on ${boardStartDate}`}</small></p>
                    </Link>
                );
            });
        }
    };

    const _onChangeEvent = (e) => {
        updateSessionState(e);
    };

    const _createRankBoard = (e) => {
        e.preventDefault();
        if(applicationSession.createRankBoard) {
            let data = {
                owner: applicationSession.userName,
                description: applicationSession.createRankBoard,
                duration: applicationSession.rankBoardDuration
            };

            createRankBoard(data);
        }
    };

    const _onEnter = (e) => {
        if(e.key === 'Enter') {
            _createRankBoard(e);
        }
    };

    const connectionStatusClass = () => {
        return applicationSession.connectionState === 'Online' ? "label label-success" : "label label-danger";
    };

    const connectionStatus = () => {
        return applicationSession.connectionState === 'Online' ? "Online" : "Offline";
    };

    return (
        <div>
            <h4><span style={{margin: "9px", float: "right"}} className={connectionStatusClass()}>Status: {connectionStatus()}</span></h4>
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h1 className="panel-title">Hi {applicationSession.userName}, welcome to Rank!</h1>
            </div>
            <div style={{margin:"20px"}}>
                <h4>To get started, select a duration for your board (in minutes) and enter a detailed
                    description of the problem/idea/challenge and click the Create RankBoard button to start the session.
                </h4>
                <br />
                <h4>
                    You can also select a board from the list below to add your own responses to.
                </h4>
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
