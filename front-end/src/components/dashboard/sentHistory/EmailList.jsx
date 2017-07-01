import React, { Component } from "react";
import PropTypes from "prop-types";

class EmailList extends Component {
    render() {
        return (
            <div>
                <div className="row marg-top-20">
                    <div className="column">
                        <p>Today</p>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>name@name.com</p>
                    </div>
                    <div className="column">
                        <p>May 3rd, 2017</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <p>name@name.com</p>
                    </div>
                    <div className="column">
                        <p>May 3rd, 2017</p>
                    </div>
                </div>
            </div>
        );
    }
}

EmailList.propTypes = {};
EmailList.defaultProps = {};

export default EmailList;
