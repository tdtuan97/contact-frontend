import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {resetStore} from "@features/Common/redux";
import {withRouter} from "react-router-dom";
import {
    clearFormContact,
    getContact,
    getContacts,
    updateContact,
    deleteContact,
    createContact, importContacts
} from "@features/Contact/redux/actions";
import {getAllContactGroups} from "@features/MasterData/redux";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleFormDetail: false,
            isVisibleDeleteConfirm: false,
            isVisibleShareUser: false,
            isVisibleImport: false,
            idSelected: null,
        }
    }

    /**
     * On click new rule
     */
    onClickNew = () => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: true
        })
    }

    /**
     * On click edit rule
     */
    onClickEdit = (e) => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: true
        })

        this.props.getContact(e.currentTarget.value);
    }

    /**
     * On submit form rule
     */
    onSubmitForm = (data) => {
        let id = data.id ?? null;

        let params = {
            name: data.name ?? "",
            phone_number: data.phone_number ?? "",
            email: data.email ?? "",
            group_id: data.group_id ?? null,
            is_public: data.is_public ?? 0,
        }

        // Create or Update
        if (id) {
            this.props.updateContact(id, params);
        } else {
            this.props.createContact(params);
        }
    }

    /**
     * On click hide rule
     */
    onCloseForm = () => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: false
        })
        this.props.clearFormContact();
        //this.props.getContacts();
    }

    /**
     * On show confirm delete
     */
    onShowConfirmDelete = (e) => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: true,
            idSelected: e.currentTarget.value
        })
    }

    /**
     * On close confirm delete
     */
    onCloseConfirmDelete = () => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: false,
            idSelected: null
        })
    }

    /**
     * On accept delete rule
     */
    onAcceptDelete = () => {
        this.props.deleteContact(this.state.idSelected);
        this.onCloseConfirmDelete();
    }

    onShowShareUser = (e) => {
        this.setState({
            ...this.state,
            isVisibleShareUser: true
        })

        this.props.getContact(e.currentTarget.value);
    }

    onCloseShareUser = () => {
        this.setState({
            ...this.state,
            isVisibleShareUser: false
        })
        this.props.clearFormContact();
    }

    onSubmitShareUser = (data) => {
        // Todo
    }

    /**
     * On show confirm delete
     */
    onShowImportForm = () => {
        this.setState({
            ...this.state,
            isVisibleImport: true,
        })
    }

    /**
     * On close confirm delete
     */
    onCloseImportForm = () => {
        this.setState({
            ...this.state,
            isVisibleImport: false,
        })
    }

    /**
     * On accept delete rule
     */
    onSubmitImport = (data) => {
        let file = data.file ?? []
        this.props.importContacts({
            filename: this.props.contact.upload.filename,
        });
    }

    componentDidMount() {
        this.props.getAllContactGroups();
    }

    componentWillUnmount() {
        this.props.resetStore()
    }

    /*componentDidUpdate(prevProps) {
        const prevDelete = prevProps.contact.delete;
        const currentDelete = this.props.contact.delete;

        // Delete success => Close
        if (prevDelete.isDeleted !== currentDelete.isDeleted && currentDelete.isDeleted === true) {
            this.props.getContacts()
        }
    }*/

    render() {
        const {
            isVisibleFormDetail,
            isVisibleDeleteConfirm,
            isVisibleShareUser,
            isVisibleImport,
        } = this.state
        return (
            <President
                {...this.props}
                isVisibleFormDetail={isVisibleFormDetail}
                onClickNew={this.onClickNew}
                onClickEdit={this.onClickEdit}
                onSubmitForm={this.onSubmitForm}
                onCloseForm={this.onCloseForm}

                isVisibleDeleteConfirm={isVisibleDeleteConfirm}
                onShowConfirmDelete={this.onShowConfirmDelete}
                onCloseConfirmDelete={this.onCloseConfirmDelete}
                onAcceptDelete={this.onAcceptDelete}

                onShowShareUser={this.onShowShareUser}
                onCloseShareUser={this.onCloseShareUser}
                onSubmitShareUser={this.onSubmitShareUser}
                isVisibleShareUser={isVisibleShareUser}

                isVisibleImport={isVisibleImport}
                onShowImportForm={this.onShowImportForm}
                onCloseImportForm={this.onCloseImportForm}
                onSubmitImport={this.onSubmitImport}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore: () => {
            dispatch(resetStore());
        },
        clearFormContact: () => {
            dispatch(clearFormContact());
        },
        getContacts: (params = {}) => {
            dispatch(getContacts(params));
        },
        getContact: (id) => {
            dispatch(getContact(id));
        },
        createContact: (params) => {
            dispatch(createContact(params));
        },
        updateContact: (id, params) => {
            dispatch(updateContact(id, params));
        },
        deleteContact: (id) => {
            dispatch(deleteContact(id));
        },
        getAllContactGroups: () => {
            dispatch(getAllContactGroups());
        },
        importContacts: (params) => {
            dispatch(importContacts(params));
        },
    };
}


function mapStateToProps(state) {
    return {
        router: state.router,
        common: state.common,
        contact: state.contact,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))