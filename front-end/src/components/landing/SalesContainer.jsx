import React from "react";
import PropTypes from "prop-types";

const SalesContainer = props => (
    <div>
        <div className="row text-center">
            <div className="column">
                <h1>STAND ABOVE THE REST</h1>
            </div>
        </div>
        <div className="row text-center">
            <div className="column">
                <p>Add Value to your Company with Credible Customer Reviews</p>
            </div>
        </div>
        <div className="row">
            {props.children}
        </div>
    </div>
);

SalesContainer.propTypes = {
    children: PropTypes.array,
};
SalesContainer.defaultProps = {
    children: PropTypes.array,
};

export default SalesContainer;
