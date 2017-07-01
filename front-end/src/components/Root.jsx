import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { push, ConnectedRouter } from "react-router-redux";
import DashBoard from "../pages/DashBoard";
import Landing from "../pages/Landing";
import NotFoundPage from "../pages/NotFoundPage";
import routes from "../routes";
import DeleteUser from "./dashboard/DeleteUser";

class Root extends React.Component {
    requireAuth = (props) => {
        const auth = props.store.getState().auth.authenticated;
        if (!auth) {
            props.store.dispatch(push(routes.login));
        }
    };

    requireBusiness = (props) => {
        console.log("checking creds");
        this.requireAuth();
        const business = props.store.getState().auth.business.business;
        if (!business) {
            console.log("failed creds");
            // props.store.dispatch(push(routes.businessCreate));
        }
    };

    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path={routes.home} component={Landing} />
                        <Route path={routes.login} component={Landing} />
                        <Route path={routes.logout} component={Landing} />
                        <Route path={routes.register} component={Landing} />
                        <Route
                            path={routes.businessCreate}
                            component={Landing}
                            // onEnter={this.requireAuth}
                        />
                        <Route
                            path={routes.businessAccountsCreate}
                            component={Landing}
                            // onEnter={this.requireBusiness}
                        />
                        <Route
                            path={routes.businessSubscription}
                            component={Landing}
                            // onEnter={this.requireBusiness}
                        />
                        <Route
                            path={routes.dashboard}
                            component={DashBoard}
                            // onEnter={this.requireBusiness}
                        />
                        <Route
                            path={`${routes.dashboard}${routes.feedback}`}
                            component={DashBoard}
                        />
                        <Route path={`${routes.dashboard}${routes.emails}`} component={DashBoard} />
                        <Route
                            path={`${routes.dashboard}${routes.accountDetails}`}
                            component={DashBoard}
                        />
                        <Route
                            path={`${routes.dashboard}${routes.sentHistory}`}
                            component={DashBoard}
                        />
                        <Route path={routes.deleteUser} component={DeleteUser} />

                        <Route component={NotFoundPage} />

                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
};

export default Root;
