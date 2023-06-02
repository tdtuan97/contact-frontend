import React, {Component} from 'react';
import {ErrorPage} from "../../components";

class President extends Component {
    render() {
        let code = this.props.code !== undefined ? this.props.code : "500"
        let message;
        code = code.toString();
        switch (code) {
            case "403":
                message = "Sorry, you are not authorized to access this page."
                break;
            case "500":
                message = "Sorry, something went wrong."
                break;
            case "404":
            default:
                code    = "404";
                message = "Sorry, the page you visited does not exist."
                break;
        }
        return (
            <div className="features feature-exceptions">
                <ErrorPage code={code} message={message}/>
            </div>
        )
    }
}

export default President;