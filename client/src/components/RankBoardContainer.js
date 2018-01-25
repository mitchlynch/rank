import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/sessionActions';
import * as rankBoardActions from '../actions/rankBoardActions';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {getRankBoardFromState} from '../selectors/rankBoardsSelector';
import {getResponsesFromState} from '../selectors/responsesSelector';
import RankBoard from './RankBoard';


class RankBoardContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        //You can still leverage local component state. Useful for things like DOM class manipulation, or other things
        //that don't need to be in your application data state.
        this.state = {
            timerExpired: false
        };
        autoBind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    updateSessionState(e) {
        e.preventDefault();
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        let data = {
            [fieldName]: fieldValue
        };
        this.props.sessionActions.updateSessionState(data);
    }

    addResponse(data) {

        this.props.rankBoardActions.addResponse(data);

        this.props.rankBoardActions.updateSessionState({
             responseInput: ''
         });
    }

    updateResponse(data) {
        this.props.rankBoardActions.updateResponse(data);
    }

    updateRankBoard(e) {
        e.preventDefault();
        if (e.target.id) {
            const fieldName = e.target.name;
            const fieldValue = e.target.value;
            let data = {
                [fieldName]: fieldValue
            };

            this.props.rankBoardActions.updateRankBoard(data);
        }
    }

    endSession() {
        this.setState({timerExpired: true})
    }

    render() {

        const {applicationSession, rankBoard, responses} = this.props;
        return (<RankBoard
            applicationSession={applicationSession}
            updateSessionState={this.updateSessionState}
            responses={responses}
            rankBoard={rankBoard}
            addResponse={this.addResponse}
            updateResponse={this.updateResponse}
            endSession={this.endSession}
        />);
    }
}

RankBoardContainer.propTypes = {
    sessionActions: PropTypes.object,
    rankBoardActions: PropTypes.object,
    ownProps: PropTypes.object,
    applicationSession: PropTypes.object,
    rankBoards: PropTypes.object,
    rankBoard: PropTypes.object,
    responses: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {

    const applicationSession = getApplicationSessionFromState(state);
    const rankBoardId = ownProps.routeParams.id;
    const rankBoard = getRankBoardFromState(state, rankBoardId);
    const responses = getResponsesFromState(state, rankBoardId);

    return {
        applicationSession: applicationSession,
        rankBoard: rankBoard,
        responses: responses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sessionActions: bindActionCreators(sessionActions, dispatch),
        rankBoardActions: bindActionCreators(rankBoardActions, dispatch)
    };
};

const ConnectedRankBoardContainer = connect(mapStateToProps, mapDispatchToProps)(RankBoardContainer);

export {
    mapStateToProps,
    mapDispatchToProps,
    RankBoardContainer,
    ConnectedRankBoardContainer as default
};
