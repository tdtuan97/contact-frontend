import React, {Component} from 'react';
import {AntButton} from "@layouts";

class CustomComponent extends Component {
    render() {
        return (
            <div className="action-item">
                <AntButton danger htmlType="submit" {...this.props}>
                    Delete
                </AntButton>
            </div>
        )
    }
}

export default CustomComponent