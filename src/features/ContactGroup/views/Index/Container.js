import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {resetStore} from "@features/Common/redux";
import {withRouter} from "react-router-dom";
import {
    clearFormContactGroup,
    getContactGroup,
    getContactGroups,
    updateContactGroup,
    deleteContactGroup, createContactGroup
} from "@features/ContactGroup/redux/actions";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleFormDetail   : false,
            isVisibleDeleteConfirm: false,
            idSelected            : null,
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

        this.fetchData();
    }

    /**
     * On click edit rule
     */
    onClickEdit = (e) => {
        this.setState({
            ...this.state,
            isVisibleFormDetail: true
        })

        this.props.getContactGroup(e.currentTarget.value);
    }

    /**
     * On submit form rule
     */
    onSubmitForm = (data) => {
        let id = data.id ?? null;

        let params = {
            name       : data.name ?? "",
            description: data.description ?? "",
        }

        // Create or Update
        if (id) {
            this.props.updateContactGroup(id, params);
        } else {
            this.props.createContactGroup(params);
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
        this.props.clearFormContactGroup();
        this.fetchData();
    }

    /**
     * On show confirm delete
     */
    onShowConfirmDelete = (e) => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: true,
            idSelected            : e.currentTarget.value
        })
    }

    /**
     * On close confirm delete
     */
    onCloseConfirmDelete = () => {
        this.setState({
            ...this.state,
            isVisibleDeleteConfirm: false,
            idSelected            : null
        })
    }

    /**
     * On accept delete rule
     */
    onAcceptDelete = () => {
        this.props.deleteContactGroup(this.state.idSelected);
        this.onCloseConfirmDelete();
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        this.props.resetStore()
    }

    componentDidUpdate(prevProps) {
        const prevDelete    = prevProps.contactGroup.delete;
        const currentDelete = this.props.contactGroup.delete;

        // Delete success => Close
        if (prevDelete.isDeleted !== currentDelete.isDeleted && currentDelete.isDeleted === true) {
            this.fetchData()
        }
    }


    fetchData = () => {
        // Fetch rules
        this.props.getContactGroups({})
    }

    render() {
        const {
                  isVisibleFormDetail,
                  isVisibleDeleteConfirm
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
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        resetStore        : () => {
            dispatch(resetStore());
        },
        clearFormContactGroup     : () => {
            dispatch(clearFormContactGroup());
        },
        getContactGroups  : (params) => {
            dispatch(getContactGroups(params));
        },
        getContactGroup   : (id) => {
            dispatch(getContactGroup(id));
        },
        createContactGroup: (params) => {
            dispatch(createContactGroup(params));
        },
        updateContactGroup: (id, params) => {
            dispatch(updateContactGroup(id, params));
        },
        deleteContactGroup: (id) => {
            dispatch(deleteContactGroup(id));
        },
    };
}


function mapStateToProps(state) {
    return {
        router      : state.router,
        common      : state.common,
        contactGroup: state.contactGroup,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))