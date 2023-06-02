import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';

class Container extends Component {
    render() {
        return (<President {...this.props}/>)
    }
}

function mapStateToProps(state) {
    return {
        router: state.router
    }
}

export default connect(mapStateToProps, {})(Container)