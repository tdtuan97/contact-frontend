import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';

class Container extends Component {

    render() {
        return (<President/>)
    }

}

function mapDispatchToProps(dispatch) {
    return {

    };
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)