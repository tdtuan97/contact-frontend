import React, {Component} from 'react';
import {connect} from "react-redux";
import {AntButton, AntCard, ToolboxControl} from "@layouts";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Col, Input, Row, Table} from "antd";
import {withRouter} from "react-router-dom";
import {
    getContacts,
} from "@features/Contact/redux";

class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            queries   : {
                name: ""
            }
        }
    }

    /**
     * On change search text
     * @param e
     */
    onChangeSearchText = (e) => {
        this.setState({
            ...this.state,
            queries: {
                name: e.currentTarget.value
            }
        })
    }

    /**
     * On search
     * @param text
     */
    onSearch = (text) => {
        this.setState({
            ...this.state,
            queries: {
                name: text
            }
        }, this.props.getContacts({
            name: text,
        }))
    }

    /**
     * On change table
     * @param pagination
     * @param filters
     * @param sorter
     */
    onChangeTable = (pagination, filters, sorter) => {
        // Sort by field
        let sortBy = sorter.field ?? 'id';

        // Order by
        let orderBy = sorter.order ?? "ascend";
        orderBy     = orderBy === "ascend" ? 'ASC' : 'DESC';

        // Paginate
        let page = pagination !== undefined ? pagination.current : 1;
        this.props.getContacts({
            sortBy : sortBy,
            orderBy: orderBy,
            page   : page,
            ...filters,
            ...this.state.queries,
        });
    }

    render() {
        const {list}          = this.props.contact
        const {loading, data} = list
        const {
                  onClickNew,
                  onClickEdit,
                  onShowConfirmDelete,
              }               = this.props

        let dataPagination = data.pagination ?? {}
        let pagination     = {
            current        : dataPagination.page ?? 1,
            pageSize       : dataPagination.size ?? 15,
            total          : dataPagination.total ?? 0,
            showSizeChanger: false,
            size           : "default",
        }

        let searchText = this.state.queries.name;

        return (
            <AntCard
                className={"rule-list card-custom"}
                title={
                    <div className="card-custom-title">
                        <div className="card-information">
                            List of contact
                        </div>
                        <ToolboxControl
                            btnAddShow={true}
                            btnAddText={"New"}
                            btnAddClick={onClickNew}
                        />
                    </div>
                }
            >
                <div>
                    <div className="search-group">
                        <Row gutter={{xs: 8, sm: 12, md: 12}}>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-keyword">
                                    {/*<span className="input-label">Keyword:</span>*/}
                                    <Input.Search
                                        placeholder="Search group by name"
                                        //suffix={<SearchOutlined/>}
                                        //value={searchText}
                                        //onChange={this.onChangeName}
                                        allowClear
                                        enterButton
                                        onChange={this.onChangeSearchText}
                                        value={searchText}
                                        onSearch={this.onSearch}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Table
                        size="small"
                        columns={columns(onClickEdit, onShowConfirmDelete)}
                        rowKey={record => record.id}
                        dataSource={data.list ?? []}
                        loading={loading}
                        pagination={pagination}
                        onChange={(pagination, filters, sorter) => this.onChangeTable(pagination, filters, sorter)}
                    />
                </div>
            </AntCard>
        )
    }
}

const columns = (onShowDetail, showConfirmDelete) => {
    return [
        {
            title    : 'ID',
            dataIndex: 'id',
        },
        {
            title    : 'Contact Name',
            dataIndex: 'name',
        },
        {
            title    : 'Contact Email',
            dataIndex: 'email',
        },
        {
            title    : 'Contact Phone Number',
            dataIndex: 'phone_number',
        },
        {
            title    : 'Group Name',
            dataIndex: 'group_name',
        },
        {
            title    : 'Created At',
            dataIndex: 'created_at',
        },
        {
            title    : 'Updated At',
            dataIndex: 'updated_at',
        },
        {
            width : 100,
            align : 'center',
            title : 'Action',
            render: (value, item) => <div className="group-button">
                <AntButton
                    icon={<EditOutlined/>}
                    type="primary" ghost
                    value={item.id}
                    onClick={onShowDetail}
                >
                </AntButton>
                <AntButton
                    icon={<DeleteOutlined/>}
                    type="danger" ghost
                    value={item.id}
                    onClick={showConfirmDelete}
                />
            </div>
        },
    ]
};

function mapStateToProps(state) {
    return {
        common : state.common,
        contact: state.contact,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: (params) => {
            dispatch(getContacts(params));
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomComponent))