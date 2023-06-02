import React, {Component} from 'react';
import {Tag} from "antd";

class CustomComponent extends Component {
    render() {
        let color;
        let text;
        switch (this.props.level) {
            case 10:
                color = "#28a745"
                text  = "Good"
                break
            case 20:
                color = "#8c8c8c"
                text  = "Offline"
                break
            case 30:
                color = "#faad14"
                text  = "Alarm"
                break
            case 40:
                color = "#f5222d"
                text  = "Fault"
                break
            default:
                color = "#28a745"
                text  = "Good"
                break
        }

        text = this.props.text ?? text;
        return (
            <Tag className="tag-inverter-status" color={color}>{text}</Tag>
        )
    }
}

export default CustomComponent