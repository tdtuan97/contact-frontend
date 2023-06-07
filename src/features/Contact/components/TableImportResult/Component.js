import React, {Component} from 'react';
import {Table, Tag, Typography} from "antd";

class CustomComponent extends Component {
    render() {
        let list = this.props.list ?? []
        let pagination = {
            pageSize: 15,
            total: list.length,
            showSizeChanger: false,
            size: "default",
        }

        return (
            <div>
                Import results
                <Table
                    size="small"
                    columns={columns()}
                    rowKey={record => record.row}
                    dataSource={list}
                    pagination={pagination}
                />
            </div>
        )
    }
}

const columns = () => {
    return [
        {
            title: 'Row',
            dataIndex: 'row',
            render: (value) => <div>
                #{parseInt(value) + 1}
            </div>
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (value) => <div className="group-button">
                {
                    value === 'success' ?
                    <Tag color="success">Success</Tag>
                    :
                    <Tag color="error">Error</Tag>
                }
            </div>
        },
        {
            title: 'Errors',
            dataIndex: 'errors',
            render: (value, item) => <div>
                {
                    value.map((err, idx) => {
                        return <div key={`row-${item.row.toString()}-err-${idx}`}>
                            <Typography.Text type="danger">• {err}</Typography.Text>
                        </div>
                    })
                }
            </div>
        },
    ]
};

export default CustomComponent