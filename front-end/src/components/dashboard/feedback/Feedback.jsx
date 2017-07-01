import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "moment";
import { resolveFeedback, retrieveFeedback } from "../../../actions/feedbackActions";
import openEmailSvg from "../../../assets/images/envelope-read.svg";
import closedEmailSvg from "../../../assets/images/envelope-unread.svg";

@connect(store => ({
    feedback: store.feedback.feedback,
}))
class Feedback extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        feedback: PropTypes.shape(),
    };

    constructor(props) {
        super(props);
        this.state = {
            currentFeedback: {},
        };
    }

    componentWillMount() {
        // if (this.props.feedback.feedback.length === 0) {
        //     console.log('-----------------------');
        //     console.log('feedback fetching');
        //     this.props.dispatch(retrieveFeedback);
        //     console.log('-----------------------');
        // }
    }

    setCurrentFeedback = (feedback) => {
        if (feedback.id !== this.state.currentFeedback.id) {
            this.setState({ currentFeedback: feedback });
        }
        if (feedback.unresolved === "0") {
            this.props.dispatch(resolveFeedback(feedback));
        }
    };

    renderFeedback = () => this.props.feedback.feedback.map(review => (
        <div
            className="row align-middle"
            key={Math.random()}
            onClick={() => this.setCurrentFeedback(review)}
        >
            <div className="column">
                {review.unresolved === "0"
                    ? <img src={closedEmailSvg} alt="" />
                    : <img src={openEmailSvg} alt="" />}
            </div>
            <div className="column">
                <p>{review.name}</p>
            </div>
            <div className="column">
                <p>{Moment.parseZone(review.created_at).format("MMM Do h:mm a")}</p>
            </div>
        </div>
    ));

    renderFeedbackMessage = () => (
        <div className="column small-6">
            <div className="row">
                <div className="column">
                    <p>
                        {
                            `from
                        ${this.state.currentFeedback.name}
                        .
                        ${Moment.parseZone(this.state.currentFeedback.created_at)
                                .format("MMM Do, h:mm a")}`
                        }
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>{this.state.currentFeedback.feed_back}</p>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <p>To view another feedback please click on the one you want to view.</p>
                </div>
            </div>
            <hr />
        </div>
    );

    renderEmptyFeedback = () => (
        <div className="column small-6">
            <div className="row">
                <div className="column">
                    <p>To see feedback please click on the feedback you would like to see.</p>
                </div>
            </div>
            <hr />
        </div>
    );

    render() {
        if (this.props.feedback.loading) {
            return <div>Loading.....</div>;
        }
        if (this.props.feedback.error) {
            return <div>error: {this.props.feedback.error}</div>;
        }

        console.log("---------------");
        console.log(this.state);
        console.log("---------------");
        return (
            <div className="bg-white">
                <div className="row">
                    <div className="column">
                        <h1>FEEDBACK</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="column small-6">
                        {this.renderFeedback()}
                    </div>
                    {Object.keys(this.state.currentFeedback).length !== 0
                        ? this.renderFeedbackMessage()
                        : this.renderEmptyFeedback()}
                </div>
            </div>
        );
    }
}

Feedback.propTypes = {};
Feedback.defaultProps = {};

export default Feedback;
