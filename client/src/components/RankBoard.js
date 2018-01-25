import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const RankBoard = ({applicationSession, rankBoard, responses, updateSessionState, addResponse, updateResponse, endSession}) => {

    let upVoteStyle = {
        color: 'white',
        textDecoration: 'none'
    };

    let rankBoardStyle = {
        'WebkitAnimationDuration': '2s',
        'WebkitAnimationDelay': '1s',
        'MozAnimationDuration': '2s',
        'MozAnimationDelay': '1s'
    };

    const _hasTimeRemaining = () => {
        let duration = _getInitialDuration();
        duration = _updateDuration(duration);
        return moment.duration(duration).hours() + moment.duration(duration).minutes() +
            moment.duration(duration).seconds() > 0;
    };

    const _getInitialDuration = () => {
        const durationMinutes = rankBoard.duration;
        let endTime = moment(rankBoard.timeStamp).add(durationMinutes, 'minutes').unix();
        let currentTime = moment().unix();
        let diffTime = endTime - currentTime;

        return moment.duration(diffTime * 1000, 'milliseconds');
    };

    const _updateDuration = (duration) => {
        return moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
    };

    const _setTimer = () => {
        let duration = _getInitialDuration();
        let interval = 1000;

        let timer = setInterval(function () {
            duration = _updateDuration(duration);

            if (moment.duration(duration).hours() + moment.duration(duration).minutes() +
                moment.duration(duration).seconds() > 0) {
                let h = moment.duration(duration).hours(),
                    m = moment.duration(duration).minutes(),
                    s = moment.duration(duration).seconds();

                h = h.toString().length === 1 ? '0' + h : h;
                m = m.toString().length === 1 ? '0' + m : m;
                s = s.toString().length === 1 ? '0' + s : s;

                if (document.getElementById('timer')) {
                    document.getElementById('timer').innerText =
                        h + ":" + m + ":" + s;
                } else {
                    clearInterval(timer);
                    endSession();
                }
            } else {
                clearInterval(timer);
                if (document.getElementById('timer')) {
                    document.getElementById('timer').innerText = 'Timer expired';
                    document.getElementById('responseInput').disabled = true;
                    document.getElementById('addResponseBtn').classList.add('disabled');
                }
                endSession();
            }
        }, interval);
    };

    const _getPulseClass = (response, responseList) => {
        let pulseClass = '';
        if (_hasTimeRemaining()) {
            if (responseList[0] && response.id === responseList[0].id && response.upVote > 0) {
                pulseClass = 'pulse-red';
            } else if (responseList[1] && response.id === responseList[1].id && response.upVote > 0) {
                pulseClass = 'pulse-yellow';
            } else if (responseList[2] && response.id === responseList[2].id && response.upVote > 0) {
                pulseClass = 'pulse-blue';
            } else {
                pulseClass = 'pulse-none';
            }
        }
        return pulseClass;
    };

    const _getPulseMarkup = (response, orderedResponseList) => {
        let pulseMarkup = '';
        if (_hasTimeRemaining()) {
            pulseMarkup = (
                <span className={_getPulseClass(response, orderedResponseList)}/>);
        } else {
            $('#rankBoard').addClass('animated fadeIn');
            if (document.getElementById('response-' + response.id) && orderedResponseList[0] &&
                response.id === orderedResponseList[0].id && response.upVote > 0) {
                pulseMarkup = (
                    <img style={{marginLeft: "10px", marginTop: "-8px"}} src="../assets/img/trophy.png"/>);
                document.getElementById('response-' + response.id).className = 'winningResponse';
                document.getElementById('responseForm').classList.add('hide');
            }
        }

        return pulseMarkup;

    };

    const _getResponses = () => {
        if (responses) {
            const responseIds = Object.keys(responses);
            let responsesArray = [];
            responseIds.forEach(id => {
                responsesArray.push(responses[id]);
            });
            let responseList = [];
            let orderedResponseList = _.orderBy(responsesArray, ['upVote'], ['desc']);
            if (_hasTimeRemaining()) {
                responseList = responsesArray;
            } else {
                responseList = orderedResponseList;
            }

            return responseList.map((response) => {
                let responseStartDate = moment(response.timeStamp).format("dddd, MMMM Do YYYY, h:mm a");
                return (<li className="list-group-item" id={`list-item-${response.id}`} key={response.id}>
                    <div className="pull-right">
                        {_getPulseMarkup(response, orderedResponseList)}
                    </div>
                    <span className="badge">
                        <a style={upVoteStyle} id={response.id} href="#" onClick={_upVote}>{response.upVote || 0}</a>
                    </span>

                    <span id={`response-${response.id}`}>
                        {response.response}
                        <p><small>{`Posted by: ${response.owner} on ${responseStartDate}`}</small></p>
                    </span>

                </li>);
            });
        }
    };

    const _onChangeEvent = (e) => {
        updateSessionState(e);
    };

    const _addResponse = (e) => {
        e.preventDefault();
        if (applicationSession.responseInput && document.getElementById('timer').innerText !== 'Timer expired') {
            let data = {
                owner: applicationSession.userName,
                response: applicationSession.responseInput,
                upVote: 0,
                parentId: rankBoard.id
            };

            addResponse(data);
        }
    };

    const _onEnter = (e) => {
        if (e.key === 'Enter') {
            _addResponse(e);
        }
    };

    const _upVote = (e) => {
        e.preventDefault();
        if (document.getElementById('timer').innerText !== 'Timer expired') {
            const id = e.target.id;
            let data = {
                upVote: responses[id].upVote,
                id: id
            };

            updateResponse(data);
        }
    };

    return (
        <div style={rankBoardStyle} id="rankBoard">
            <div className="panel-body">
                <div className="row">
                    <div className="col-xs-12 col-sm-8 col-md-10">
                        <span className="boardDescription">
                            <span className="lead">{rankBoard.description}</span>
                        </span>
                    </div>
                    <div className="col-xs-4 col-md-2">
                        <span className="boardTimer">
                            <span id="timer" className="label label-success"/>
                            {_setTimer()}
                        </span>
                    </div>
                </div>
            </div>
            <div id="responseForm" className="panel-body">
                <div className="form-group">
                    <label htmlFor="responseInput">Add a Response/Suggestion/Idea</label>
                    <textarea className="form-control"
                              name="responseInput"
                              value={applicationSession.responseInput || ''}
                              id="responseInput"
                              rows="3"
                              onChange={_onChangeEvent}
                              onKeyDown={_onEnter}/>
                </div>
                <div className="form-group">
                    <button id="addResponseBtn" className="btn btn-primary" type="button"
                            onClick={_addResponse}>Add Response
                    </button>
                </div>
            </div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3 className="panel-title">Responses</h3>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {_getResponses()}
                    </ul>
                </div>
            </div>
        </div>
    );
};


RankBoard.propTypes = {
    applicationSession: PropTypes.object,
    rankBoards: PropTypes.object,
    rankBoard: PropTypes.object,
    responses: PropTypes.object,
    updateSessionState: PropTypes.func,
    addResponse: PropTypes.func,
    updateResponse: PropTypes.func,
    endSession: PropTypes.func
};

export default RankBoard;
