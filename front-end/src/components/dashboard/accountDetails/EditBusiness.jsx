import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import DropZoneInput from "../../../partials/DropZoneInput";
import InputField from "../../../partials/InputField";
import * as validate from "../../../utils/validation";
import SelectField from "../../../partials/SelectField";
import states from "../../../utils/states";
import PhoneNormalizer from "../../../utils/PhoneNormalizer";
import { updateBusiness } from "../../../actions/authActions";

@connect(store => ({
    business: store.auth.business.business,
    initialValues: store.auth.business.business,
}))
@reduxForm({
    form: "businessEdit",
    fields: ["name", "phone_number", "email", "address", "city", "zip", "state"],
    enableReinitialize: true,
})
class // a unique name for this form
// validate,
EditBusiness extends Component {
    handleFormSubmit = (values) => {
        this.props.dispatch(updateBusiness(values));
    };

    render() {
        const { handleSubmit, invalid, submitting, business } = this.props;
        return (
            <div className="bg-white">
                <div className="row">
                    <div className="column">
                        <h3>EDIT BUSINESS INFO</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            {Boolean(business.image) === true
                                ? <img src={`${config.APP_URL}storage${business.image}`} alt="" />
                                : null}
                            <Field name="image" component={DropZoneInput} type="file" />
                        </div>
                        <div className="column">

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
                                    <label htmlFor="phone_number">Phone Number</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        name="phone_number"
                                        content={business.phone_number}
                                        component={InputField}
                                        type="text"
                                        validate={[validate.required, validate.phoneNumber]}
                                        normalize={PhoneNormalizer}
                                    />
                                </div>
                            </div>

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
                                validate={[validate.required, validate.email]}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="column">
                            <label htmlFor="address">Address</label>
                        </div>
                    </div>
                    <div className="row">
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
                            <label htmlFor="city">City</label>
                        </div>
                    </div>
                    <div className="row">
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

                            <div className="row">
                                <div className="column">
                                    <label htmlFor="state">State</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <Field
                                        name="state"
                                        component={SelectField}
                                        type="select"
                                        options={states}
                                        validate={[validate.required, validate.maxLength(2)]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="zip">Zip</label>
                                </div>
                            </div>
                            <div className="row">
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

                        </div>
                    </div>

                    <button type="submit" className="button" disabled={invalid || submitting}>
                        UPDATE BUSINESS
                    </button>
                </form>
            </div>
        );
    }
}

EditBusiness.propTypes = {};
EditBusiness.defaultProps = {};

export default EditBusiness;
