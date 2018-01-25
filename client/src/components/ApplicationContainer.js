import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import Application from './Application';
import * as sessionActions from '../actions/sessionActions';
import * as rankBoardActions from '../actions/rankBoardActions';
import * as routeConstants from '../constants/routeConstants';
import {setDataInSessionStorage} from '../store/sessionStorage';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {getRankBoardsFromState} from '../selectors/rankBoardsSelector';


class ApplicationContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        //You can still leverage local component state. Useful for things like DOM class manipulation, or other things
        //that don't need to be in your application data state.
        this.state = {

        };
        autoBind(this);
    }

    componentWillMount() {
        //this.props.sessionActions.startNewSession();
        let urlParams = new URLSearchParams(window.location.search);
        const socketPort = urlParams.get('sp');
        if(socketPort) {
            setDataInSessionStorage({
                socketPort: socketPort
            });
        }
        const {applicationSession} = this.props;
        if(applicationSession && applicationSession.sessionStarted) {
            this.props.router.push(routeConstants.RANK_BOARDS);
        } else {
            this.props.router.push(routeConstants.HOME);
        }
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

    createRankBoard(data) {
        this.props.rankBoardActions.createRankBoard(data);

        this.props.sessionActions.updateSessionState({
            createRankBoard: '',
            rankBoardDuration: ''
        });
    }

    updateRankBoard(e) {
        e.preventDefault();
        if(e.target.id) {
            const fieldName = e.target.name;
            const fieldValue = e.target.value;
            let data = {
                [fieldName]: fieldValue
            };

            this.props.rankBoardActions.updateRankBoard(data);
        }
    }

    _getChildComponent() {
        const {applicationSession, rankBoards} = this.props;
        let childComponent;
        let children = this.props.children;
        if (children) {
            childComponent = React.cloneElement(children, {
                applicationSession: applicationSession,
                rankBoards: rankBoards,
                updateStateAndPersist: this.updateStateAndPersist,
                updateSessionState: this.updateSessionState,
                createRankBoard: this.createRankBoard,
                updateRankBoard: this.updateRankBoard
            });
        }

        return childComponent;
    }

    render() {
        return (<Application
            component={this._getChildComponent()}
            applicationSession={this.props.applicationSession}
        />);
    }
}

ApplicationContainer.propTypes = {
    sessionActions: PropTypes.object,
    rankBoardActions: PropTypes.object,
    ownProps: PropTypes.object,
    children: PropTypes.object,
    router: PropTypes.object,
    applicationSession: PropTypes.object,
    rankBoards: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    const applicationSession = getApplicationSessionFromState(state);
    const rankBoards = getRankBoardsFromState(state);
    return {
        router: ownProps.router,
        applicationSession: applicationSession,
        rankBoards: rankBoards
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sessionActions: bindActionCreators(sessionActions, dispatch),
        rankBoardActions: bindActionCreators(rankBoardActions, dispatch)
    };
};

export {
    mapStateToProps,
    mapDispatchToProps,
    ApplicationContainer
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationContainer);
