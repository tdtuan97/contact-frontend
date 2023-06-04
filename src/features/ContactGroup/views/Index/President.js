import React, {Component} from 'react';
import * as Components from "../../components";
import {ModalConfirm} from "@layouts";

class President extends Component {
    render() {
        const {
                  isVisibleFormDetail,
                  onClickNew,
                  onClickEdit,
                  onSubmitForm,
                  onCloseForm,

                  isVisibleDeleteConfirm,
                  onShowConfirmDelete,
                  onCloseConfirmDelete,
                  onAcceptDelete,
              } = this.props
        return (
            <div className="features feature-home">
                <h1 className="page-title">
                    Contact Group Management
                </h1>
                <div>
                    <Components.ContactGroupList
                        onClickNew={onClickNew}
                        onClickEdit={onClickEdit}
                        onShowConfirmDelete={onShowConfirmDelete}
                    />

                    <Components.ContactGroupForm
                        isVisibleFormDetail={isVisibleFormDetail}
                        onSubmitForm={onSubmitForm}
                        onCloseForm={onCloseForm}
                    />

                    <ModalConfirm
                        onOk={onAcceptDelete}
                        onCancel={onCloseConfirmDelete}
                        visible={isVisibleDeleteConfirm}
                        title="Delete group"
                        message="Are you sure ?"
                    />
                </div>
            </div>
        );
    }
}

export default President;
