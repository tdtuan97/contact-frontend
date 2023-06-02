import React, {Component} from 'react';
import {FormProduct} from "../../components";
import {ModalConfirm} from "../../../../layouts";

class President extends Component {
    render() {
        return (
            <div className="features feature-product">
                <FormProduct
                    {...this.props}
                />
                <ModalConfirm
                    onOk={this.props.onOkDelete}
                    onCancel={this.props.onCancelDelete}
                    visible={this.props.deleteModalVisible}
                    message="Chắc chắn xoá sản phẩm ?"
                />
            </div>
        )
    }
}

export default President;