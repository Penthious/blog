import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

const FocusArea = () => (
    <div className="bg-img">
        <div className="row align-middle focus-content">
            <div className="column">
                <h1 className="h1 small-10">GET GENUINE CUSTOMER REVIEWS</h1>
                <div className="row">
                    <div className="column">
                        <h3 className="h3">HELP YOUR BUSINESS GET MORE FEEDBACK</h3>
                    </div>
                </div>
                <div className="row marg-top-40">
                    <div className="column large-2">
                        <button className="button">
                            <Link className="white" to="/register">
                                SIGN UP
                            </Link>
                        </button>
                    </div>
                    <div className="column">
                        <button className="button small-offset-2 hollow">
                            <Link className="white" to="/login">
                                SIGN IN
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row small-12">
                <div className="column small-offset-11">
                    <div className="row">
                        <div className="column">
                            <p className="scroll">SCROLL</p>
                        </div>
                    </div>
                    <div className="row font-awesome">
                        <div className="column">
                            <FontAwesome className="font-awesome" name="long-arrow-down" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

FocusArea.propTypes = {};
FocusArea.defaultProps = {};

export default FocusArea;
