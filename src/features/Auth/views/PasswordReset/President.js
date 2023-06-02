import React, {Component} from 'react';
import {Form, Input} from "antd";
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {AntButton, AntFormItem,} from "@layouts";

class President extends Component {
    render() {
        const {errors} = this.props.crud;

        return (
            <div className="feature-auth-login">
                <Form
                    className="ant-form ant-form-vertical"
                    onFinish={(data => this.props.handleLogin(data))}
                >
                    <AntFormItem
                        errors={errors.username}
                        name="email"
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                        />
                    </AntFormItem>
                    <AntFormItem
                        errors={errors.password}
                        name="password"
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="New password"
                        />
                    </AntFormItem>
                    <AntFormItem
                        errors={errors.password}
                        name="password"
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Confirm new password"
                        />
                    </AntFormItem>
                    <AntButton type="primary"
                               htmlType="submit"
                               block={true}
                               loading={this.props.loading}
                    >
                        Reset
                    </AntButton>
                </Form>
            </div>
        )
    }
}

export default President;