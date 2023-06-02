import React, {Component} from 'react';

class CustomComponent extends Component {
    render() {
        return (
            <div className="group-action">
                {this.props.children}
            </div>
        )
    }
}

export default CustomComponent