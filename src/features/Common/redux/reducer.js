import initialState from "./initialState";
import * as CONSTANTS from './constants'
import {LOCATION_CHANGE} from "connected-react-router";
import {PERMISSIONS} from "@routes/middleware";
import helpers from "@ultis/helpers";

export function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            const locationPayload = action.payload ?? {};
            const pathname        = locationPayload.location.pathname;
            let isClear           = false
            for (let permissionsKey in PERMISSIONS) {
                if (PERMISSIONS[permissionsKey] === helpers.trimChar(pathname, "/")) {
                    isClear = true
                    break;
                }
            }

            let searchData = {
                ...state.searchData
            }

            if (isClear) {
                searchData = {
                    ...searchData,
                    siteIdSelected   : null,
                    siteNameSelected : '',
                    plantIdSelected  : null,
                    plantNameSelected: '',
                }
            }

            return {
                ...state,
                searchData: {
                    ...searchData
                },
                fullScreen: {
                    isActive : false,
                    elementId: '',
                    class    : '',
                },
            };

        case CONSTANTS.COMMON_RESET:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.BROWSER_FULL_SCREEN_ACTION:
            return {
                ...state,
                browserFullScreen: {
                    ...state.browserFullScreen,
                    isActive: true,
                }
            };
        case CONSTANTS.BROWSER_EXIT_FULL_SCREEN_ACTION:
            return {
                ...state,
                browserFullScreen: {
                    ...state.browserFullScreen,
                    isActive: false,
                }
            };
        case CONSTANTS.FULL_SCREEN_ACTION:
            return {
                ...state,
                fullScreen: {
                    isActive : true,
                    elementId: action.payload,
                    class    : 'full-screen',
                }
            };
        case CONSTANTS.EXIT_FULL_SCREEN_ACTION:
            return {
                ...state,
                fullScreen: {
                    isActive : false,
                    elementId: '',
                    class    : '',
                }
            };
        case CONSTANTS.TOGGLE_SIDER_ACTION:
            return {
                ...state,
                siderCollapsed: !state.siderCollapsed
            };
        case CONSTANTS.FETCH_DATA_SEARCH_LOADING_ACTION:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    loading: true,
                }
            };
        case CONSTANTS.FETCH_DATA_SEARCH_ACTION:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    loading: false,
                    portfolioList: action.payload ?? []
                }
            };
        case CONSTANTS.SELECT_DATA_SEARCH_ACTION:
            let portfolioIdSelected = action.payload.portfolioId
            let siteIdSelected      = action.payload.siteId
            let plantIdSelected     = action.payload.plantId

            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    portfolioIdSelected: portfolioIdSelected,
                    siteIdSelected     : siteIdSelected,
                    plantIdSelected    : plantIdSelected,
                    displayMenu        : false
                }
            };
        case CONSTANTS.TOGGLE_MENU_ACTION:
            return {
                ...state,
                searchData: {
                    ...state.searchData,
                    displayMenu: !state.searchData.displayMenu,
                }
            };
        case CONSTANTS.SET_DATA_SEARCH_DEFAULT_ACTION:
            return {
                ...state,
                searchData: {
                    ...state.searchData,

                    // Set default data
                    siteIdDefault : action.payload.siteIdDefault,
                    plantIdDefault: action.payload.plantIdDefault,
                }
            };
        default:
            return state;
    }
}

function getScopeSelected(sites, siteIdDefault, plantIdDefault) {
    let siteNameDefault  = null;
    let plantNameDefault = null;

    if (sites.length > 0) {
        let siteDefault = sites.find(site => site.id === siteIdDefault)
        if (plantIdDefault) {
            sites.forEach(site => {
                let plantFind = site.plants.find(plant => plant.id === plantIdDefault)
                if (plantFind) {
                    siteIdDefault    = site.id
                    siteNameDefault  = site.name
                    plantNameDefault = plantFind.name
                }
            })
        } else if (siteDefault) {
            siteNameDefault  = siteDefault.name
            let plantDefault = siteDefault.plants.find(plant => plant.id === plantIdDefault)
            if (plantDefault) {
                plantNameDefault = plantDefault.name
            }
        }
    }

    return {
        siteNameSelected : siteNameDefault,
        plantNameSelected: plantNameDefault,
    }
}