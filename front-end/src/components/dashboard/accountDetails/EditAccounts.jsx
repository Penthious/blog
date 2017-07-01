import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createAccounts, getEnumAccounts, updateAccounts } from "../../../actions/authActions";
import InputField from "../../../partials/InputField";
import SelectField from "../../../partials/SelectField";

@connect(store => ({
    token: store.auth.token,
    enums: store.auth.enums,
    initialValues: {
        "priority-google": store.auth.accounts.accounts.find(set => set.name === "google")
            ? store.auth.accounts.accounts.find(set => set.name === "google").priority
            : null,

        "priority-yelp": store.auth.accounts.accounts.find(set => set.name === "yelp")
            ? store.auth.accounts.accounts.find(set => set.name === "yelp").priority
            : null,

        "priority-facebook": store.auth.accounts.accounts.find(set => set.name === "facebook")
            ? store.auth.accounts.accounts.find(set => set.name === "facebook").priority
            : null,

        "business_name-facebook": store.auth.accounts.accounts.find(set => set.name === "facebook")
            ? store.auth.accounts.accounts.find(set => set.name === "facebook").business_name
            : null,

        "business_name-yelp": store.auth.accounts.accounts.find(set => set.name === "yelp")
            ? store.auth.accounts.accounts.find(set => set.name === "yelp").business_name
            : null,

        "business_name-google": store.auth.accounts.accounts.find(set => set.name === "google")
            ? store.auth.accounts.accounts.find(set => set.name === "google").business_name
            : null,
    },
    enableReinitialize: true,
}))
@reduxForm({
    form: "accountsEdit",
})
class EditAccounts extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
        enums: PropTypes.shape(),
    };

    componentWillMount() {
        let test = "test";
        test = "tester";
        const objects = {};
        objects.name = "test";
        const tester = `tester${test}somthing here`;

        if (this.props.enums.length === 0) {
            this.props.dispatch(getEnumAccounts);
        }
    }

    handleFormSubmit = (values) => {
        this.props.dispatch(updateAccounts(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;

        return (
            <div className="bg-white">
                <div className="row">
                    <div className="column">
                        <h3>BUSINESS ACCOUNTS</h3>
                    </div>
                </div>
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
                                SAVE CHANGES
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditAccounts.propTypes = {};
EditAccounts.defaultProps = {};

export default EditAccounts;
