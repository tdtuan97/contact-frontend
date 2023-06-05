import React, {Component} from 'react';
import {connect} from "react-redux";
import {AntButton, AntCard, ToolboxControl} from "@layouts";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Col, Input, Row, Select, Table, Tag} from "antd";
import {withRouter} from "react-router-dom";
import {
    getContacts,
} from "@features/Contact/redux";
import {queries} from "@testing-library/react";

const prepareQueries = (queries = {}) => {
    let results = {}
    if (queries.name){
        results = {
            ...results,
            name: queries.name
        }
    }

    if (queries.phone_number){
        results = {
            ...results,
            phone_number: queries.phone_number
        }
    }

    if (queries.email){
        results = {
            ...results,
            email: queries.email
        }
    }

    if (queries.groupIds && queries.groupIds.length > 0){
        results = {
            ...results,
            group_id: queries.groupIds.toString()
        }
    }

    return results;
}

class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            queries: {
                name: "",
                phone_number: "",
                email: "",
                groupIds: [],
            }
        }
    }

    /**
     * On change search text
     * @param e
     */
    onChangeName = (e) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                name: e.currentTarget.value
            }
        })
    }

    onChangeGroupIds = (options) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                groupIds: options
            }
        })
    }

    onChangePhoneNumber = (e) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                phone_number: e.currentTarget.value
            }
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                email: e.currentTarget.value
            }
        })
    }

    /**
     * On search
     */
    onSearch = () => {
        let queries = prepareQueries(this.state.queries)
        this.props.getContacts(queries)
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
        orderBy = orderBy === "ascend" ? 'ASC' : 'DESC';

        // Paginate
        let page = pagination !== undefined ? pagination.current : 1;
        this.props.getContacts({
            sort_by: sortBy,
            order_by: orderBy,
            page: page,
            ...filters,
            ...prepareQueries(this.state.queries),
        });
    }

    render() {
        const {list} = this.props.contact
        const {loading, data} = list
        const {
            onClickNew,
            onClickEdit,
            onShowConfirmDelete,
            masterData
        } = this.props

        let dataPagination = data.pagination ?? {}
        let pagination = {
            current: dataPagination.page ?? 1,
            pageSize: dataPagination.size ?? 15,
            total: dataPagination.total ?? 0,
            showSizeChanger: false,
            size: "default",
        }

        let searchText = this.state.queries.name;
        let searchPhoneNumber = this.state.queries.phone_number;
        let searchEmail = this.state.queries.email;
        let selectedGroupIds = this.state.queries.groupIds;

        let selectGroupsData = masterData.listContactGroup.data ?? {};
        selectGroupsData = selectGroupsData.list ?? [];
        let selectGroupsLoading = masterData.listContactGroup.loading;

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
                                    <div className="input-label">Keyword:</div>
                                    <div className="input-value">
                                        <Input
                                            placeholder="Search group by name"
                                            onChange={this.onChangeName}
                                            allowClear
                                            value={searchText}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-status">
                                    <div className="input-label">Group:</div>
                                    <div className="input-value">
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            placeholder="Search by contact group"
                                            value={selectedGroupIds}
                                            loading={selectGroupsLoading}
                                            style={{width: "100%"}}
                                            tagRender={tagRender}
                                            onChange={this.onChangeGroupIds}
                                        >
                                            {
                                                selectGroupsData ?
                                                    selectGroupsData.map((item, index) => {
                                                        return (
                                                            <Select.Option value={item.id}
                                                                           key={index}>{item.name}
                                                            </Select.Option>
                                                        )
                                                    }) : null
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 12, md: 12}}>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-keyword">
                                    <div className="input-label">Phone Number:</div>
                                    <div className="input-value">
                                        <Input
                                            placeholder="Search contact by phone number"
                                            value={searchPhoneNumber}
                                            onChange={this.onChangePhoneNumber}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-keyword">
                                    <div className="input-label">Email:</div>
                                    <div className="input-value">
                                        <Input
                                            placeholder="Search contact by email"
                                            value={searchEmail}
                                            onChange={this.onChangeEmail}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={{xs: 8, sm: 12, md: 12}}>
                            <Col xs={{
                                span: 12,
                                offset: 6,
                            }} xl={{
                                span: 8,
                                offset: 8,
                            }}>
                                <div className="search-button">
                                    <Button
                                        type="primary"
                                        block={true}
                                        icon={<SearchOutlined/>}
                                        onClick={this.onSearch}
                                    >
                                        Search
                                    </Button>
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
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'Contact Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Contact Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Contact Phone Number',
            dataIndex: 'phone_number',
            sorter: true,
        },
        {
            title: 'Group Name',
            dataIndex: 'group_name',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            sorter: true,
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            sorter: true,
        },
        {
            width: 100,
            align: 'center',
            title: 'Action',
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
        common: state.common,
        contact: state.contact,
        masterData: state.masterData,
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

const tagRender = (props) => {
    const {label, value, closable, onClose} = props;

    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    let color;
    switch (value) {
        case 10:
            color = "green"
            color = "default"
            break
        case 20:
            color = "blue"
            color = "default"
            break
        case 90:
        default:
            color = "default"
            break;
    }

    return (
        <Tag
            color={color}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
                //backgroundColor: "unset"
            }}
        >
            {label}
        </Tag>
    );
};