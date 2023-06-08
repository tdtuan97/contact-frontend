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

                        isVisibleFormDetail={isVisibleFormDetail}
                        onSubmitForm={onSubmitForm}
                        onCloseForm={onCloseForm}
                        isVisibleDeleteConfirm={isVisibleDeleteConfirm}
                        onCloseConfirmDelete={onCloseConfirmDelete}
                        onAcceptDelete={onAcceptDelete}
                        onSubmitShareUser={onSubmitShareUser}
                        onCloseShareUser={onCloseShareUser}
                        isVisibleShareUser={isVisibleShareUser}
                        isVisibleImport={isVisibleImport}
                        onCloseImportForm={onCloseImportForm}
                        onSubmitImport={onSubmitImport}
                    />
                </div>
            </div>
        );
    }
}

export default President;
