import React, {Component} from 'react';

class CustomComponent extends Component {
    render() {
        let {title, description} = this.props
        title = title !== undefined ? title : 'Empty data';
        description = description !== undefined ? description : '';
        return (
            <div className="empty-wrapper">
                <div className="empty-title">
                    {title}
                </div>
                <div className="empty-description">
                    {description}
                </div>
            </div>
        )
    }
}

export default CustomComponent;
