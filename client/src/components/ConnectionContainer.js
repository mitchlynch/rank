import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/sessionActions';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {subscribeToConnectionEvent} from '../store/configureStore';
import Connection from './Connection';

class ConnectionContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);
        subscribeToConnectionEvent(({connectionState, storeState, port}) => {
            let applicationSession = getApplicationSessionFromState(storeState);
            let connectionData = {
                connectionState: connectionState || 'connecting',
                lastUpdated: applicationSession.lastUpdated,
                port: port
            };

            if (connectionState === 'Error') {
                connectionData.attemptReconnect = true;
            }

            this.props.sessionActions.updateConnectionStatus(connectionData);
        });
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUpdate() {

    }

    componentDidUpdate() {

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

    render() {

        const {applicationSession} = this.props;
        return (<Connection
            applicationSession={applicationSession}
            updateSessionState={this.updateSessionState}
        />);
    }
}

ConnectionContainer.propTypes = {
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

export {
    mapStateToProps,
    mapDispatchToProps,
    ConnectionContainer
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionContainer);
