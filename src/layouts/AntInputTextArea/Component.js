import React, {Component} from 'react';
import { Input} from 'antd';

class CustomComponent extends Component {
    render() {
        const rows = {... this.props}
        return (
            <Input.TextArea
                rows={rows}
                {...this.props}
            >
                {this.props.children}
            </Input.TextArea>
        )
    }
}

export default CustomComponent