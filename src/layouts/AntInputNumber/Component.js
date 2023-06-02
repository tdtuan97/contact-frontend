import React, {Component} from 'react';
import { InputNumber} from 'antd';

class CustomComponent extends Component {
    render() {
        return (
            <InputNumber
                {...this.props}
            >
                {this.props.children}
            </InputNumber>
        )
    }
}

export default CustomComponent