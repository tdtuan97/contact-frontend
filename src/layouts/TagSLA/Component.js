import React, {Component} from 'react';
import {Tag} from "antd";

class CustomComponent extends Component {
    render() {
        let color;
        switch (this.props.level) {
            case 10:
                color = "#28a745"
                break
            case 20:
                color = "#8c8c8c"
                break
            case 30:
                color = "#faad14"
                break
            case 40:
                color = "#f5222d"
                break
            default:
                color = "#28a745"
                break
        }

        let text = this.props.text ?? "-";
        return (
            <Tag className="tag-sla-level" color={color}>{text}</Tag>
        )
    }
}

export default CustomComponent