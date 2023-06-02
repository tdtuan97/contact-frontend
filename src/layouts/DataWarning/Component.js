import React, {Component} from 'react';
import {Result} from 'antd';

class CustomComponent extends Component {
    render() {
        let {title} = this.props
        title       = title !== undefined ? title : 'Warning';
        return (
            <div className="warning-wrapper">
                <Result
                    status="warning"
                    title={title}
                />
            </div>
        )
    }
}

export default CustomComponent;
