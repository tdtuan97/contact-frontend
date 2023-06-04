import React, {Component} from 'react';
import {Form, Input, Button} from "antd";
import {UserOutlined, LockOutlined, MailOutlined, FileTextOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {AntFormItem} from "@layouts";

class President extends Component {
    render() {
        const {errors} = this.props.crud;

        return (
            <div className="feature-auth-reset">
                <Form className="ant-form ant-form-vertical"
                      onFinish={(data => this.props.handleRegister(data))}
                >
                    <AntFormItem
                        name="email"
                        errors={errors.email}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                        />
                    </AntFormItem>
                    <AntFormItem
                        name="username"
                        errors={errors.username}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Username"
                        />
                    </AntFormItem>
                    <AntFormItem
                        name="first_name"
                        errors={errors.first_name}
                    >
                        <Input
                            prefix={<FileTextOutlined className="site-form-item-icon"/>}
                            placeholder="First name"
                        />
                    </AntFormItem>
                    <AntFormItem
                        name="last_name"
                        errors={errors.last_name}
                    >
                        <Input
                            prefix={<FileTextOutlined className="site-form-item-icon"/>}
                            placeholder="Last name"
                        />
                    </AntFormItem>
                    <AntFormItem
                        name="password"
                        errors={errors.password}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </AntFormItem>
                    <AntFormItem>
                        <Button type="primary"
                                htmlType="submit"
                                disabled={this.props.crud.pending}
                                block>
                            Register
                        </Button>
                    </AntFormItem>
                </Form>
                <div className="form-option">
                    or <Link to={'/login'}>Login</Link>
                </div>
            </div>
        )
    }
}

export default President;