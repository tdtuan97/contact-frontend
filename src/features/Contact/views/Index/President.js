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

                  onShowShareUser,
                  onSubmitShareUser,
                  onCloseShareUser,
                  isVisibleShareUser,

                  isVisibleImport,
                  onShowImportForm,
                  onCloseImportForm,
                  onSubmitImport,
              } = this.props
        return (
            <div className="features feature-home">
                <h1 className="page-title">
                    Contact Management
                </h1>
                <div>
                    <Components.ContactList
                        onClickNew={onClickNew}
                        onClickEdit={onClickEdit}
                        onShowConfirmDelete={onShowConfirmDelete}
                        onShowShareUser={onShowShareUser}
                        onShowImportForm={onShowImportForm}
                    />

                    <Components.ContactForm
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

                    <Components.ContactShareForm
                        isVisible={isVisibleShareUser}
                        onSubmitForm={onSubmitShareUser}
                        onCloseForm={onCloseShareUser}
                    />

                    <Components.ContactImportForm
                        isVisible={isVisibleImport}
                        onSubmitForm={onSubmitImport}
                        onCloseForm={onCloseImportForm}
                    />
                </div>
            </div>
        );
    }
}

export default President;
