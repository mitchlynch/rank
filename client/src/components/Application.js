import React from 'react';
import PropTypes from 'prop-types';
import ConnectedConnectionContainer from './ConnectionContainer';

const Application = ({component, applicationSession}) => {
    return (
        <div className="container-fluid">
            <ConnectedConnectionContainer
                applicationSession={applicationSession}
            />
            {component}
        </div>
    );
};

Application.propTypes = {
    component: PropTypes.object,
    applicationSession: PropTypes.object
};

export default Application;
