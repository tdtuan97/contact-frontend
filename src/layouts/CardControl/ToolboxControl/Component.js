import React, {Component} from 'react';
import {connect} from 'react-redux';
import {exitFullScreen, fullScreen} from "@features/Common/redux";
import {
    ReloadOutlined,
    SettingOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    PlusOutlined
} from "@ant-design/icons";
import {AntButton} from "../../AntButton";
import {Select} from 'antd';

const {Option} = Select;

class CustomComponent extends Component {

    onClickFullScreen = () => {
        this.props.fullScreen(this.props.parentElementId)
        if (this.props.onChangeResize !== undefined) {
            this.props.onChangeResize(true)
        }
    }

    onExitClickFullScreen = () => {
        this.props.exitFullScreen()
        if (this.props.onChangeResize !== undefined) {
            this.props.onChangeResize(false)
        }
    }

    render() {
        const {
                  common,
                  updateAt,
                  showSetting,
                  showReload,
                  handleReload,

                  btnAddShow,
                  btnAddText,
                  btnAddClick,

                  btnExportShow,
                  btnExportLoading,
                  btnExportClick,

                  btnImportShow,
                  btnImportClick,

                  selectTimeOptions,
                  selectTimeDefault,
                  handleChangeTime,
              } = this.props

        const isActive = common.fullScreen.isActive;
        return (
            <div className="card-toolbox">
                {
                    showReload ?
                        <span className="toolbox-control reload-control">
                            <AntButton
                                className="btn-main-default"
                                icon={<ReloadOutlined/>}
                                onClick={handleReload}
                            />
                        </span> : null
                }
                {
                    selectTimeOptions ? <span className="toolbox-control select-time-control">
                            <Select
                                defaultValue={selectTimeDefault !== undefined ? selectTimeDefault : "last_24_hour"}
                                listHeight={400}
                                style={{
                                    width: "140px",
                                }}
                                onChange={handleChangeTime}
                            >
                                {
                                    selectTimeOptions.map((item, key) => {
                                        return <Option key={key} value={item.value}>{item.title}</Option>
                                    })
                                }
                            </Select>
                        </span> : null
                }
                {
                    updateAt ?
                        <div className="toolbox-control datetime-control">
                            Last update: {updateAt}
                        </div> : null
                }

                {
                    btnExportShow ?
                    <span className="toolbox-control setting-control">
                            <AntButton
                                loading={btnExportLoading}
                                icon={<PlusOutlined/>}
                                onClick={btnExportClick}
                            >
                                Export
                            </AntButton>
                        </span> : null
                }

                {
                    btnImportShow ?
                    <span className="toolbox-control setting-control">
                            <AntButton
                                className="btn-primary-ghost"
                                icon={<PlusOutlined/>}
                                onClick={btnImportClick}
                            >
                                Import
                            </AntButton>
                        </span> : null
                }

                {
                    btnAddShow ?
                        <span className="toolbox-control setting-control">
                            <AntButton
                                ghost
                                className="btn-success-ghost"
                                icon={<PlusOutlined/>}
                                onClick={btnAddClick}
                            >
                                {btnAddText ?? "New"}
                            </AntButton>
                        </span> : null
                }

                <span> </span>
                {
                    showSetting ?
                        <span className="toolbox-control setting-control">
                            <AntButton
                                className="btn-main-default"
                                icon={<SettingOutlined/>}
                            />
                        </span> : null
                }

                {/*<span className="toolbox-control full-screen-control">
                {
                    isActive ?
                        <AntButton
                            className="btn-main-default"
                            icon={<FullscreenExitOutlined/>}
                            onClick={() => this.onExitClickFullScreen()}
                        />
                        :
                        <AntButton
                            className="btn-main-default"
                            icon={<FullscreenOutlined/>}
                            onClick={() => this.onClickFullScreen()}
                        />
                }
                </span>*/}
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fullScreen    : (elementId) => {
            dispatch(fullScreen(elementId));
        },
        exitFullScreen: () => {
            dispatch(exitFullScreen());
        },
    };
}

function mapStateToProps(state) {
    return {
        common: state.common,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomComponent)