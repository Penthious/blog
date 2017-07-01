import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DropZoneInput from "../../../partials/DropZoneInput";
import InputField from "../../../partials/InputField";
import * as validate from "../../../utils/validation";

@connect(store => ({
    authenticated: store.auth.authenticated,
    token: store.auth.token,
}))
@reduxForm({
    form: "businessEdit",
})
class // a unique name for this form
// validate,
EditBusiness extends Component {
    render() {
        const { handleSubmit, invalid, submitting } = this.props;

        return (
            <div className="bg-white">
                <div>
                    <div className="row">
                        <div className="column">
                            <h3>BUSINESS INFORMATION</h3>
                        </div>
                    </div>
                    <form action="">
                        <div className="row">
                            <div className="column">
                                <label htmlFor="image">
                                    Business Logo
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <Field name="image" component={DropZoneInput} type="file" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="column">
                                <label htmlFor="name">Business Name</label>
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
                        </div>

                        <div className="row">
                            <div className="column">
                                <label htmlFor="message">message</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <Field
                                    name="message"
                                    component={InputField}
                                    type="text"
                                    validate={[validate.required]}
                                />
                            </div>
                        </div>

                        <button className="button" type="submit" disabled={invalid || submitting}>
                            SAVE CHANGES
                        </button>
                    </form>
                </div>

            </div>
        );
    }
}

EditBusiness.propTypes = {};
EditBusiness.defaultProps = {};

export default EditBusiness;
