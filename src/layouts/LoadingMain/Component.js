import React, {Component} from 'react';
import {Spin} from "antd";

class Loading extends Component {
    render() {
        return (
            <div className="loading-main-wrapper">
                <Spin className="loading-spin" size="large" tip="Loading..."/>
            </div>
        )
    }
}

export default Loading;
