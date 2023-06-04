import initialState from "./initialState";
import * as CONSTANTS from "./constants";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";

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
         * Get list
         */
        case CONSTANTS.MASTER_CONTACT_GROUP_LIST:
            return {
                ...state,
                listContactGroup: {
                    ...state.listContactGroup,
                    loading: false,
                    data   : payload ? payload.data : {},
                },
            }
        case CONSTANTS.MASTER_CONTACT_GROUP_LIST_LOADING:
            return {
                ...state,
                listContactGroup: {
                    ...state.listContactGroup,
                    loading: true,
                },
            }
        default:
            return state;
    }
}