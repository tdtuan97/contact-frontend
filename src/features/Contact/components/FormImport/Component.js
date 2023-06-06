import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Drawer, Form, Select, Upload} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    Loading
} from "@layouts";
import {UploadOutlined} from "@ant-design/icons";
import {applyToken} from "@common/crud/actions";
import {resetStore} from "@features/Common/redux";
import {setUploadFile} from "@features/Contact/redux";

const initValues = {
    id          : null,
    name        : "",
    email       : "",
    phone_number: "",
    group_id    : null,
    is_public   : null,
}

const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

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

    uploadConfigs = () => {
        let token      = ''
        let action     = "http://127.0.0.1:7001/api/v1/import/upload"
        let apiConfigs = applyToken({})
        return {
            name    : "file",
            headers : apiConfigs.headers,
            action  : action,
            maxCount: 1,
        }
    }

    onChangeUpload = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            let uploadResponse = info.file.response ?? {};
            let uploadData     = uploadResponse.data ?? {}
            let filename       = uploadData.filename ?? null
            this.props.setUploadFile(filename)
        } else if (info.file.status === 'error') {
            this.props.setUploadFile(null)
        }
    }

    render() {
        let {
                onSubmitForm,
                isVisible,
                contact,
                masterData,
            } = this.props

        let contactImport = contact.import
        let errors        = contact.import.errors

        return (
            <Drawer
                width={800}
                placement="right"
                maskClosable={false}
                onClose={this.onCloseForm}
                visible={isVisible}
                title="Import Contacts"
            >
                <Form
                    className="form-center form-custom"
                    onFinish={(data => onSubmitForm(data))}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    ref={this.formRef}
                    initialValues={initValues}
                >
                    <AntFormItem
                        name="file"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload {...this.uploadConfigs()} onChange={this.onChangeUpload}>
                            <Button icon={<UploadOutlined/>}>Click to upload</Button>
                        </Upload>
                    </AntFormItem>
                    <Divider style={{marginBlock: 24}}/>
                    <div className="text-center group-button">
                        <AntButton
                            className="btn-primary"
                            htmlType="submit"
                            loading={contactImport.loading}
                        >
                            Import
                        </AntButton>
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

function mapDispatchToProps(dispatch) {
    return {
        setUploadFile: (filename) => {
            dispatch(setUploadFile(filename));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomComponent)
