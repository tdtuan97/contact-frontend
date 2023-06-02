import * as CONSTANTS from "./constants";

export function resetStore() {
    return {
        type   : CONSTANTS.RESET_ACTION,
        payload: null
    };
}

export function example() {
    return dispatch => {
        dispatch(exampleAction(null))
    }
}

export function exampleAction(data) {
    return {
        type   : CONSTANTS.EXAMPLE,
        payload: data
    };
}