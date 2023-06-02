import React, {Component} from 'react';
import { Select} from 'antd';

class CustomComponent extends Component {
    render() {
        return (
            <Select
                {...this.props}
            >
                {this.props.children}
            </Select>
        )
    }
}

export default CustomComponent