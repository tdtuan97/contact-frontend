import React, {Component} from 'react';
import {Card} from "antd";

class CustomComponent extends Component {
    render() {
        return (
            <Card{...this.props}>
                {this.props.children}
            </Card>
        )
    }
}

export default CustomComponent