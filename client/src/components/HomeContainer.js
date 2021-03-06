import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/sessionActions';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {setDataInSessionStorage} from '../store/sessionStorage';
import Home from './Home';
import Connection from './Connection';


class HomeContainer extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {};

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

    login(data) {
        setDataInSessionStorage({
            rankSession: {userName: this.props.applicationSession.userName}
        });
        this.props.sessionActions.startNewSession(data);
    }

    render() {

        const {applicationSession} = this.props;
        return (
            <div>
                <Connection
                    applicationSession={applicationSession}
                />
                <Home
                    applicationSession={applicationSession}
                    updateSessionState={this.updateSessionState}
                    login={this.login}
                />
            </div>
        );
    }
}

HomeContainer.propTypes = {
    sessionActions: PropTypes.object,
    applicationSession: PropTypes.object
};

const mapStateToProps = (state) => {

    const applicationSession = getApplicationSessionFromState(state);

    return {
        applicationSession: applicationSession
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sessionActions: bindActionCreators(sessionActions, dispatch)
    };
};

const ConnectedHomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomeContainer);

export {
    mapStateToProps,
    mapDispatchToProps,
    HomeContainer,
    ConnectedHomeContainer as default
};
