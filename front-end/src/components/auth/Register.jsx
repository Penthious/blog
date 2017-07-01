import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import InputField from "../../partials/InputField";
import * as validation from "../../utils/validation";
import routes from "../../routes";

@connect(() => ({}))
@reduxForm({
    form: "register",
})
class // a unique name for this form
Register extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
    };
    handleFormSubmit = (values) => {
        this.props.dispatch(registerUser(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;

        return (
            <div>
                <div className="row">
                    <div className="column">
                        <h4>REGISTRATION</h4>
                    </div>
                </div>
                <hr />
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="name"
                                type="text"
                                component={InputField}
                                validate={[validation.required]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="email">Email Address</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="email"
                                component={InputField}
                                type="email"
                                validate={[validation.required, validation.email]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="password"
                                type="password"
                                component={InputField}
                                validate={[validation.required, validation.minLength(6)]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="password_confirmation"
                                component={InputField}
                                type="password"
                                validate={[validation.required, validation.passwordVerification]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <button className="button" disabled={invalid || submitting}>
                                REGISTER
                            </button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="column">
                        <p>Already registered?</p>
                    </div>
                    <div className="column">
                        <Link to={routes.login}>Login Here</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
