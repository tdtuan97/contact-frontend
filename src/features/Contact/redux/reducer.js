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
        case CONSTANTS.CLEAR_FORM_CONTACT:
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
        case CONSTANTS.GET_CONTACT_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    loading: false,
                    data   : payload ? payload.data : [],
                },
            }
        case CONSTANTS.GET_CONTACT_LIST_LOADING:
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
        case CONSTANTS.GET_CONTACT_DETAIL:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    loading: false,
                    data   : payload.data ?? {},
                    errors : payload.errors ?? {},
                },
            }
        case CONSTANTS.GET_CONTACT_DETAIL_LOADING:
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
        case CONSTANTS.CREATE_CONTACT:
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
        case CONSTANTS.CREATE_CONTACT_LOADING:
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
        case CONSTANTS.UPDATE_CONTACT:
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
        case CONSTANTS.UPDATE_CONTACT_LOADING:
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
        case CONSTANTS.DELETE_CONTACT:
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
        case CONSTANTS.DELETE_CONTACT_LOADING:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading  : true,
                    isDeleted: false,
                },
            }

        /**
         * Update public status
         */
        case CONSTANTS.CHANGE_CONTACT_PUBLIC_STATUS:
            if (payload.code === CODE_SUCCESS) {
                pushMessageSuccess("Change status success.");
            }
            return {
                ...state,
                updatePublicStatus: {
                    ...state.updatePublicStatus,
                    loading: false,
                    errors : payload.errors ?? {},
                    id     : null
                },
            }
        case CONSTANTS.CHANGE_CONTACT_PUBLIC_STATUS_LOADING:
            return {
                ...state,
                updatePublicStatus: {
                    ...state.updatePublicStatus,
                    loading: true,
                    id     : payload.id
                },
            }

        /**
         * Export
         */
        case CONSTANTS.EXPORT_CONTACT_LIST:
            return {
                ...state,
                export: {
                    ...state.export,
                    loading: false,
                    data   : payload ? payload.data : {},
                },
            }
        case CONSTANTS.EXPORT_CONTACT_LIST_LOADING:
            return {
                ...state,
                export: {
                    ...state.export,
                    loading: true,
                },
            }

        case CONSTANTS.SET_UPLOAD_FILE:
            return {
                ...state,
                upload: {
                    ...state.upload,
                    filename: payload,
                },
            }

        /**
         * Export
         */
        case CONSTANTS.IMPORT_CONTACT_LIST:
            return {
                ...state,
                import: {
                    ...state.import,
                    loading: false,
                    data     : payload.data ?? [],
                    errors   : payload.errors ?? {},
                },
            }
        case CONSTANTS.IMPORT_CONTACT_LIST_LOADING:
            return {
                ...state,
                import: {
                    ...state.import,
                    loading: true,
                    data     : [],
                    errors   : {},
                },
            }

        default:
            return state;
    }
}