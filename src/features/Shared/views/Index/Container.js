import React, {Component} from 'react';
import President from './President';
import {
    getContactShared
} from "@features/Contact/redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class Container extends Component {
    render() {
        return (
            <President/>
        )
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getContactShared(id)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContactShared: (id) => {
            dispatch(getContactShared(id));
        },
    }
}

function mapStateToProps(state) {
    return {
        router : state.router,
        common : state.common,
        contact: state.contact,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))