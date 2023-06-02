import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {Result, Button} from 'antd';

class CustomComponent extends Component {
    render() {
        const {code, message, homepage} = this.props
        return (
            <Result
                status={code}
                title={code}
                subTitle={message}
                extra={
                    <Button type="primary">
                        <Link to={homepage !== undefined ? homepage : '/'}>
                            Back to home
                        </Link>
                    </Button>
                }
            />
        )
    }
}

export default CustomComponent