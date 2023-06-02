import initialState from "./initialState";
import * as CONSTANTS from './constants'

export function reducer(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.SOCKET_CONNECT:
            return {
                ...state,
            };
        default:
            return state;
    }
}