import React, { Component } from "react";
import EditBusiness from "./EditBusiness";

class Emails extends Component {
    render() {
        const { business } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="column small-6">
                        <EditBusiness />
                    </div>
                    <div className="column small-6">
                        <EditBusiness />
                    </div>
                </div>
                <div className="marg-top-20 bg-white">
                    <div className="row">
                        <div className="column">
                            <h3>EMAIL TEMPLATE</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column small-4">
                            {Boolean(business.image) === true
                                ? <img src={`${config.APP_URL}storage${business.image}`} alt="" />
                                : null}
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <p>Person's Name</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquam
                                        impedit maiores minus molestiae numquam omnis quas
                                        recusandae?
                                        Eum ex expedita facere fuga fugit minus, quos sit tempora
                                        vel
                                        veniam. Autem.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Aliquam
                                        impedit maiores minus molestiae numquam omnis quas
                                        recusandae?
                                        Eum ex expedita facere fuga fugit minus, quos sit tempora
                                        vel
                                        veniam. Autem.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <p>Other Info can be listed here.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <button className="button">
                                        LEAVE REVIEW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Emails.propTypes = {};
Emails.defaultProps = {};

export default Emails;
