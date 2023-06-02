import React, {Component} from 'react';
import {BellFilled} from "@ant-design/icons";

class CustomComponent extends Component {
    render() {
        let color;
        switch (parseInt(this.props.level ?? 0)){
            case 100:
                color = '#73d13d'
                break
            case 110:
                color = '#fa8c16'
                break
            case 120:
                color = '#cf1322'
                break
            default:
                color = '#bfbfbf'
                break
        }

        return (
            <BellFilled style={{color: color}}/>
        )
    }
}

export default CustomComponent