import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {register} from "@features/Auth/redux/actions";
import {Redirect, withRouter} from "react-router-dom";
import {resetStore} from "@features/Common/redux";

class Container extends Component {
    handleRegister = (data) => {
        let password = data.password !== undefined ? data.password : '';
        password     = Buffer.from(password).toString('base64')
        this.props.register({
            email     : data.email ?? "",
            username  : data.username ?? "",
            first_name: data.first_name ?? "",
            last_name : data.last_name ?? "",
            password  : password,
        })
    }

    render() {
        return (<President
            crud={this.props.crud}
            handleRegister={this.handleRegister}/>)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.auth.register.success !== this.props.auth.register.success) {
            if (this.props.auth.register.success === true) {
                console.log(this.props)
                console.log(this.props.history)
                this.props.history.push('/register-success');
            }
        }
    }

    componentWillUnmount() {
        this.props.resetStore()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore: () => {
            dispatch(resetStore());
        },
        register: (data) => {
            dispatch(register(data));
        },
    };
}

function mapStateToProps(state) {
    return {
        auth  : state.auth,
        crud  : state.crud,
        common: state.common,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))