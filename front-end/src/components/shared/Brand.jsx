import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import logo from "../../assets/images/logo.svg";

const Brand = () => (
    <div className="branding-wrap">
        <div className="row align-middle">
            <div className="column shrink">
                <img src={logo} alt="" />
            </div>
            <div className="column">
                <Link to={routes.home}>
                    <h5 className="h5">LEGIT LOCAL REVIEWS</h5>
                </Link>
            </div>
        </div>
    </div>
);

Brand.propTypes = {};
Brand.defaultProps = {};

export default Brand;
