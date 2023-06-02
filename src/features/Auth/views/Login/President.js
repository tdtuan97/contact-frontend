import React, {Component} from 'react';
import {Form, Input} from "antd";
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {AntButton, AntFormItem,} from "@layouts";
import {Link} from "react-router-dom";

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
                        errors={errors.email}
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
                            placeholder="Password"
                        />
                    </AntFormItem>
                    <AntButton
                        className="btn-main-primary"
                        type="primary"
                               htmlType="submit"
                               block={true}
                               loading={this.props.loading}
                    >
                        Login
                    </AntButton>
                </Form>
                {/*<div className="form-option">
                    Forgot your password ? <Link to={'/password-request'}>Reset</Link>
                </div>*/}
                <div className="form-option">
                    or <Link to={'/register'}>Register</Link>
                </div>
            </div>
        )
    }
}

export default President;