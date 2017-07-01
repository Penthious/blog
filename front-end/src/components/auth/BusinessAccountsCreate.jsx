import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import InputField from "../../partials/InputField";
import SelectField from "../../partials/SelectField";
import { createAccounts, getEnumAccounts } from "../../actions/authActions";

@connect(store => ({
    token: store.auth.token,
    enums: store.auth.enums,
}))
@reduxForm({
    form: "accountCreate",
})
class BusinessAccountsCreate extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
        enums: PropTypes.shape(),
    };

    componentWillMount() {
        if (this.props.enums.length === 0) {
            this.props.dispatch(getEnumAccounts);
        }
    }

    handleFormSubmit = (values) => {
        this.props.dispatch(createAccounts(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="column">
                        <h3>BUSINESS ACCOUNTS</h3>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>

                    <div className="row">
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={"business_name-google"}>
                                        {"Google Account Name"}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="text"
                                        name={"business_name-google"}
                                        component={InputField}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={"priority-google"}>Priority</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="select"
                                        name={"priority-google"}
                                        component={SelectField}
                                        options={["", 1, 2, 3]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={"business_name-yelp"}>
                                        {"Yelp Account Name"}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="text"
                                        name={`business_name-yelp`}
                                        component={InputField}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={`priority-yelp`}>Priority</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="select"
                                        name={`priority-yelp`}
                                        component={SelectField}
                                        options={["", 1, 2, 3]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={`business_name-facebook`}>
                                        {`Facebook Account Name`}
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="text"
                                        name={`business_name-facebook`}
                                        component={InputField}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor={`priority-facebook`}>Priority</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        type="select"
                                        name={`priority-facebook`}
                                        component={SelectField}
                                        options={["", 1, 2, 3]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <button
                                className="button"
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <p>Already registered? Login Here</p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

BusinessAccountsCreate.propTypes = {};
BusinessAccountsCreate.defaultProps = {};

export default BusinessAccountsCreate;
