import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { Line } from "react-chartjs-2";
import datasets from "../../../utils/graphDatasets";

class Chart extends Component {
    static propTypes = {
        reviews: PropTypes.shape(),
    };

    constructor(props) {
        super(props);
        this.state = {
            labels: [],
            datasets,
        };
    }

    componentDidMount() {
        this.getReviewsByRange(1, "day");
    }

    /**
     *
     * @param {Array} monthArray         - array of months for this.state.labels
     * @param {object} data              - this.state
     * @param {Array.<object>} reviewSet - current reviews
     * @param {string} type              - day || month
     * @param {int} dateTo               - start date
     * @param {int} now                  - current date
     * @param {string} name              - review name
     */
    setReviews = (monthArray, data, reviewSet, type, dateTo, now, name) => {
        const dataSet = data.datasets.find(set => set.label === name);
        dataSet.data = [];
        const reviews = reviewSet
            .map((review) => {
                if (
                    Moment.parseZone(review.created_at).unix() >= dateTo &&
                    Moment.parseZone(review.created_at).unix() <= now
                ) {
                    return review;
                }
            })
            .filter(review => review !== undefined);

        monthArray.map((date) => {
            let count = 0;
            reviews.map((review) => {
                if (type === "day") {
                    if (Moment.parseZone(review.created_at).date() === date) {
                        count += 1;
                    }
                } else if (
                    Moment.parseZone(review.created_at).get(type) === Moment().month(date).get(type)
                ) {
                    count += 1;
                }
                return null;
            });
            dataSet.data.push(count);
            return null;
        });

        this.setState({ ...this.state, ...data });
    };

    /**
     *
     * @param {int} range   - month
     * @param {string} type - day || month
     */
    getReviewsByRange = (range, type) => {
        console.log("geeting reviews");
        const now = Moment().unix();
        const dateTo = Moment().month(Moment().get("month") - range).unix();
        if (type === "day") {
            range = Moment().daysInMonth();
        }
        const facebookReviews = this.props.reviews.facebook.reviews;
        const googleReviews = this.props.reviews.google.reviews;
        const yelpReviews = this.props.reviews.yelp.reviews;
        const monthArray = [];
        for (let i = 0; i < range; i += 1) {
            if (type === "day") {
                monthArray.push(i + 1);
            } else {
                monthArray.push(Moment().month(Moment().get(type) - i).format("MMM"));
            }
        }
        if (type === "month") {
            monthArray.reverse();
        }

        const data = {
            labels: monthArray,
            datasets: [...this.state.datasets],
        };

        if (facebookReviews.length !== 0) {
            this.setReviews(monthArray, data, facebookReviews, type, dateTo, now, "Facebook");
        }

        if (googleReviews.length !== 0) {
            this.setReviews(monthArray, data, googleReviews, type, dateTo, now, "Google");
        }

        if (yelpReviews.length !== 0) {
            this.setReviews(monthArray, data, yelpReviews, type, dateTo, now, "Yelp");
        }
    };

    render() {
        return (
            <div className="column small-6">
                <div className="card">
                    <div className="card-divider">
                        <div className="row">
                            <div className="column small-3">
                                <h4>REVIEW STATISTICS</h4>
                            </div>
                            <div
                                className="column small-2"
                                onClick={() => this.getReviewsByRange(1, "day")}
                            >
                                <h4>MONTH</h4>
                            </div>
                            <div
                                className="column small-4"
                                onClick={() => this.getReviewsByRange(6, "month")}
                            >
                                <h4>6 MONTHS</h4>
                            </div>
                            <div
                                className="column small-3"
                                onClick={() => this.getReviewsByRange(12, "month")}
                            >
                                <h4>YEAR</h4>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="card-section">
                        <Line data={this.state} ref="chart" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Chart;
