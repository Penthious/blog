import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import InputField from "../../../partials/InputField";
import * as validation from "../../../utils/validation";
import { updatePassword } from "../../../actions/authActions";

@connect(store => ({
    initialValues: {},
    enableReinitialize: true,
}))
@reduxForm({
    form: "EditPassword",
})
class EditPassword extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
    };

    handleFormSubmit = (values) => {
        this.props.dispatch(updatePassword(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;
        return (
            <div className="bg-white">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                name="password"
                                label="Enter new password"
                                type="text"
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
                                label="Re-enter new password"
                                type="text"
                                component={InputField}
                                validate={[validation.required, validation.passwordVerification]}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <button
                                className="button"
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditPassword.propTypes = {};
EditPassword.defaultProps = {};

export default EditPassword;
