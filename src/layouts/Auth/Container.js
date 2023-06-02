import React, {Component} from 'react';
import President from './President';

class Container extends Component {
    render() {
        return (<President {...this.props}/>)
    }
}

export default Container