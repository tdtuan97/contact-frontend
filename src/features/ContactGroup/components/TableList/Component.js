import React, {Component} from 'react';
import {connect} from "react-redux";
import {AntButton, AntCard, ToolboxControl} from "@layouts";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {Button, Col, Input, Row, Table} from "antd";
import {withRouter} from "react-router-dom";
import {
    getContactGroups,
} from "@features/ContactGroup/redux";

class CustomComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: null,
            queries: {
                name: "",
                description: ""
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
                ...this.state.queries,
                name: e.currentTarget.value
            }
        })
    }

    /**
     * On change description
     * @param e
     */
    onChangeDescription = (e) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                description: e.currentTarget.value
            }
        })
    }

    /**
     * On search
     */
    onSearch = () => {
        this.props.getContactGroups(this.state.queries)
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
        this.props.getContactGroups({
            sort_by: sortBy,
            order_by: orderBy,
            page: page,
            ...filters,
            ...this.state.queries,
        });
    }

    render() {
        const {contactGroup} = this.props
        const {
            onClickNew,
            onClickEdit,
            onShowConfirmDelete,
        } = this.props

        let loading = contactGroup.list.loading
        let data = contactGroup.list.data ?? {}
        let dataPagination = data.pagination ?? {}
        let pagination = {
            current: dataPagination.page ?? 1,
            pageSize: dataPagination.size ?? 15,
            total: dataPagination.total ?? 0,
            showSizeChanger: false,
            size: "default",
        }

        let searchText = this.state.queries.name;
        let searchDescription = this.state.queries.description;

        return (
            <AntCard
                className={"rule-list card-custom"}
                title={
                    <div className="card-custom-title">
                        <div className="card-information">
                            List of contact group
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
                                <div className="search-input ">
                                    <div className="input-label">Name:</div>
                                    <div className="input-value">
                                        <Input
                                            placeholder="Search group by name"
                                            allowClear
                                            onChange={this.onChangeSearchText}
                                            value={searchText}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12}>
                                <div className="search-input ">
                                    <div className="input-label">Description:</div>
                                    <div className="input-value">
                                        <Input
                                            placeholder="Search group by description"
                                            allowClear
                                            onChange={this.onChangeDescription}
                                            value={searchDescription}
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
        },
        {
            title: 'Group Name',
            dataIndex: 'name',
        },
        {
            title: 'Group Description',
            dataIndex: 'description',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
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
        contactGroup: state.contactGroup,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContactGroups: (params) => {
            dispatch(getContactGroups(params));
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomComponent))