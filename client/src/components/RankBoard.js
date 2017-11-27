import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const RankBoard = ({applicationSession, rankBoard, responses, updateSessionState, addResponse, updateResponse}) => {

    let upVoteStyle = {
        color: 'white',
        textDecoration: 'none'
    };

    const _hasTimeRemaining = (duration) => {
        return moment.duration(duration).hours() + moment.duration(duration).minutes() +
            moment.duration(duration).seconds() > 0;
    };

    const _setTimer = () => {
        const durationMinutes = rankBoard.duration;
        let endTime = moment(rankBoard.timeStamp).add(durationMinutes, 'minutes').unix();
        let currentTime = moment().unix();
        let diffTime = endTime - currentTime;

        let duration = moment.duration(diffTime * 1000, 'milliseconds');
        let interval = 1000;

        let timer = setInterval(function () {
            duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
            let h = moment.duration(duration).hours(),
                m = moment.duration(duration).minutes(),
                s = moment.duration(duration).seconds();

            h = h.toString().length === 1 ? '0' + h : h;
            m = m.toString().length === 1 ? '0' + m : m;
            s = s.toString().length === 1 ? '0' + s : s;

            if (_hasTimeRemaining(duration)) {
                if (document.getElementById('timer')) {
                    document.getElementById('timer').innerText =
                        h + ":" + m + ":" + s;
                } else {
                    clearInterval(timer);
                }
            } else {
                clearInterval(timer);
                document.getElementById('timer').innerText = 'Timer expired';
                document.getElementById('responseInput').disabled = true;
                document.getElementById('addResponseBtn').classList.add('disabled');
            }
        }, interval);
    };

    const _getResponses = () => {
        if (responses) {
            const responseIds = Object.keys(responses);
            let responsesArray = [];
            responseIds.forEach(id => {
                responsesArray.push(responses[id]);
            });
            let responseList = _.orderBy(responsesArray, ['upVote'], ['desc']);
            return responseList.map((response) => {
                return (<li className="list-group-item" key={response.id}>
                    <span className="badge">
                        <a style={upVoteStyle} id={response.id} href="#" onClick={_upVote}>{response.upVote || 0}</a>
                    </span>
                    {response.response}
                </li>);
            });
        }
    };

    const _onChangeEvent = (e) => {
        updateSessionState(e);
    };

    const _addResponse = (e) => {
        e.preventDefault();
        if(document.getElementById('timer').innerText !== 'Timer expired') {
            let data = {
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
        if(document.getElementById('timer').innerText !== 'Timer expired') {
            const id = e.target.id;
            let data = {
                upVote: responses[id].upVote,
                id: id
            };

            updateResponse(data);
        }
    };

    return (
        <div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {rankBoard.description}
                    </h3>
                    <div className="pull-right">
                        <h1>
                            <span id="timer" className="label label-success"/>
                            {_setTimer()}
                        </h1>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <form className="form-horizontal">
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
                                </form>

                            </div>
                        </div>
                        <br />
                        <div className="panel panel-default">
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
    updateResponse: PropTypes.func
};

export default RankBoard;
