import React, {Component} from 'react';
import {Tooltip} from "antd";

class CustomComponent extends Component {
    render() {
        const placement = this.props.placement ? this.props.placement : "right";
        return (
            <Tooltip
                placement={placement}
                {...this.props}
            >
                {this.props.children}
            </Tooltip>
        )
    }
}

export default CustomComponent