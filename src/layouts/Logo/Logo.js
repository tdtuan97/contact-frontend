import React, {Component} from 'react';
import logo from '@images/logo.png';

class Logo extends Component {
    render() {
        const src = this.props.src ?? null
        return (
            <img src={src ?? logo} className="common-logo" alt="logo"/>
        )
    }
}

export default Logo;
