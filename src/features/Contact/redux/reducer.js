import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import {LOCATION_CHANGE} from "connected-react-router";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }

        case CONSTANTS.EVENT_FETCH:
            payload  = payload ?? {}
            let data = payload.data ?? {}
            let meta = data.meta ?? {}
            return {
                ...state,
                list: {
                    data      : data.items ?? [],
                    pagination: {
                        current : meta.current ?? 0,
                        pageSize: meta.pageSize ?? 0,
                        total   : meta.total ?? 0,
                    },
                    loading   : false,
                },
            };
        case CONSTANTS.EVENT_FETCH_LOADING:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                }
            }
        case CONSTANTS.EVENT_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    errors : payload.errors,
                    data   : payload.data,
                    id     : payload.data.id,
                    isFound: payload.data.id !== undefined && payload.data.id !== null,
                },
            };
        case CONSTANTS.EVENT_DETAIL_LOADING:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                    errors : {},
                    data   : {},
                    id     : null,
                    isFound: true,
                }
            }
        case CONSTANTS.EVENT_DETAIL_VISIBLE: {
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading     : true,
                    errors      : {},
                    data        : {},
                    id          : null,
                    isFound     : true,
                    modalVisible: payload,
                }
            }
        }
        case CONSTANTS.EVENT_UPDATE:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    errors : payload.errors,
                    data   : payload.data,
                    update : {
                        ...state.detail.update,
                        modalVisible: false,
                        loading     : false,
                    }
                }
            };
        case CONSTANTS.EVENT_UPDATE_LOADING:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    update: {
                        ...state.detail.update,
                        modalVisible: false,
                        loading     : true,
                    }
                }
            }
        case CONSTANTS.EVENT_DELETE:
            let errors = payload.errors ?? [];
            return {
                ...state,
                delete: {
                    ...state.delete,
                    errors      : errors,
                    modalVisible: false,
                    loading     : false,
                    isDeleted   : errors === 0,
                }
            };
        case CONSTANTS.EVENT_DELETE_LOADING:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    errors      : [],
                    modalVisible: false,
                    loading     : true,
                    isDeleted   : false,
                }
            }

        case CONSTANTS.EVENT_DELETE_VISIBLE_CONFIRM: {
            return {
                ...state,
                delete: {
                    ...state.delete,
                    errors      : [],
                    modalVisible: payload,
                    loading     : false,
                    isDeleted   : false,
                }
            }
        }
        case LOCATION_CHANGE:
            return {
                ...state,
                delete: {
                    ...initialState.delete,
                }
            }
        default:
            return state
    }
}