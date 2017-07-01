import React, { Component } from "react";
import PropTypes from "prop-types";
import { push } from "react-router-redux";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import * as validation from "../../utils/validation";
import InputField from "../../partials/InputField";
import routes from "../../routes";

@connect(store => ({
    authenticated: store.auth.authenticated,
    token: store.auth.token,
}))
@reduxForm({
    form: "login",
})
class // a unique name for this form
// validate,
Login extends Component {
    static propTypes = {
        authenticated: PropTypes.bool,
        dispatch: PropTypes.func,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
    };

    static defaultProps = {
        authenticated: false,
    };

    componentDidMount() {
        if (this.props.authenticated) {
            this.props.dispatch(push(routes.dashboard));
        }
    }

    handleFormSubmit = (values) => {
        this.props.dispatch(
            loginUser({
                email: values.email,
                password: values.password,
                navigate: true,
            }),
        );
    };

    render() {
        const { handleSubmit, invalid, submitting } = this.props;
        return (
            <div className="row">
                <div className="column">
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className="column">
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="column">
                            <Field
                                name="email"
                                component={InputField}
                                type="email"
                                validate={[validation.required, validation.email]}
                            />
                        </div>
                        <div className="column">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="column">
                            <Field
                                name="password"
                                component={InputField}
                                type="password"
                                validate={validation.required}
                            />
                        </div>
                        <div className="column">
                            <button
                                className="button"
                                type="submit"
                                disabled={invalid || submitting}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="row">
                        <div className="column">
                            <p>Not registered?</p>
                        </div>
                        <div className="column">
                            <Link to={routes.register}>Sign Up Here</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
