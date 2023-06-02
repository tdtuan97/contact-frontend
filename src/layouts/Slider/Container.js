import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken} from "@features/Auth/redux/actions";
import {withRouter} from "react-router-dom";

class Container extends Component {
    handleLogout = () => {
        this.props.clearToken();
    }

    randomAvatar = () => {
        return (
            <div style={{
                backgroundColor: this.props.common.randomColor,
                lineHeight: "24px"
            }}>
                {this.props.auth.user.full_name.toString().substring(0,1)}
            </div>
        );
    }

    render() {
        return (
            <President
                {...this.props}
                handleLogout={this.handleLogout}
                match={this.props.match}
                randomAvatar={this.randomAvatar()}
            />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToken: () => {
            dispatch(clearToken());
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth  : state.auth,
        common: state.common,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))