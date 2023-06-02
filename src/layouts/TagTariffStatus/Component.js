import React, {Component} from 'react';
import {Tag} from "antd";

class CustomComponent extends Component {
    render() {
        let {levelSection1, levelSection2} = this.props

        // Same with section 1 when not found params
        levelSection2 = levelSection2 ?? levelSection1
        let colorSection1;
        let colorSection2;
        switch (levelSection1) {
            case 10:
                colorSection1 = "#00B050"
                break
            case 20:
                colorSection1 = "rgba(232,231,112,0.85)"
                break
            case 30:
            default:
                colorSection1 = "#FE0000"
                break
        }

        switch (levelSection2) {
            case 10:
                colorSection2 = "#00B050"
                break
            case 20:
                colorSection2 = "rgba(232,231,112,0.85)"
                break
            case 30:
            default:
                colorSection2 = "#FE0000"
                break
        }

        return (
            <div>
                <Tag className="tag-tariff-status section-1" color={colorSection1}></Tag>
                <Tag className="tag-tariff-status section-2" color={colorSection2}></Tag>
            </div>
        )
    }
}

export default CustomComponent