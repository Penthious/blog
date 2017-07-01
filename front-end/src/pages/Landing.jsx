import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/landing/Navbar";
import FocusArea from "../components/landing/FocusArea";
import SalesContainer from "../components/landing/SalesContainer";
import SalesProposition from "../components/landing/SalesProposition";
import Footer from "../components/landing/Footer";
import propositions from "../utils/propositions";
import data from "../utils/data";
import ImageSection from "../components/landing/ImageSection";
import routes from "../routes";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Logout from "../components/auth/Logout";
import BusinessCreate from "../components/auth/BusinessCreate";
import BusinessAccountsCreate from "../components/auth/BusinessAccountsCreate";
import Subscription from "../components/auth/Subscription";

@connect(store => ({
    authenticated: store.auth.authenticated,
}))
class Landing extends Component {
    static propTypes = {
        authenticated: PropTypes.bool,
    };

    renderLanding = () => (
        <div>
            <FocusArea />
            <SalesContainer>
                {propositions.map(proposition => (
                    <SalesProposition key={Math.random()} {...proposition} />
                ))}
            </SalesContainer>
            {data.map(object => <ImageSection key={Math.random()} {...object} />)}
            <hr />
        </div>
    );

    render() {
        console.log(this.props);
        const { authenticated, match } = this.props;
        return (
            <div>
                <Navbar auth={authenticated} />
                <Switch>
                    <Route exact path={routes.login} component={Login} />
                    <Route path={routes.logout} component={Logout} />
                    <Route path={routes.register} component={Register} />
                    <Route
                        path={routes.businessCreate}
                        component={BusinessCreate}
                        // onEnter={this.requireAuth}
                    />
                    <Route
                        path={routes.businessAccountsCreate}
                        component={BusinessAccountsCreate}
                        // onEnter={this.requireBusiness}
                    />
                    <Route
                        path={routes.businessSubscription}
                        component={Subscription}
                        // onEnter={this.requireBusiness}
                    />

                </Switch>
                {match.url === routes.home ? this.renderLanding() : null}
                <Footer />
            </div>
        );
    }
}

Landing.defaultProps = {
    children: PropTypes.element,
};

export default Landing;
