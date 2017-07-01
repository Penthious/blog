import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SidebarLink = props => (
    <div
        className={
            `row vertical-alignment ${props.className ? props.className : ""} ${props.path ===
                props.a
                ? "bg-black"
                : ""}`
        }
    >
        {props.img
            ? <div className="column small-2">
                <img src={props.img} alt="" />
            </div>
            : null}
        <div className={"column"}>
            {props.tag
                ? props.a
                      ? <Link to={props.a} style={{ color: props.color }}>
                          <props.tag>{props.text}</props.tag>
                      </Link>
                      : <props.tag style={{ color: props.color }}>
                          {props.text}
                      </props.tag>
                : null}
        </div>

        {props.feedback.length > 0
            ? <div className="column">
                <p className="white">{props.feedback.length}</p>
            </div>
            : null}
    </div>
);

SidebarLink.propTypes = {
    tag: PropTypes.string,
    a: PropTypes.string,
    color: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.string,
};
SidebarLink.defaultProps = {
    feedback: [],
};

export default SidebarLink;
