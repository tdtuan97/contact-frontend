import React, {Component} from 'react';
import { Input} from 'antd';

class CustomComponent extends Component {
    render() {
        return (
            <Input
                {...this.props}
            >
                {this.props.children}
            </Input>
        )
    }
}

export default CustomComponent