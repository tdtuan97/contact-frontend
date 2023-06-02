import {EXAMPLE} from "./constants";

export function example() {
    return dispatch => {
        dispatch(exampleAction(null))
    }
}

export function exampleAction(data) {
    return {
        type   : EXAMPLE,
        payload: data
    };
}