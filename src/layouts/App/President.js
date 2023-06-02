import React, {Component} from "react";

import { Layout} from 'antd';
import {Header, HeaderSub, Slider} from "../index";
const { Content } = Layout;

class President extends Component {
    render() {
        const {common} = this.props
        return (
        <Layout hasSider className="layout-main">
            <Slider/>
            <Layout
                style={{
                    marginLeft: common.siderCollapsed ? 88 : 208,
                    minHeight: "100vh"
                }}
            >
                <Header/>
                <Layout className="app-content-wrapper">
                    <Content className="app-content">
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        );
    }
}

export default President