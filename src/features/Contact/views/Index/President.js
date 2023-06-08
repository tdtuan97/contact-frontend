import React, {Component} from 'react';
import * as Components from "../../components";
import {ModalConfirm} from "@layouts";

class President extends Component {
    render() {
        return (
            <div className="features feature-home">
                <h1 className="page-title">
                    Contact Management
                </h1>
                <div>
                    <Components.ContactList
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default President;
