import React, {Component} from 'react';
import President from './President';
import {clearToken} from "@features/Auth/redux/actions";
import {connect} from "react-redux";

class Container extends Component {
    render() {
        return (<President {...this.props}/>)
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
        common: state.common,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)