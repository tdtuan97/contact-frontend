import React, {Component} from 'react';
import logoApp from "@images/logo-app.png";

class CustomComponent extends Component {
    render() {
        return (
            <div className="logo-app">
                <img src={logoApp} alt="z-ene-z"/>
            </div>
        )
    }
}

export default CustomComponent;
