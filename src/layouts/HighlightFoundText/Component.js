import React, {Component} from 'react';

class CustomComponent extends Component {
    render() {
        const {value, text} = this.props;
        let textBefore      = text;
        let textHighlight   = '';
        let textAfter       = '';
        let textCompare     = text.slice();
        let valueCompare    = value.slice();
        if (value) {
            let idx = textCompare.toUpperCase().indexOf(valueCompare.toUpperCase());
            if (idx > -1) {
                textHighlight = text.substring(idx, idx + value.length)
                textBefore    = text.substring(0, idx);
                textAfter     = text.substring(idx + value.length);
            }
        }
        return (
            <span>
                <span>{textBefore}</span>
                <span className="text-highlight">{textHighlight}</span>
                <span>{textAfter}</span>
            </span>
        )
    }
}

export default CustomComponent