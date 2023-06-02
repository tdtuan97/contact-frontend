import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';

class Container extends Component {
    render() {
        return (
            <President />
        )
    }
}

export default Container