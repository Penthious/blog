import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import RatingCard from "../components/dashboard/dashboard/RatingCard";
import Chart from "../components/dashboard/dashboard/Chart";
import Reviews from "../components/dashboard/dashboard/Reviews";
import { retrieveFeedback } from "../actions/feedbackActions";
import { retrieveReviews } from "../actions/reviewsActions";
import { Route, Switch } from "react-router-dom";
import routes from "../routes";
import Feedback from "../components/dashboard/feedback/Feedback";
import Emails from "../components/dashboard/emails/Emails";
import AccountDetails from "../components/dashboard/accountDetails/AccountDetails";
import SentHistory from "../components/dashboard/sentHistory/SentHistory";
import DeleteUser from "../components/dashboard/DeleteUser";

@connect(store => ({
    authenticated: store.auth.authenticated,
    accounts: store.auth.accounts,
    business: store.auth.business.business,
    user: store.auth.userInfo,
    reviews: store.reviews,
    feedback: store.feedback.feedback,
}))
class DashBoard extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        authenticated: PropTypes.bool,
        feedback: PropTypes.shape(),
    };

    componentWillMount() {
        this.props.dispatch(retrieveReviews);
        this.props.dispatch(retrieveFeedback);
        this.businessAuth();
    }

    businessAuth = () => {
        const user = this.props.user;
        console.log("============");
        console.log("============");
        console.log("============");
        console.log(this.props);
        console.log("============");
        console.log("============");
        console.log("============");
        console.log(user);
        if (user.loading) {
            return <div>...loading</div>;
        } else if (user.user.length === 0) {
            console.log("looks like it failed here");
        }
        return null;
    };

    populateFeedback = () => this.props.feedback.feedback.filter(set => set.unresolved === "0");

    averageRating = (multi = false) => {
        const yelp = this.props.reviews.yelp.reviews;
        const google = this.props.reviews.google.reviews;
        const facebook = this.props.reviews.facebook.reviews;
        let total = [];
        const length = [];
        if (yelp) {
            total.push(yelp.reduce((a, b) => a + (+b.rating), 0));
            length.push(yelp.length);
        }
        if (google) {
            total.push(google.reduce((a, b) => a + (+b.rating), 0));
            length.push(google.length);
        }
        if (facebook) {
            total.push(facebook.reduce((a, b) => a + (+b.rating), 0));
            length.push(facebook.length);
        }
        if (multi) {
            return total
                .map((rating, i) => (rating / length[i]).toFixed(1))
                .map(rating => rating === "NaN" ? 0 : rating);
        }
        total = total.reduce((a, b) => a + b, 0);

        return (total / this.totalReviews()).toFixed(1);
    };

    totalReviews = () => {
        const yelp = this.props.reviews.yelp.reviews;
        const google = this.props.reviews.google.reviews;
        const facebook = this.props.reviews.facebook.reviews;
        let total = 0;
        if (yelp.length > 0) {
            total += yelp.length;
        }
        if (google.length > 0) {
            total += google.length;
        }
        if (facebook.length > 0) {
            total += facebook.length;
        }

        return total;
    };

    populateReviews = () => {
        const accounts = this.props.accounts.accounts;
        return [...accounts].sort((a, b) => a.priority - b.priority).map((account) => {
            const reviews = this.props.reviews[account.name];
            if (account.priority === 1) {
                return [reviews, account.name];
            } else if (account.priority === 2) {
                return [reviews, account.name];
            } else if (account.priority === 3) {
                return [reviews, account.name];
            }
            return null;
        });
    };

    renderLanding = () => {
        const reviews = this.populateReviews();
        return (
            <div>
                <div className="row">
                    <RatingCard
                        name="TOTAL REVIEWS"
                        reviews={[this.totalReviews()]}
                        className="small-3"
                    />
                    <RatingCard
                        name="OVERALL REVIEWS"
                        reviews={[this.averageRating() === "NaN" ? 0 : this.averageRating()]}
                        className="small-3"
                    />
                    <RatingCard
                        name="AVERAGE RATING PER SITE"
                        reviews={this.averageRating(true)}
                        className="small-6"
                    />
                </div>
                <div className="row">
                    <Chart reviews={this.props.reviews} />
                    {reviews[0] ? <Reviews reviews={reviews[0]} /> : null}
                </div>
                <div className="row">
                    {reviews[1] ? <Reviews reviews={reviews[1]} /> : null}
                    {reviews[2] ? <Reviews reviews={reviews[2]} /> : null}
                </div>
            </div>
        );
    };

    render() {
        const { yelp, facebook, google } = this.props.reviews;
        const { match } = this.props;
        console.log(match);
        if (this.businessAuth()) {
            return this.businessAuth();
        }
        // if (yelp.loading || facebook.loading || google.loading || this.props.feedback.loading) {
        //     return <div>Loading....</div>;
        // }
        return (
            <div className="row expanded">
                <div className="column small-3 bg-dark-gray" style={{ height: "100vh" }}>
                    <Sidebar
                        {...this.props.business}
                        path={this.props.location.pathname}
                        feedback={this.populateFeedback()}
                    />
                </div>
                <div className="column">
                    <Navbar auth={this.props.authenticated} />
                    <div style={{ background: "#F7F7F7" }}>
                        <div className="row">
                            <div className="column small-offset-1 small-10 marg-top-20">
                                <Switch>
                                    <Route
                                        exact
                                        path={`${match.url}${routes.feedback}`}
                                        component={Feedback}
                                    />
                                    <Route
                                        exact
                                        path={`${match.url}${routes.emails}`}
                                        render={() => <Emails business={this.props.business} />}
                                    />
                                    <Route
                                        exact
                                        path={`${match.url}${routes.accountDetails}`}
                                        component={AccountDetails}
                                    />
                                    <Route
                                        exact
                                        path={`${match.url}${routes.sentHistory}`}
                                        component={SentHistory}
                                    />
                                </Switch>
                                {match.isExact
                                    ? this.props.feedback.loading ||
                                          yelp.loading ||
                                          facebook.loading ||
                                          google.loading
                                          ? null
                                          : this.renderLanding()
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashBoard.propTypes = {};
DashBoard.defaultProps = {};

export default DashBoard;
