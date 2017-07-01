import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { updateCard } from "../../../actions/authActions";
import InputField from "../../../partials/InputField";

@connect(store => ({
    authenticated: store.auth.authenticated,
}))
@reduxForm({
    form: "updateCreditCard",
})
class EditPayment extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
    };
    componentDidMount() {
        Stripe.setPublishableKey(config.STRIPE_PUBLIC);
    }

    stripeHandleResponse = (status, response) => {
        this.props.dispatch(updateCard(response));
    };

    handleFormSubmit = (values) => {
        const month = values.exp.split("/")[0];
        const year = values.exp.split("/")[1];
        Stripe.card.createToken(
            {
                number: values.number,
                cvc: values.cvc,
                exp_month: month,
                exp_year: year,
                address_zip: values.address_zip,
            },
            this.stripeHandleResponse,
        );
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;
        return (
            <div className="bg-white">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="column">
                            <Field
                                data-stripe="name"
                                name="name"
                                className="form-control"
                                type="text"
                                placeholder="Card Holder Name"
                                component={InputField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="number">Number</label>
                        </div>
                        <div className="column">
                            <Field
                                data-stripe="number"
                                name="number"
                                className="form-control"
                                type="text"
                                placeholder="Card Holder Name"
                                component={InputField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="exp">Exp</label>
                        </div>
                        <div className="column">
                            <Field
                                data-stripe="exp"
                                name="exp"
                                className="form-control"
                                type="text"
                                size="5"
                                placeholder="MM/YY"
                                component={InputField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="cvc">CVC</label>
                        </div>
                        <div className="column">
                            <Field
                                data-stripe="cvc"
                                name="cvc"
                                className="form-control"
                                type="text"
                                size="4"
                                placeholder="CVC"
                                component={InputField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="address_zip">ZIP</label>
                        </div>
                        <div className="column">
                            <Field
                                className="form-control"
                                name="address_zip"
                                type="text"
                                placeholder="Zip"
                                component={InputField}
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
                                Change Card
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditPayment.propTypes = {};
EditPayment.defaultProps = {};

export default EditPayment;
