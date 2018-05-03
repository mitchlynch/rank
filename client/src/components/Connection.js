import React from 'react';
import PropTypes from 'prop-types';


const Connection = ({applicationSession}) => {

    const getContent = () => {
        let content = null;
        if (applicationSession.connectionState === 'Offline' || applicationSession.connectionState === 'Error') {
            content = (
                <div className="alert alert-danger">
                    <b>Hmmm...looks like we can't connect...retrying...</b> Application Status: OFFLINE Socket port: {applicationSession.port}
                </div>

            );
        }

        if (applicationSession.connectionState === 'connecting') {
            content = (
                <div className="alert alert-warning">
                    Connecting...Socket port: {applicationSession.port}
                </div>
            );
        }

        if (applicationSession.connectionState === 'Online') {
            content = (
                <div className="alert alert-success">
                    <b>Welcome to Rank!</b> Application Status: ONLINE Socket port: {applicationSession.port}
                </div>
            );
        }

        return content;
    };

    return (
        <div style={{padding:"10px"}}>
            {getContent()}
        </div>
    );
};

Connection.propTypes = {
    applicationSession: PropTypes.object
};

export default Connection;