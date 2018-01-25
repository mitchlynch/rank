import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions/sessionActions';
import {getApplicationSessionFromState} from '../selectors/applicationSessionSelector';
import {subscribeToConnectionEvent} from '../store/configureStore';
import Connection from './Connection';
import moment from 'moment';

class ConnectionContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        autoBind(this);

        subscribeToConnectionEvent(({connectionState, storeState, port}) => {
            console.log('storestate', storeState);
            let applicationSession = getApplicationSessionFromState(storeState);
            let connectionData = {
                connectionState: connectionState || 'connecting',
                lastUpdated: applicationSession.lastUpdated,
                port: port
            };
console.log('connectionData', connectionData);
            // if(connectionState === 'Offline') {
            //     connectionData.lastUpdated = moment().unix();
            // }

            if(connectionState === 'Online' && applicationSession.lastUpdated) {
                //re-subscribe to board updates
                console.log('resubscribing...', applicationSession.lastUpdated);
                connectionData.lastUpdated = undefined;
                sessionActions.reconnectSession(applicationSession.lastUpdated);
            }

            this.props.sessionActions.updateConnectionStatus(connectionData);
        });
    }

    componentWillMount() {

    }

    componentDidMount() {

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
