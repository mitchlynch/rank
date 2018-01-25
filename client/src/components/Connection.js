import React from 'react';
import PropTypes from 'prop-types';


const Connection = ({applicationSession}) => {

    const getContent = () => {
        let content = null;
console.log(applicationSession);
        if (applicationSession.connectionState === 'Offline') {
            content = (
                <div className="alert alert-danger">
                    OFFLINE Socket port: {applicationSession.port}
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
                    ONLINE Socket port: {applicationSession.port}
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