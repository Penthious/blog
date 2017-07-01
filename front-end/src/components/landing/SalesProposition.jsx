import React from "react";
import PropTypes from "prop-types";

const SalesProposition = props => (
    <div className="column text-center">
        <div className="row">
            <div className="column">
                <img src={props.img} alt="" />
            </div>
        </div>
        <div className="row">
            <div className="column">
                <h2>{props.title}</h2>
            </div>
        </div>
        <div className="row">
            <div className="column">
                <p>{props.text}</p>
            </div>
        </div>
    </div>
);

SalesProposition.propTypes = {
    title: PropTypes.string,
    img: PropTypes.string,
    text: PropTypes.string,
};
SalesProposition.defaultProps = {
    title: PropTypes.string,
    img: PropTypes.string,
    text: PropTypes.string,
};

export default SalesProposition;
