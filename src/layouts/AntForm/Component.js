import React, {Component} from 'react';
import {Form} from 'antd';

class CustomComponent extends Component {
    render() {
        return <Form
            {...this.props}
        >
            {this.props.children}
        </Form>
    }
}

export default CustomComponent