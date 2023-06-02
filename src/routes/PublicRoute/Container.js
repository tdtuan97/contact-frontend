import React, {Component} from 'react';
import {App} from "../../layouts/App";
import {Auth} from "@layouts";
import {connect} from "react-redux";
import {Route} from "react-router-dom";

class Container extends Component {

    render() {
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
        crud: state.crud,
    }
}

export default connect(mapStateToProps, {})(Container)