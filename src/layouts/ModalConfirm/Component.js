import React, {Component} from 'react';
import {Modal} from 'antd';

class CustomComponent extends Component {
    render() {
        let {onOk, onCancel, visible, message, title} = this.props;
        title = undefined ? "Confirm" : title;
        return (
            <Modal
                title={title}
                onOk={onOk}
                onCancel={onCancel}
                visible={visible}
                okText="OK"
                cancelText="Cancel"
            >
                <p>{message}</p>
            </Modal>
        )
    }
}

export default CustomComponent