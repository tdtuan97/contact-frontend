import initialState from "./initialState";
import * as CONSTANTS from "./constants";

export function reducer(state = initialState, action) {
    let payload = action.payload;
    switch (action.type) {
        case CONSTANTS.RESET_ACTION:
            return {
                ...state,
                ...initialState
            }
        case CONSTANTS.EXAMPLE:
            return {
                ...state,
                example: payload
            };

        default:
            return state;
    }
}