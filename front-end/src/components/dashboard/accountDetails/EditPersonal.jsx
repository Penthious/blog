import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import InputField from "../../../partials/InputField";
import { updateUser } from "../../../actions/authActions";

@connect(store => ({
    user: store.auth.userInfo.user,
    initialValues: {
        name: store.auth.userInfo.user.name,
        email: store.auth.userInfo.user.email,
    },
    enableReinitialize: true,
}))
@reduxForm({
    form: "EditPersonal",
})
class EditPersonal extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
    };

    handleFormSubmit = (values) => {
        console.log(values);
        console.log("test");
        this.props.dispatch(updateUser(values));
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;
        console.log("user?????????????");
        console.log(this.props.user);
        console.log("user?????????????");
        return (
            <div className="bg-white">
                <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field
                                data-stripe="name"
                                name="name"
                                type="text"
                                component={InputField}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <Field name="email" type="text" component={InputField} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <button
                                className="button"
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                Update Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditPersonal.propTypes = {};
EditPersonal.defaultProps = {};

export default EditPersonal;
