import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Brand from "../shared/Brand";

const Navbar = props => (
    <div className="header">
        <div className="row align-middle">
            <div className="column shrink">
                <Brand />
            </div>
            <div className="column">
                <p>{props.auth}</p>
            </div>
            <div className="column shrink text-right">
                <button>
                    {props.auth
                        ? <Link className="h6" to="/logout">LOGOUT</Link>
                        : <Link className="h6" to="/login">LOGIN</Link>}
                </button>
            </div>
        </div>
    </div>
);

Navbar.propTypes = {
    auth: PropTypes.bool,
};
Navbar.defaultProps = {};

export default Navbar;
