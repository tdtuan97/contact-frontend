import React, {Component} from 'react';
import {Button, Result} from "antd";
import {SmileOutlined} from "@ant-design/icons";

class President extends Component {
    render() {
        return (
            <div className="features feature-dashboard">
                <Result
                    icon={<SmileOutlined />}
                    title="Great, we have done all the operations!"
                    /*extra={<Button type="primary">Next</Button>}*/
                />
            </div>
        )
    }
}

export default President;