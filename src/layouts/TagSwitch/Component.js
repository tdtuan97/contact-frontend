import React, {Component} from 'react';
import {Tag} from "antd";

class CustomComponent extends Component {
    render() {
        let color = this.props.true ? "#108ee9" : "#cf1322"
        let text  = this.props.true ? "ON" : "OFF"

        return (
            <Tag color={color}>{text}</Tag>
        )
    }
}

export default CustomComponent