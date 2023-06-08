import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Divider, Drawer, Form, Select, Table, Upload} from "antd";
import {getSharedUsers} from "@features/Contact/redux";

class CustomComponent extends Component {

    // rowSelection object indicates the need for row selection
    rowSelection = {
        onChange        : (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            selected: true,

            // Column configuration not to be checked
            name: record.is_shared,
        }),
    };

    onSelectChange = (selectedRowKeys) => {
        this.props.sharedUsersUpdate(selectedRowKeys)
    }

    render() {
        let {
                onSubmitForm,
                isVisible,
                contact,
            } = this.props

        let sharedUserList   = contact.sharedUserList
        let sharedUserUpdate = contact.sharedUserUpdate
        let errors           = sharedUserUpdate.errors
        let data             = sharedUserUpdate.data

        let dataList        = sharedUserList.data ?? {}
        let list            = dataList.list ?? [];
        let pagination      = dataList.pagination ?? {};
        pagination          = {
            current        : pagination.page ?? 1,
            pageSize       : pagination.size ?? 15,
            total          : pagination.total ?? 0,
            showSizeChanger: false,
            size           : "default",
        }
        let dataListLoading = sharedUserList.loading


        let selectedRowKeys = [];
        list.map((item) => {
            if (item.is_shared === true) {
                selectedRowKeys.push(item.id)
            }
        })

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Drawer
                width={800}
                placement="right"
                maskClosable={false}
                onClose={this.props.onCloseForm}
                visible={isVisible}
                title="Share User"
            >
                <Table
                    size="small"
                    columns={columns()}
                    rowKey={record => record.id}
                    dataSource={list}
                    loading={dataListLoading}
                    pagination={pagination}

                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                />
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
        getSharedUsers: (params) => {
            dispatch(getSharedUsers(params));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomComponent)

const columns = () => {
    return [
        {
            title    : 'ID',
            dataIndex: 'id',
        },
        {
            title    : 'Username',
            dataIndex: 'username',
        },
        {
            title    : 'Email',
            dataIndex: 'email',
        },
        {
            title    : 'Full name',
            dataIndex: 'full_name',
        },
    ]
};
