import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Button, Result } from 'antd';

class President extends Component {
    render() {
        return (
            <Result
                status="success"
                title="You have registration success"
                subTitle="Please click button below to redirect to login page."
                extra={[
                    <Button type="primary" key="console">
                        <Link to={'/login'}>Login Now!</Link>
                    </Button>

                ]}
            />
        )
    }
}

export default President;