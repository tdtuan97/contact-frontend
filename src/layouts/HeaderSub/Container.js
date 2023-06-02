import React, {Component} from 'react';
import President from './President';
import {connect} from 'react-redux';
import {clearToken} from "@features/Auth/redux/actions";
import {
    toggleSider,
    fetchDataSearch,
    selectDataSearch,
    toggleMenu
} from "@features/Common/redux";
import {withRouter} from "react-router-dom";
import helpers from "@ultis/helpers";

class Container extends Component {
    handleSelectDataSearch = (portfolioId, siteIdSelected, plantIdSelected) => {
        // Render text on search box
        this.props.selectDataSearch(portfolioId, siteIdSelected, plantIdSelected)

        let {path, params}      = this.props.match
        path                    = path ?? "";
        const {plantId, siteId} = params;
        const isIndex           = !plantId && !siteId

        switch (true) {
            case plantIdSelected !== undefined:
                if (isIndex) {
                    path = path + "/plant/:plantId"
                }
                path = path.replace(":siteId", ":plantId")
                path = path.replace("/site/", "/plant/")
                path = path.replace(":plantId", plantIdSelected)
                break
            case siteIdSelected !== undefined:
                if (isIndex) {
                    path = path + "/site/:siteId"
                }
                path = path.replace(":plantId", ":siteId")
                path = path.replace("/plant/", "/site/")
                path = path.replace(":siteId", siteIdSelected)
                break
            default:
                path = path.replace("/plant/", "")
                path = path.replace("/site/", "")
                path = path.replace(":siteId", "")
                path = path.replace(":plantId", "")
                break;
        }

        this.props.history.push(path);
    }

    render() {
        return (<President
            {...this.props}
            handleLogout={this.props.clearToken}
            handleToggleSider={this.props.toggleSider}
            handleSelectDataSearch={this.handleSelectDataSearch}
            handleToggleMenu={this.props.toggleMenu}
        />)
    }

    componentDidMount() {
        this.fetchSubHeader();
    }

    componentDidUpdate(prevProps) {
        const currentMatch = this.props.match
        const prevMatch = prevProps.match

        if(currentMatch.path !== prevMatch.path){
           this.selectScopeData()
        }
    }

    /**
     * Fetch scope data
     */
    fetchSubHeader = () => {
        const {plantId, siteId} = this.props.match.params;
        this.props.fetchDataSearch(this.props.auth.user.id, siteId, plantId);
        this.selectScopeData()
    }

    /**
     * Select scope data
     */
    selectScopeData = () => {
        let {plantId, siteId} = this.props.match.params;
        this.props.selectDataSearch(null, siteId, plantId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearToken      : () => {
            dispatch(clearToken());
        },
        toggleSider     : () => {
            dispatch(toggleSider());
        },
        fetchDataSearch : (userId, siteIdDefault, plantIdDefault) => {
            dispatch(fetchDataSearch(userId, siteIdDefault, plantIdDefault));
        },
        toggleMenu      : () => {
            dispatch(toggleMenu());
        },
        selectDataSearch: (portfolioId, siteId, plantId) => {
            dispatch(selectDataSearch(portfolioId, siteId, plantId));
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth  : state.auth,
        common: state.common,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container))