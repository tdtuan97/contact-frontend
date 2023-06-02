import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {fetchTableProduct} from "../../redux/actions";

class Container extends Component {
    handleTableChange = (pagination, filters, sorter) => {
        this.props.fetchTableProduct({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    render() {
        return (
            <President handleTableChanges={this.handleTableChange} {...this.props.product.list} />
        )
    }

    componentDidMount() {
        this.props.fetchTableProduct({});
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTableProduct: (data) => {
            dispatch(fetchTableProduct(data));
        },
    };
}

function mapStateToProps(state) {
    return {
        product: state.product,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)