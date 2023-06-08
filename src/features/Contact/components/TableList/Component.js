import React, {Component} from 'react';
import {connect} from "react-redux";
import {AntButton, AntCard, ModalConfirm, ToolboxControl} from "@layouts";
import {
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    InfoCircleOutlined, LinkOutlined,
    SearchOutlined,
    ShareAltOutlined
} from "@ant-design/icons";
import {Avatar, Button, Col, Input, Row, Select, Table, Tag, Switch, Tooltip} from "antd";
import {Link, withRouter} from "react-router-dom";
import {
    changeContactPublicStatus, exportContacts,
    getContacts, getSharedUsers, updateSharedUsers,
} from "@features/Contact/redux";
import zaloIcon from '@images/zalo-icon.jpg';
import * as Components from "@features/Contact/components";
import {FormSharedUsers} from "@features/Contact/components/FormSharedUsers";
import {SharedUsersForm} from "@features/Contact/components";

const prepareQueries = (queries = {}) => {
    let results = {}
    if (queries.name) {
        results = {
            ...results,
            name: queries.name
        }
    }

    if (queries.phone_number) {
        results = {
            ...results,
            phone_number: queries.phone_number
        }
    }

    if (queries.email) {
        results = {
            ...results,
            email: queries.email
        }
    }

    if (queries.type) {
        results = {
            ...results,
            type: queries.type
        }
    }

    if (queries.is_public) {
        results = {
            ...results,
            is_public: queries.is_public
        }
    }

    if (queries.groupIds && queries.groupIds.length > 0) {
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
            selectedId          : null,
            selectedContactId   : null,
            isVisibleSharedUsers: false,
            queries             : {
                name        : "",
                phone_number: "",
                email       : "",
                groupIds    : [],
                type        : "me",
                is_public   : null,
            },
        }
    }

    onShowSharedUsers  = (e) => {
        this.setState({
            ...this.state,
            isVisibleSharedUsers: true,
            selectedContactId   : e.currentTarget.value,
        })

        this.props.getSharedUsers({
            contact_id: e.currentTarget.value
        })
    }
    onCloseSharedUsers = () => {
        this.setState({
            ...this.state,
            isVisibleSharedUsers: false,
            selectedContactId   : null,
        })
    }
    sharedUsersUpdate  = (userIds) => {
        this.props.updateSharedUsers(this.state.selectedContactId, userIds)
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

    onChangePublicStatus = (value) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                is_public: value
            }
        })
    }

    onChangeContactType = (value) => {
        this.setState({
            ...this.state,
            queries: {
                ...this.state.queries,
                type: value
            }
        })
    }

    onClickExport = () => {
        this.props.exportContacts(prepareQueries(this.state.queries))
    }

    /**
     * On search
     */
    onSearch = () => {
        this.props.getContacts(prepareQueries(this.state.queries))
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
            sort_by : sortBy,
            order_by: orderBy,
            page    : page,
            ...filters,
            ...prepareQueries(this.state.queries),
        });
    }

    onChangeSwitch = (value, id) => {
        this.props.changeContactPublicStatus(id, value)
    }

    componentDidMount() {
        this.props.getContacts(prepareQueries(this.state.queries))
    }

    render() {
        const {list, updatePublicStatus} = this.props.contact
        const {
                  onClickNew,
                  onClickEdit,
                  onShowConfirmDelete,
                  onShowView,
                  onShowImportForm,
                  masterData,

                  isVisibleFormDetail,
                  onSubmitForm,

                  isVisibleDeleteConfirm,
                  onAcceptDelete,

                  onCloseView,
                  isVisibleView,

                  isVisibleImport,
                  onSubmitImport,
              }                          = this.props

        let loading        = list.loading
        let data           = list.data ?? {}
        let dataPagination = data.pagination ?? {}
        let pagination     = {
            current        : dataPagination.page ?? 1,
            pageSize       : dataPagination.size ?? 15,
            total          : dataPagination.total ?? 0,
            showSizeChanger: false,
            size           : "default",
        }
        let dataList       = data.list ?? []

        dataList = dataList.map((item) => {
            let publicLoading = parseInt(updatePublicStatus.id) === parseInt(item.id) && updatePublicStatus.loading
            return {
                ...item,
                public_loading: publicLoading
            }
        })

        let searchText        = this.state.queries.name;
        let searchPhoneNumber = this.state.queries.phone_number;
        let searchEmail       = this.state.queries.email;
        let selectedGroupIds  = this.state.queries.groupIds;
        let selectedType      = this.state.queries.type;
        let selectedIsPublic  = this.state.queries.is_public;

        let selectGroupsData    = masterData.listContactGroup.data ?? {};
        selectGroupsData        = selectGroupsData.list ?? [];
        let selectGroupsLoading = masterData.listContactGroup.loading;

        let contactExport = this.props.contact.export;

        let {isVisibleSharedUsers} = this.state
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

                            btnExportShow={true}
                            btnExportLoading={contactExport.loading}
                            btnExportClick={this.onClickExport}
                            btnImportShow={true}
                            btnImportClick={onShowImportForm}
                        />
                    </div>
                }
            >
                <div>
                    <div className="search-group">
                        <Row gutter={{xs: 8, sm: 12, md: 12}}>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-keyword">
                                    <div className="input-label">Name:</div>
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
                            <Col xs={24} xl={12}>
                                <div className="search-input input-keyword">
                                    <div className="input-label">Type:</div>
                                    <div className="input-value">
                                        <Select
                                            allowClear
                                            placeholder="Select contact type"
                                            value={selectedType}
                                            style={{width: "100%"}}
                                            tagRender={tagRender}
                                            onChange={this.onChangeContactType}
                                        >
                                            {
                                                ContactType ?
                                                ContactType.map((item, index) => {
                                                    return (
                                                        <Select.Option value={item.value}
                                                                       key={index}>{item.text}
                                                        </Select.Option>
                                                    )
                                                }) : null
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} xl={12}>
                                <div className="search-input input-status">
                                    <div className="input-label">Public Status:</div>
                                    <div className="input-value">
                                        <Select
                                            allowClear
                                            placeholder="Select public status"
                                            value={selectedIsPublic}
                                            style={{width: "100%"}}
                                            onChange={this.onChangePublicStatus}
                                        >
                                            {
                                                PublicStatus ?
                                                PublicStatus.map((item, index) => {
                                                    return (
                                                        <Select.Option value={item.value}
                                                                       key={index}>{item.text}
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
                            <Col xs={{
                                span  : 12,
                                offset: 6,
                            }} xl={{
                                span  : 8,
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
                        columns={columns(
                            onClickEdit,
                            onShowConfirmDelete,
                            this.onChangeSwitch,
                            onShowView,
                            this.onShowSharedUsers
                        )}
                        rowKey={record => record.id}
                        dataSource={dataList}
                        loading={loading}
                        pagination={pagination}
                        onChange={(pagination, filters, sorter) => this.onChangeTable(pagination, filters, sorter)}
                    />
                </div>

                <Components.ContactForm
                    isVisibleFormDetail={isVisibleFormDetail}
                    onSubmitForm={onSubmitForm}
                    onCloseForm={this.onCloseForm}
                />

                <ModalConfirm
                    onOk={onAcceptDelete}
                    onCancel={this.onCloseConfirmDelete}
                    visible={isVisibleDeleteConfirm}
                    title="Delete group"
                    message="Are you sure ?"
                />

                <Components.ContactShareForm
                    isVisible={isVisibleView}
                    onCloseForm={onCloseView}
                />

                <Components.ContactImportForm
                    isVisible={isVisibleImport}
                    onSubmitForm={onSubmitImport}
                    onCloseForm={this.onCloseImportForm}
                />

                <Components.SharedUsersForm
                    isVisible={isVisibleSharedUsers}
                    sharedUsersUpdate={this.sharedUsersUpdate}
                    onCloseForm={this.onCloseSharedUsers}
                />
            </AntCard>
        )
    }

    onCloseForm = () => {
        this.props.onCloseForm()
        this.props.getContacts(prepareQueries(this.state.queries))
    }

    onCloseConfirmDelete = () => {
        this.props.onCloseConfirmDelete()
        this.props.getContacts(prepareQueries(this.state.queries))
    }

    onCloseImportForm = () => {
        this.props.onCloseImportForm()
        this.props.getContacts(prepareQueries(this.state.queries))
    }

    componentDidUpdate(prevProps) {
        const prevDelete    = prevProps.contact.delete;
        const currentDelete = this.props.contact.delete;

        const prevSharedUserUpdate    = prevProps.contact.sharedUserUpdate;
        const currentSharedUserUpdate = this.props.contact.sharedUserUpdate;

        // Delete success => Close
        if (prevDelete.isDeleted !== currentDelete.isDeleted && currentDelete.isDeleted === true) {
            this.props.getContacts(prepareQueries(this.state.queries))
        }

        if (prevSharedUserUpdate.isUpdated !== currentSharedUserUpdate.isUpdated && currentSharedUserUpdate.isUpdated === true) {
            this.props.getSharedUsers({
                contact_id: this.state.selectedContactId
            })
        }
    }
}

function createMarkup(configs) {
    let {shareValue, shareType, oaid, customize, callback} = configs
    let html                                               = `<div 
                            class="zalo-share-button" 
                            data-href="${shareValue}" 
                            data-oaid="${oaid}" 
                            data-customize="${customize}" 
                            data-share-type="${shareType}"
                            data-callback="${callback}"
                            ></div>`;
    return {__html: html};
}

function ShareZaloComponent({value}) {
    let configs = {
        shareValue: value,
        shareType : 1,
        oaid      : process.env.REACT_APP_ZALO_OAID,
        customize : 'true',
        callback  : 'zaloSharedCallBack'
    }
    return <div dangerouslySetInnerHTML={createMarkup(configs)}/>;
}

const columns = (onShowDetail, showConfirmDelete, onChangeSwitch, onShowView, onShowSharedUsers) => {
    return [
        {
            width    : 50,
            title    : 'ID',
            dataIndex: 'id',
            sorter   : true,
        },
        {
            title    : 'Name',
            dataIndex: 'name',
            sorter   : true,
        },
        {
            title    : 'Email',
            dataIndex: 'email',
            sorter   : true,
        },
        {
            title    : 'Phone Number',
            dataIndex: 'phone_number',
            sorter   : true,
        },
        {
            title    : 'Group Name',
            dataIndex: 'group_name',
        },
        {
            title    : 'Author',
            dataIndex: 'created_user_name',
        },
        {
            width    : 150,
            title    : 'Last Update',
            dataIndex: 'updated_at',
            sorter   : true,
        },
        {
            width : 100,
            align : 'center',
            title : 'Public Status',
            render: (value, item) => <div className="group-button">
                <Switch
                    disabled={!item.allow_edit}
                    loading={item.public_loading}
                    defaultChecked={parseInt(item.is_public) === 1}
                    checkedChildren="Public"
                    unCheckedChildren="Private"
                    onChange={(value) => {
                        onChangeSwitch(value, item.id)
                    }}
                />
            </div>
        },
        {
            width : 100,
            align : 'center',
            title : 'Action',
            render: (value, item) => <div className="group-button">
                <Tooltip title={'Zalo Share'}>
                    <div className="share-zalo">
                        <ShareZaloComponent value={`${process.env.REACT_APP_BASE_URL}/contact-shared/${item.id}`}/>
                        <Avatar size={48} shape={"circle"} src={zaloIcon}/>
                    </div>
                </Tooltip>
                <div className="share-link">
                    <Tooltip title={'Share Link'}>
                        <AntButton
                            icon={<LinkOutlined/>}
                            href={`contact-shared/${item.id}`}
                            target="_blank"
                        >
                        </AntButton>
                    </Tooltip>
                </div>
                {
                    item.allow_edit ?
                    <>
                        <Tooltip title={'Share Contact'}>
                            <AntButton
                                className="btn-success-ghost"
                                icon={<ShareAltOutlined/>}
                                value={item.id}
                                onClick={onShowSharedUsers}
                            >
                            </AntButton>
                        </Tooltip>
                        <Tooltip title={'Edit'}>
                            <AntButton
                                icon={<EditOutlined/>}
                                type="primary" ghost
                                value={item.id}
                                onClick={onShowDetail}
                            >
                            </AntButton>
                        </Tooltip>
                        <Tooltip title={'Delete'}>
                            <AntButton
                                icon={<DeleteOutlined/>}
                                type="danger" ghost
                                value={item.id}
                                onClick={showConfirmDelete}
                            />
                        </Tooltip>
                    </>
                                    :
                    <>
                        <Tooltip title={'View'}>
                            <AntButton
                                icon={<InfoCircleOutlined/>}
                                value={item.id}
                                onClick={onShowView}
                            >
                            </AntButton>
                        </Tooltip>
                    </>
                }

            </div>
        },
    ]
};

function mapStateToProps(state) {
    return {
        common    : state.common,
        contact   : state.contact,
        masterData: state.masterData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getContacts: (params) => {
            dispatch(getContacts(params));
        },

        exportContacts: (params) => {
            dispatch(exportContacts(params));
        },

        changeContactPublicStatus: (id, status) => {
            dispatch(changeContactPublicStatus(id, status));
        },

        getSharedUsers: (params) => {
            dispatch(getSharedUsers(params));
        },

        updateSharedUsers: (contactId, userIds) => {
            dispatch(updateSharedUsers(contactId, userIds));
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

const PublicStatus = [
    {
        value: "1",
        text : "Public",
    },
    {
        value: "0",
        text : "Private",
    },
]

const ContactType = [
    {
        value: "all",
        text : "All",
    },
    {
        value: "me",
        text : "Created By me",
    },
    {
        value: "shared",
        text : "Sharing With Me",
    },
]