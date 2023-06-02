import React, {Component} from 'react';
import {App} from "../../layouts/App";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import {Auth} from "@layouts";

class Container extends Component {
    render() {
        const {user, meta} = this.props.auth;
        const permissions           = meta.permissions;
        const role                  = meta.role;

        // Check auth
        if (user.id === null || user.id === undefined) {
            return (
                <Redirect to="/login"/>
            )
        }

        // Check by roles
        const roles = this.props.roles
        if ((typeof roles) === "object" && roles.indexOf(role) === -1) {
            return (
                <Redirect to="/errors/403"/>
            )
        }

        // Check by permission
        /*const permission = this.props.permission
        if ((typeof permission) === "string") {
            let allow = false;
            try {
                for (let i = 0; i < permissions.length; i++) {
                    if (permissions[i].indexOf(permission) !== -1) {
                        allow = true;
                        break
                    }
                }
            } catch (e) {
                console.log(e)
            }

            if (!allow) {
                return (
                    <Redirect to="/errors/403"/>
                )
            }
        }*/

        /*if (this.props.redirectUrl){
            return (
                <Redirect to={this.props.redirectUrl}/>
            )
        }*/

        let component;
        switch (this.props.layout) {
            case 'Auth':
                component = <Auth>{this.props.children}</Auth>
                break;
            default:
                component = <App>{this.props.children}</App>
                break;
        }

        return this.props.exact ?
            (<Route path={this.props.path} exact>{component}</Route>)
            : (<Route path={this.props.path}>{component}</Route>)
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        crud: state.crud,
    }
}

export default connect(mapStateToProps, {})(Container)