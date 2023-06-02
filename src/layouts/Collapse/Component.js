import React, {Component} from 'react';
import {UpCircleOutlined, DownCircleOutlined} from "@ant-design/icons";
import {Divider} from "antd";

class CustomComponent extends Component {
    onClickControl = () => {
        let {isCollapsed, onCollapsed} = this.props
        onCollapsed(!isCollapsed)
    }

    render() {
        let {isCollapsed} = this.props

        // Render data
        let icon      = <UpCircleOutlined/>;
        let label     = "Less Details";
        let className = "collapse-content";
        if (isCollapsed === true) {
            icon  = <DownCircleOutlined/>
            label = "More Details";
            className += " hide"
        }
        return (
            <div className="custom-collapse">
                <div className="collapse-header">
                    <Divider className="collapse-control-wrap">
                         <span className="collapse-control highlight" onClick={this.onClickControl}>
                             {icon} {label}
                         </span>
                    </Divider>
                </div>
                <div className={className}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default CustomComponent