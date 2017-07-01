import React, { Component } from "react";
import PropTypes from "prop-types";
import EditBusiness from "./EditBusiness";
import EditAccounts from "./EditAccounts";
import EditPayment from "./EditPayment";
import EditPersonal from "./EditPersonal";
import EditPassword from "./EditPassword";

class AccountDetails extends Component {
    render() {
        return (
            <div className="row">
                <div className="column small-6">
                    <EditBusiness />
                </div>
                <div className="column small-6">
                    <EditAccounts />
                    <EditPayment />
                </div>
                <div className="column small-6">
                    <EditPersonal />
                </div>
                <div className="column small-6">
                    <EditPassword />
                </div>
            </div>
        );
    }
}

AccountDetails.propTypes = {};
AccountDetails.defaultProps = {};

export default AccountDetails;
