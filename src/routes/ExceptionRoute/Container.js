import React, {Component} from 'react';
import {App} from "@layouts";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {Auth} from "@layouts";

class Container extends Component {
    render() {
        const auth = this.props.auth;
        const user = auth.user;

        let component;
        // Check auth
        if (user.id === null || user.id === undefined) {
            component = <Auth>{this.props.children}</Auth>
        }
        else {
            component = <App>{this.props.children}</App>
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