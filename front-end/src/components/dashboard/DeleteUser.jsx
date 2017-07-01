import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteUser } from "../../actions/authActions";

@connect(() => ({}))
class DeleteUser extends Component {
    static propTypes = {};
    componentDidMount() {
        this.props.dispatch(deleteUser);
    }

    render() {
        return null;
    }
}

DeleteUser.propTypes = {};
DeleteUser.defaultProps = {};

export default DeleteUser;
