import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Brand from "../shared/Brand";

const Navbar = props => (
    <div className="row marg-top-20 collapse">
        <Brand />
        <p>{props.auth}</p>
        <div className="column text-right">
            <button className="button">
                SEND EMAIL INVITE
            </button>
        </div>
    </div>
);

Navbar.propTypes = {
    auth: PropTypes.bool,
};
Navbar.defaultProps = {};

export default Navbar;
