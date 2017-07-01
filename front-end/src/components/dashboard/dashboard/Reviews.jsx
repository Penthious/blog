import React from "react";
import PropTypes from "prop-types";

const Reviews = (props) => {
    console.log("props");
    console.log(props);
    console.log(props.reviews[0].reviews);
    console.log("props");
    return (
        <div className="column small-6">
            <div className="card">
                <div className="card-divider">
                    <div className="row">
                        <div className="column small-1">
                            <h4>{props.reviews[0].reviews.length}</h4>
                        </div>
                        <div className="column">
                            <h4>{props.reviews[1].toUpperCase()} RECENT REVIEWS</h4>
                        </div>
                        <div className="column small-2">
                            <h4>stars</h4>
                        </div>
                    </div>
                    <hr />
                </div>
                {props.reviews[0].reviews.slice(0, 3).map(review => (
                    <div key={Math.random()} className="card-section">
                        <div className="row">
                            <div className="column small-1">
                                <p>img</p>
                            </div>
                            <div className="column small-4">
                                <h4>{review.name}</h4>
                            </div>
                            <div className="column small-1">
                                <h4>STARS</h4>
                            </div>
                            <div className="column small-offset-1 small-1">
                                <p>{review.created_at}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <p>{review.review}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Reviews.propTypes = {};
Reviews.defaultProps = {};

export default Reviews;
