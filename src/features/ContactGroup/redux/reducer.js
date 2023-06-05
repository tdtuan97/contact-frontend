import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";
import {pushMessageSuccess} from "@layouts";
import {CODE_SUCCESS} from "@common/crud";

export function reducer(state = initialState, action) {
    let payload = action.payload ?? {};
    switch (action.type) {
        /**
         * Reset action
         */
        case CONSTANTS_COMMON.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }

        /**
         * Reset action
         */
        case CONSTANTS.CLEAR_FORM_CONTACT_GROUP:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    ...initialState.detail
                },
                create: {
                    ...state.create,
                    ...initialState.create
                },
                update: {
                    ...state.update,
                    ...initialState.update
                },
            }

        /**
         * Get list
         */
        case CONSTANTS.GET_CONTACT_GROUP_LIST:
            let listData = payload ? payload.data : {}
            listData =  typeof listData === 'object' ? listData : {};
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data   : listData,
                },
            }
        case CONSTANTS.GET_CONTACT_GROUP_LIST_LOADING:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: true,
                },
            }

        /**
         * Get detail
         */
        case CONSTANTS.GET_CONTACT_GROUP_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.GET_CONTACT_GROUP_DETAIL_LOADING:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: true,
                },
            }

        /**
         * Create
         */
        case CONSTANTS.CREATE_CONTACT_GROUP:
            if (payload.code === CODE_SUCCESS) {
                pushMessageSuccess("Create success.");
            }
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.CREATE_CONTACT_GROUP_LOADING:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                },
            }

        /**
         * Update
         */
        case CONSTANTS.UPDATE_CONTACT_GROUP:
            if (payload.code === CODE_SUCCESS) {
                pushMessageSuccess("Update success.");
            }
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.UPDATE_CONTACT_GROUP_LOADING:
            return {
                ...state,
                update: {
                    ...state.update,
                    loading: true,
                },
            }

        /**
         * Delete
         */
        case CONSTANTS.DELETE_CONTACT_GROUP:
            let isDeleted = false;
            if (payload.code === CODE_SUCCESS) {
                pushMessageSuccess("Delete success.");
                isDeleted = true;
            }
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading  : false,
                    data     : payload.data ?? {},
                    errors   : payload.errors ?? {},
                    isDeleted: isDeleted
                },
            }
        case CONSTANTS.DELETE_CONTACT_GROUP_LOADING:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading  : true,
                    isDeleted: false,
                },
            }

        default:
            return state;
    }
}