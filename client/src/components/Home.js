import React from 'react';
import PropTypes from 'prop-types';

const Home = ({applicationSession, updateSessionState, login}) => {

    const _login = (e) => {
        e.preventDefault();
        if (applicationSession.userName) {
            login({
                userName: applicationSession.userName
            });
        }
    };

    const _onEnter = (e) => {
        if (e.key === 'Enter') {
            _login(e);
        }
    };

    const _onChangeEvent = (e) => {
        updateSessionState(e);
    };

    return (
        <div>
            <div className="jumbotron">
                <h2>So you have found Rank...now what?</h2>
                <div>Rank allows you to create a virtual board where you can ask a question, post a problem, share an
                    idea, or any other thing you would like feedback on. The key feature of RankBoard is that you set a timer
                    (in minutes) for people to post feedback/ideas/answers to your board. As people provide feedback to
                    your board, other people can "up vote" the response by clicking the numeric counter next to each
                    response. When the board timer has been reached, the results are displayed, with the "winning" response listed
                    first.
                </div>
                <br />
                <div>
                    You will also notice that once the voting starts, pulsing color images appear next to the responses.
                    A red pulse indicates that this response has the most votes, a yellow pulse indicates that it has the
                    second most votes, and blue the third most votes. These pulse icons will change as more votes come
                    in depending on the tally.
                </div>
            </div>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                        style={{width:"40%"}}
                        type="text"
                        name="userName"
                        value={applicationSession.userName || ''}
                        className="form-control"
                        id="userName"
                        placeholder="Enter a username for this session"
                        onChange={_onChangeEvent}
                        onKeyDown={_onEnter}
                    />
                </div>

                <button type="submit" className="btn btn-default" onClick={_login}>Submit</button>
            </form>
        </div>
    );
};

Home.propTypes = {
    applicationSession: PropTypes.object,
    updateSessionState: PropTypes.func,
    login: PropTypes.func
};

export default Home;
