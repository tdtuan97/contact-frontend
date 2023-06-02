import React, {Component} from 'react';

class CustomComponent extends Component {
    render() {
        const message     = this.props.message;
        const description = message !== undefined && message !== null && message !== '' ? message : 'Please try again'
        return (
            <div className="data-error-wrapper">
                <div className="error-title">
                    Data error
                </div>
                <div className="error-description">
                    {description}
                </div>
            </div>
        )
    }
}

export default CustomComponent;
