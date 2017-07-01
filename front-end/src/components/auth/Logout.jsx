import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { logoutUser } from "../../actions/authActions";

@connect(() => ({}))
class Logout extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
    };

    componentWillMount() {
        this.props.dispatch(logoutUser);
        this.props.dispatch(push("/"));
    }

    render() {
        return null;
    }
}

Logout.defaultProps = {};

export default Logout;
