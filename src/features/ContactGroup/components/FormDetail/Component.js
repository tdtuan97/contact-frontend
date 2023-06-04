import React, {Component} from 'react';
import {connect} from "react-redux";
import {Divider, Drawer, Form} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput, AntInputTextArea,
    Loading
} from "@layouts";

const initValues = {
    id         : null,
    name       : "",
    description: "",
}

class CustomComponent extends Component {
    formRef = React.createRef();

    componentDidUpdate(prevProps) {
        const prevDetail    = prevProps.contactGroup.detail;
        const currentDetail = this.props.contactGroup.detail;

        const prevUpdate    = prevProps.contactGroup.update;
        const currentUpdate = this.props.contactGroup.update;

        const prevCreate    = prevProps.contactGroup.create;
        const currentCreate = this.props.contactGroup.create;

        if (prevDetail.data.id !== currentDetail.data.id) {
            let data = currentDetail.data;
            if (this.formRef.current) {
                this.formRef.current.setFieldsValue({
                    id         : data.id,
                    name       : data.name ?? "",
                    description: data.description ?? "",
                })
            }
        }

        // Update success => Close
        if (prevUpdate.data.id !== currentUpdate.data.id) {
            /*setTimeout(() => {
                this.onCloseForm();
            }, 1000)*/
        }

        // Create success => Close
        if (prevCreate.data.id !== currentCreate.data.id) {
            this.onCloseForm();
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
                isVisibleFormDetail,
                contactGroup,
            } = this.props

        let {create, detail, update} = contactGroup;
        let dataDetail                     = detail.data ?? {};

        const isDetail = !!dataDetail.id

        // Response data
        const updateLoading = update.loading;
        const createLoading = create.loading;
        const formTitle     = isDetail ? `Contact Group #${dataDetail.id}` : "New Contact Group";
        let errors          = isDetail ? update.errors : create.errors;

        errors = errors ?? {};

        const loadingDetail = detail.loading;

        return (
            <Drawer
                className="rule-form"
                width={800}
                placement="right"
                maskClosable={false}
                onClose={this.onCloseForm}
                visible={isVisibleFormDetail}
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
                        label="Name"
                        name="name"
                        errors={errors.name}
                    >
                        <AntInput placeholder="Enter group name"/>
                    </AntFormItem>
                    <AntFormItem
                        required={true}
                        label="Description"
                        name="description"
                        errors={errors.description}
                    >
                        <AntInputTextArea rows={10} placeholder="Enter group description"/>
                    </AntFormItem>
                    <Divider style={{marginBlock: 24}}/>
                    <div className="text-center group-button">
                        {
                            dataDetail.id ?
                                <AntButton
                                    className="btn-primary"
                                    htmlType="submit"
                                    loading={updateLoading}
                                >
                                    Update
                                </AntButton> :
                                <AntButton
                                    className="btn-success"
                                    htmlType="submit"
                                    loading={createLoading}
                                >
                                    Save
                                </AntButton>
                        }
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
        common      : state.common,
        contactGroup: state.contactGroup,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)
