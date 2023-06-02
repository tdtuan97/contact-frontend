import React, {Component} from 'react';
import { Select} from 'antd';

class CustomComponent extends Component {
    render() {
        return (
            <Select.Option
                {...this.props}
            >
                {this.props.children}
            </Select.Option>
        )
    }
}

export default CustomComponent