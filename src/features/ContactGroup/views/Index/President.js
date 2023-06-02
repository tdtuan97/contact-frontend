import React, {Component} from 'react';
import {Table} from 'antd';
import {Link} from "react-router-dom";
import helpers from "@ultis/helpers";

const columns = [
    {
        title    : 'ID',
        dataIndex: 'id',
        sorter   : true,
        render   : id => <Link to={'/products/detail/' + id}>{id}</Link>,
        width    : '150px',
        align    : 'center',
    },
    {
        title    : 'Tên sản phẩm',
        dataIndex: 'name',
        sorter   : true,
        width    : '40%',
    },
    {
        title    : 'Đơn vị',
        dataIndex: 'unit',
    },
    {
        title    : 'Đơn giá',
        dataIndex: 'price',
        sorter   : true,
        render   : price => helpers.formatCash(price),
    },
];

class President extends Component {
    render() {
        let {data, pagination, loading} = this.props;
        return (
            <div className="features feature-product">
                <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={(pagination, filters, sorter) => this.props.handleTableChanges(pagination, filters, sorter)
                    }
                />
            </div>
        )
    }
}

export default President;