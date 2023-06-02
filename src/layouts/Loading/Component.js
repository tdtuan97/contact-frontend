import React, {Component} from 'react';
import {Spin} from "antd";

class Loading extends Component {
    render() {
        let size = this.props.size !== undefined ? this.props.size : "small";
        let overwrite= this.props.overwrite !== undefined
        return (
            <div className={"loading-wrapper " + (overwrite ? 'overwrite' : '')}>
                <Spin className="loading-spin" size={size} tip="Loading..."/>
            </div>
        )
    }
}

export default Loading;
