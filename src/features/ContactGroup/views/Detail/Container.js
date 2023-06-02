import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {createMatchSelector} from "connected-react-router";
import {updateProduct, detailProduct, deleteProduct, visibleConfirmDelete} from "@features//Event/redux/actions";
import {ErrorPage} from "@features/Exceptions";
import {Redirect} from "react-router-dom";

class Container extends Component {
    onFinish = (data) => {
        this.props.updateProduct(this.props.product.detail.id, data)
    }

    onOkDelete = () => {
        this.props.deleteProduct(this.props.product.detail.id)
    }

    render() {
        let {detail} = this.props.product;

        if (this.props.product.delete.isDeleted === true) {
            return (
                <Redirect to="/products"/>
            )
        }

        if (detail.isFound === false) {
            return (
                <ErrorPage code={404}/>
            )
        }

        return (
            <President
                isDetail={true}
                data={detail.data}
                formLoading={detail.loading}
                errors={detail.errors}

                updateLoading={detail.update.loading}
                onFinish={this.onFinish}
                onUpdate={this.updateProduct}
                onUpdateCancel={this.props.updateCancel}

                deleteModalVisible={this.props.product.delete.modalVisible}
                deleteLoading={this.props.product.delete.loading}
                onShowConfirmDelete={this.props.showConfirmDelete}
                onCancelDelete={this.props.hideConfirmDelete}
                onOkDelete={this.onOkDelete}
            />
        )
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.detailProduct(id)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateProduct    : (id, data) => {
            dispatch(updateProduct(id, data));
        },
        detailProduct    : (id) => {
            dispatch(detailProduct(id));
        },
        showConfirmDelete: () => {
            dispatch(visibleConfirmDelete(true));
        },
        hideConfirmDelete: () => {
            dispatch(visibleConfirmDelete(false));
        },
        deleteProduct    : (id) => {
            dispatch(deleteProduct(id));
        },
    };
}

function mapStateToProps(state) {
    const matchSelector = createMatchSelector("/products/detail/:id");
    return {
        match  : matchSelector(state),
        product: state.product,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)