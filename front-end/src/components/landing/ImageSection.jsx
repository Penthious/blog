import React, { Component } from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

class ImageSection extends Component {
    static propTypes = {
        title: PropTypes.string,
        img: PropTypes.string,
        bgImg: PropTypes.bool,
        text: PropTypes.string,
        inverted: PropTypes.bool,
    };

    bgImg = () => ClassNames({
        bgImageSection: this.props.bgImg,
    });

    renderImage = () => (
        <div className="column text-center">
            <img src={this.props.img} alt="" />
        </div>
    );

    renderText = () => (
        <div className="column">
            <div className="row">
                <div className="column">
                    <h1 className="h1">{this.props.title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <h3 className="h3">{this.props.text}</h3>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <button className="button">SIGN UP</button>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div className={this.bgImg()}>

                <div className="row">
                    {this.props.inverted ? this.renderText() : this.renderImage()}
                    {this.props.inverted ? this.renderImage() : this.renderText()}
                </div>
            </div>
        );
    }
}
export default ImageSection;
