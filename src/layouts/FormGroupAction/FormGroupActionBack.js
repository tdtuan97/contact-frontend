import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {AntButton} from "@layouts";

class CustomComponent extends Component {
    render() {
        return (
            <div className="action-item">
                <div className="action-item">
                    <Link to={this.props.callback ?? "/"}>
                        <AntButton {...this.props}>
                            Go Back
                        </AntButton>
                    </Link>
                </div>
            </div>
        )
    }
}

export default CustomComponent