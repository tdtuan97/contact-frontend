import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken} from "@features/Auth/redux/actions";
import {setBrowserExitFullScreen, setBrowserFullScreen, toggleSider} from "@features/Common/redux";

class Container extends Component {

    render() {
        return (<President
            {...this.props}
            handleToggleSider={this.props.toggleSider}
            handleFullScreen={this.props.setBrowserFullScreen}
            handleExitFullScreen={this.props.setBrowserExitFullScreen}
        />)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToken              : () => {
            dispatch(clearToken());
        },
        toggleSider             : () => {
            dispatch(toggleSider());
        },
        setBrowserFullScreen       : () => {
            dispatch(setBrowserFullScreen());
        }, setBrowserExitFullScreen: () => {
            dispatch(setBrowserExitFullScreen());
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)