import React, {Component} from 'react';
import {
    CompassOutlined,
    HomeOutlined,
    HddOutlined,
    CaretUpOutlined,
} from '@ant-design/icons';
import {Input} from 'antd';
import {AntButton} from "../AntButton";
import {HighlightFoundText} from "../HighlightFoundText";
import logoApp from '@images/logo-app.png';
import logoAppLite from '@images/logo-app-lite.png';

class President extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            searchText: "",
        }
    }

    onChange = (e) => {
        const searchText = e.currentTarget.value;
        this.setState({
            ...this.state,
            searchText: searchText
        })
    };

    onClick = (e) => {
        //const searchText                  = e.currentTarget.value;
        const {portfolioId, siteId, plantId} = e.currentTarget.dataset;
        this.setState({
            ...this.state,
            searchText: ""
        }, this.props.handleSelectDataSearch(portfolioId, siteId, plantId))
    };

    render() {
        const {
            common,
            handleToggleMenu,
        } = this.props;

        const collapsed = common.siderCollapsed
        const searchData = common.searchData
        const {searchText} = this.state

        // Check logo will display
        const logoDisplay = collapsed ? logoAppLite : logoApp

        const {
            domainName,
            portfolioName,
            siteName,
            plantName,
        } = renderText(searchData)

        return (
            <header className="sub-header">
                <div className="sub-header-content">
                    <div className={"sub-logo " + (collapsed ? 'collapsed' : '')}
                    >
                        <img src={logoDisplay} alt=""/>
                    </div>
                    <div className="sub-header-control">
                        <div className="scope-data-box" ref={this.wrapperRef}>
                            <SelectText
                                domainName={domainName}
                                portfolioName={portfolioName}
                                siteName={siteName}
                                plantName={plantName}
                                handleToggleMenu={handleToggleMenu}
                            />
                            <div className={"search-box " + (searchData.displayMenu ? '' : 'hide')}>
                                <Input.Search
                                    className="search-input"
                                    placeholder="Search portfolio, site, plant"
                                    value={searchText}
                                    onChange={this.onChange}
                                    loading={searchData.loading}
                                    allowClear={true}
                                    style={{
                                        width: "100%",
                                        borderRadius: 3
                                    }}
                                />
                                <div className="search-suggest">
                                    <SelectList
                                        portfolioList={searchData.portfolioList}
                                        searchText={searchText}
                                        onClick={this.onClick}
                                    />
                                </div>
                            </div>
                        </div>
                        {/*<div className="menu-toggle">
                            <MenuOutlined/>
                        </div>*/}
                    </div>
                </div>
            </header>
        )
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef
            && !this.wrapperRef.current.contains(event.target)
            && this.wrapperRef.current.getElementsByClassName('search-box hide').length === 0
        ) {
            this.props.handleToggleMenu();
        }
    }
}

export default President;

const renderText = (searchData) => {
    let domainName = null;
    let portfolioName = null;
    let siteName = null;
    let plantName = null;
    let {
        portfolioIdSelected,
        siteIdSelected,
        plantIdSelected,
        portfolioList,
    } = searchData

    portfolioList = portfolioList ?? [];

    try {
        switch (true) {
            case true:
                if (plantIdSelected) {
                    portfolioList.forEach(portfolio => {
                        const sites = portfolio.sites ?? [];
                        sites.forEach(site => {
                            const plants = site.plants ?? [];

                            plants.forEach(plant => {
                                if (plantIdSelected === plant.id) {
                                    // Set plant
                                    plantName = plant.name;
                                    // Set site
                                    siteName = site.name;
                                    return false;
                                }
                            })
                        })
                    })
                    break;
                }

                if (siteIdSelected) {
                    portfolioList.forEach(portfolio => {
                        const sites = portfolio.sites ?? [];
                        sites.forEach(site => {
                            if (siteIdSelected === site.id) {
                                // Set site
                                siteName = site.name;
                                return false;
                            }
                        })
                    })
                    break;
                }

                if (portfolioIdSelected) {
                    portfolioList.forEach(portfolio => {
                        if (portfolioIdSelected === portfolio.id) {
                            // Set portfolio
                            portfolioName = portfolio.name;
                            return false;
                        }
                    })
                    break;
                }

                domainName = "ENTIRE DOMAIN";
        }
    } catch (e) {
        //
    }
    return {
        "domainName": domainName,
        "portfolioName": portfolioName,
        "siteName": siteName,
        "plantName": plantName,
    }
}

const SelectText = ({
                        domainName,
                        portfolioName,
                        siteName,
                        plantName,
                        handleToggleMenu,
                    }) => {
    return (
        <div className="data-scope-box" onClick={handleToggleMenu}>
            <span><CompassOutlined/> </span>
            {
                domainName ?
                    <span
                        className="scope-text">{domainName}
                                        </span> : null
            }
            {
                portfolioName ?
                    <span
                        className="scope-text">{portfolioName}
                                        </span> : null
            }
            {
                siteName ?
                    <span className="scope-text">{siteName} </span> : null
            }
            {
                plantName ?
                    <span className="scope-text"><CaretUpOutlined
                        className="transform-90"/> {plantName}</span> : null
            }
        </div>
    )
}

const SelectList = ({portfolioList, onClick, searchText}) => {
    portfolioList = portfolioList ?? []
    return (
        <div className="portfolio">
            {
                portfolioList.map((portfolio) => {
                    const portfolioName = portfolio.name;
                    const portfolioId = portfolio.id
                    const sites = portfolio.sites ?? []
                    return (
                        <div key={portfolioId}>
                            <div className="item-suggest" key={portfolioId}>
                                <AntButton
                                    type="default"
                                    data-portfolio-id={portfolioId}
                                    onClick={onClick}
                                >
                                    <CompassOutlined/><HighlightFoundText
                                    text={portfolioName} value={searchText}/>
                                </AntButton>
                            </div>
                            {
                                sites.map((site, idxS) => {
                                    return (
                                        <div
                                            className="site"
                                            key={idxS.toString()}>
                                            <div className="item-suggest">
                                                <AntButton
                                                    type="default"
                                                    data-portfolio-id={portfolioId}
                                                    data-site-id={site.id}
                                                    onClick={onClick}
                                                >
                                                    <HomeOutlined/>
                                                    <HighlightFoundText
                                                        text={site.name}
                                                        value={searchText}
                                                    />
                                                </AntButton>
                                            </div>
                                            <div className="plant">
                                                {
                                                    site.plants.map((plant, idxP) => {
                                                        return (
                                                            <div
                                                                className="item-suggest"
                                                                key={idxS.toString() + '-' + idxP.toString()}>
                                                                <AntButton
                                                                    type="default"
                                                                    data-portfolio-id={portfolioId}
                                                                    data-site-id={site.id}
                                                                    data-plant-id={plant.id}
                                                                    onClick={onClick}
                                                                >
                                                                    <HddOutlined/><HighlightFoundText
                                                                    text={plant.name} value={searchText}/>
                                                                </AntButton>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}