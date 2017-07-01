/* @flow */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";

import { createBusiness } from "../../actions/authActions";
import DropZoneInput from "../../partials/DropZoneInput";
import InputField from "../../partials/InputField";
import * as validate from "../../utils/validation";
import SelectField from "../../partials/SelectField";
import PhoneNormalizer from "../../utils/PhoneNormalizer";
import states from "../../utils/states";

@connect(store => ({
    authenticated: store.auth.authenticated,
    token: store.auth.token,
}))
@reduxForm({
    form: "businessCreate",
})
class BusinessCreate extends Component {
    props: {
        dispatch: (param: Function) => void,
        handleSubmit: (param: Function) => void,
        submitting: boolean,
        invalid: boolean,
    };

    handleFormSubmit = (values: Array<any>) => {
        this.props.dispatch(createBusiness(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="column">
                        <p>BUSINESS CREATION</p>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="name">
                                Business Name
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                        <div className="column">
                            <label htmlFor="address">
                                Address
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="name"
                                component={InputField}
                                type="text"
                                validate={[validate.required]}
                            />
                        </div>
                        <div className="column">
                            <Field
                                name="address"
                                component={InputField}
                                type="text"
                                validate={[validate.required]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="email">
                                Email Address
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                        <div className="column">
                            <label htmlFor="city">
                                City
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="email"
                                type="email"
                                component={InputField}
                                validate={[validate.required, validate.email]}
                            />
                        </div>
                        <div className="column">
                            <Field
                                name="city"
                                component={InputField}
                                type="text"
                                validate={[validate.required]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="phone_number">
                                Phone Number
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                        <div className="column">
                            <label htmlFor="state">
                                State
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                        <div className="column">
                            <label htmlFor="zip">
                                zip
                                <FontAwesome name="asterisk" />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="phone_number"
                                component={InputField}
                                type="text"
                                validate={[validate.required, validate.phoneNumber]}
                                normalize={PhoneNormalizer}
                            />
                        </div>
                        <div className="column">
                            <Field
                                name="state"
                                component={SelectField}
                                type="select"
                                options={states}
                                validate={[validate.required, validate.maxLength(2)]}
                            >
                                <option value="ut">UT</option>
                            </Field>
                        </div>
                        <div className="column">
                            <Field
                                name="zip"
                                component={InputField}
                                type="text"
                                size="5"
                                validate={[validate.required, validate.zipCode]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="image">Business Logo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field name="image" component={DropZoneInput} type="file" />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <button
                                type="submit"
                                className="button"
                                disabled={invalid || submitting}
                            >
                                REGISTER
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default BusinessCreate;
