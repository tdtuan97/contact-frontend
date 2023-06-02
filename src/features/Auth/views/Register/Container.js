import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {register} from "@features/Auth/redux/actions";

class Container extends Component {
    handleRegister = (data) => {
        this.props.register(data)
    }

    render() {
        let crud = this.props.crud;
        if (crud.status === 200) {
            crud.message = "Register success"
        }
        return (<President
            crud={this.props.crud}
            handleRegister={this.handleRegister}/>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => {
            dispatch(register(data));
        },
    };
}


function mapStateToProps(state) {
    return {
        auth: state.auth,
        crud: state.crud
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)