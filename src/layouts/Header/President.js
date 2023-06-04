import React, {Component} from 'react';
import {
    MenuOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {Logo} from "../Logo";
import logoApp from '@images/logo-app.png';
import {AntButton} from "../AntButton";

class President extends Component {
    render() {
        const {
                  handleFullScreen,
                  handleExitFullScreen,
                  handleToggleSider
              } = this.props

        const isFull = this.props.common.browserFullScreen.isActive;

        return (
            <header className="page-header">
                <div className="page-header-content">
                    <div className="logo">
                        <Link to="/">
                            <Logo src={logoApp}/>
                        </Link>
                    </div>
                    <div className="page-header-control">
                        <div className="status-control">

                        </div>
                        <div className="action-control">
                            <AntButton
                                className="btn-main-default"
                                icon={isFull ? <FullscreenExitOutlined/> : <FullscreenOutlined/>}
                                onClick={isFull ? handleExitFullScreen : handleFullScreen}
                            />
                            <AntButton
                                className="btn-main-default"
                                icon={<MenuOutlined/>}
                                onClick={handleToggleSider}
                            />
                        </div>

                    </div>
                </div>
            </header>
        )
    }
}

export default President;