import React from 'react';
import PropTypes from 'prop-types';

const Application = ({component}) => {
    return (
        <div className="container">
            {component}
        </div>
    );
};

Application.propTypes = {
    component: PropTypes.object
};

export default Application;
