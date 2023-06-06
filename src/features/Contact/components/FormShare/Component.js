import React, {Component} from 'react';
import {connect} from "react-redux";
import {Divider, Drawer, Form, Select} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    Loading
} from "@layouts";

const initValues = {
    id          : null,
    name        : "",
    email       : "",
    phone_number: "",
    group_id    : null,
    is_public   : null,
}

class CustomComponent extends Component {
    formRef = React.createRef();

    componentDidUpdate(prevProps) {
        const prevDetail    = prevProps.contact.detail;
        const currentDetail = this.props.contact.detail;

        const prevUpdate    = prevProps.contact.update;
        const currentUpdate = this.props.contact.update;

        const prevCreate    = prevProps.contact.create;
        const currentCreate = this.props.contact.create;

        if (prevDetail.data.id !== currentDetail.data.id) {
            let data = currentDetail.data;
            if (this.formRef.current) {
                this.formRef.current.setFieldsValue({
                    id          : data.id,
                    name        : data.name ?? "",
                    email       : data.email ?? "",
                    phone_number: data.phone_number ?? "",
                    group_id    : data.group_name ?? null,
                    is_public   : data.is_public === 1 ? 'Public' : 'Private',
                })
            }
        }

        // Update success => Close
        if (prevUpdate.data.id !== currentUpdate.data.id) {
            /*setTimeout(() => {
                this.onCloseForm();
            }, 1000)*/
        }

        // Update success => Close
        if (prevCreate.data.id !== currentCreate.data.id) {
            setTimeout(() => {
                this.onCloseForm();
            }, 1000)
        }
    }

    onCloseForm = () => {
        this.resetForm();
        this.props.onCloseForm();
    }

    resetForm = () => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                ...initValues
            })
        }
    }

    render() {
        let {
                onSubmitForm,
                isVisible,
                contact,
                masterData,
            } = this.props

        let {create, detail, update} = contact;
        let dataDetail               = detail.data ?? {};

        const isDetail = !!dataDetail.id

        // Response data
        const updateLoading = update.loading;
        const createLoading = create.loading;
        const formTitle     = isDetail ? `Contact #${dataDetail.id}` : "New Contact";
        let errors          = isDetail ? update.errors : create.errors;

        errors = errors ?? {};

        const loadingDetail = detail.loading;

        let selectGroupsData = masterData.listContactGroup.data ?? {};
        selectGroupsData = selectGroupsData.list ?? [];
        let selectGroupsLoading = masterData.listContactGroup.loading;
        return (
            <Drawer
                width={800}
                placement="right"
                maskClosable={false}
                onClose={this.onCloseForm}
                visible={isVisible}
                title={formTitle}
            >
                {loadingDetail ? <Loading overwrite/> : null}
                <Form
                    className="form-center form-custom"
                    onFinish={(data => onSubmitForm(data))}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    ref={this.formRef}
                    initialValues={initValues}
                >
                    <AntFormItem
                        hidden={true}
                        name="id"
                    >
                        <AntInput/>
                    </AntFormItem>
                    <AntFormItem
                        required={true}
                        label="Contact Name"
                        name="name"
                        errors={errors.name}
                    >
                        <AntInput readOnly={true} placeholder="Enter contact name"/>
                    </AntFormItem>
                    <AntFormItem
                        required={true}
                        label="Phone Number"
                        name="phone_number"
                        errors={errors.phone_number}
                    >
                        <AntInput readOnly={true} placeholder="Enter contact phone number"/>
                    </AntFormItem>
                    <AntFormItem
                        required={true}
                        label="Email"
                        name="email"
                        errors={errors.email}
                    >
                        <AntInput readOnly={true} placeholder="Enter contact email"/>
                    </AntFormItem>
                    <AntFormItem
                        label="Is Public"
                        name="is_public"
                        errors={errors.is_public}
                    >
                        <AntInput readOnly={true}/>
                    </AntFormItem>
                    <AntFormItem
                        label="Group"
                        name="group_id"
                        errors={errors.group_id}
                    >
                        <AntInput readOnly={true}/>
                    </AntFormItem>
                    <Divider style={{marginBlock: 24}}/>
                    <div className="text-center group-button">
                        <AntButton
                            onClick={this.onCloseForm}
                        >
                            Cancel
                        </AntButton>
                    </div>
                </Form>

            </Drawer>
        )
    }
}

function mapStateToProps(state) {
    return {
        common    : state.common,
        masterData: state.masterData,
        contact   : state.contact,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)
