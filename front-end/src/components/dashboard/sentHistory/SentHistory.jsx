import React, { Component } from "react";
import PropTypes from "prop-types";
import EmailList from "./EmailList";

class SentHistory extends Component {
    render() {
        return (
            <div className="bg-white">
                <div className="row">
                    <div className="column">
                        <p>391</p>
                    </div>
                    <div className="column">
                        <h3>EMAILS SENT</h3>
                    </div>
                    <div className="column">
                        <p>1-50 of 391</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <EmailList />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <EmailList />
                    </div>
                </div>
            </div>
        );
    }
}

SentHistory.propTypes = {};
SentHistory.defaultProps = {};

export default SentHistory;
