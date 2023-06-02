import React, {Component} from 'react';
import {Tag} from "antd";

class CustomComponent extends Component {
    render() {
        let color;
        let text;
        switch (this.props.level) {
            case 10:
                color = "green"
                text  = "Open"
                break
            case 20:
                color = "blue"
                text  = "Processing"
                break
            case 30:
            default:
                color = "default"
                text  = "Close"
                break
        }

        text = this.props.text ?? text;
        return (
            <Tag className="tag-ticket-status" color={color}>{text}</Tag>
        )
    }
}

export default CustomComponent