import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Drawer, Form, Select, Upload} from "antd";
import {
    AntButton,
    AntFormItem,
} from "@layouts";
import {UploadOutlined} from "@ant-design/icons";
import {applyToken, generateUrl} from "@common/crud/actions";
import {setUploadFile} from "@features/Contact/redux";
import {TableImportResult} from "@features/Contact/components";
import {Link} from "react-router-dom";

const importTemplateLink = process.env.REACT_APP_IMPORT_TEMPLATE_LINK

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
        let action     = generateUrl('import/upload')
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
            } = this.props

        let contactImport = contact.import
        let errors        = contact.import.errors
        let data        = contact.import.data

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
                        label="Import Template"
                    >
                        <Link to={{
                            pathname: importTemplateLink
                        }} target="_blank" download>Download Now</Link>
                    </AntFormItem>
                    <AntFormItem
                        name="file"
                        label="Upload"
                        valuePropName="fileList"
                        errors={errors.filename}
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
                <>
                    <Divider style={{marginBlock: 24}}/>
                    <TableImportResult list={data}/>
                </>
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
