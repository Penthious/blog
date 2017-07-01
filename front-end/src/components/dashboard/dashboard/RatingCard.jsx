import React from "react";

const RatingCard = props => (
    <div className={`column ${props.className}`}>
        <div className="card">
            <div className="card-divider">
                <h4>{props.name}</h4>
                <hr />
            </div>
            <div className="row">
                {props.reviews.map(review => (
                    <div className="column small-3" key={Math.random()}>
                        <div className="card-section">
                            <h1>{review}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

RatingCard.propTypes = {};
RatingCard.defaultProps = {};

export default RatingCard;
