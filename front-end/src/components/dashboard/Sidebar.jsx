import React, { Component } from "react";
import SidebarLink from "./SidebarLink";
import dashboardSVG from "../../assets/images/menu-dashboard.svg";
import feedbackSVG from "../../assets/images/menu-feedback.svg";
import emailsSVG from "../../assets/images/menu-emails.svg";
import accountSVG from "../../assets/images/menu-account.svg";
import historySVG from "../../assets/images/menu-history.svg";
import logoutSVG from "../../assets/images/menu-logout.svg";
import routes from "../../routes";

class Sidebar extends Component {
    renderBusiness = () => this.props.name
        ? <div>
            <div className="row">
                <div className="column">
                    {Boolean(this.props.image) === true
                          ? <img src={`${config.APP_URL}storage${this.props.image}`} alt="" />
                          : null}
                </div>
            </div>
            <SidebarLink tag="h2" text={this.props.name} color="white" />
            <SidebarLink tag="p" text={this.props.address} color="white" />
            <SidebarLink
                tag="p"
                text={`${this.props.city}, ${this.props.state}, ${this.props.zip}`}
                color="white"
              />
        </div>
        : null;

    render() {
        return (
            <div>
                {this.renderBusiness()}
                <SidebarLink
                    path={this.props.path}
                    img={dashboardSVG}
                    tag="h4"
                    text="DASHBOARD"
                    a={routes.dashboard}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                />
                <SidebarLink
                    path={this.props.path}
                    img={feedbackSVG}
                    tag="h4"
                    text="FEEDBACK"
                    a={`${routes.dashboard}${routes.feedback}`}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                    feedback={this.props.feedback}
                />
                <SidebarLink
                    path={this.props.path}
                    img={emailsSVG}
                    tag="h4"
                    text="EMAILS"
                    a={`${routes.dashboard}${routes.emails}`}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                />
                <SidebarLink
                    path={this.props.path}
                    img={accountSVG}
                    tag="h4"
                    text="ACCOUNT DETAILS"
                    a={`${routes.dashboard}${routes.accountDetails}`}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                />
                <SidebarLink
                    path={this.props.path}
                    img={historySVG}
                    tag="h4"
                    text="SENT HISTORY"
                    a={`${routes.dashboard}${routes.sentHistory}`}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                />
                <SidebarLink
                    img={logoutSVG}
                    tag="h4"
                    text="LOG OUT"
                    a={routes.logout}
                    color="white"
                    className="pad-btm-10 pad-top-10"
                />
            </div>
        );
    }
}

Sidebar.propTypes = {};
Sidebar.defaultProps = {};

export default Sidebar;
