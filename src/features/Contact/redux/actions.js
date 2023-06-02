import * as CONSTANTS from "./constants";
import {apiGet} from "@common/crud/actions";

export function fetchTableEvent(params) {
    return dispatch => {
        dispatch(fetchActionLoading())
        dispatch(apiGet('events', params, {}, fetchAction))
    };
}

function fetchActionLoading() {
    return {
        type   : CONSTANTS.EVENT_FETCH_LOADING,
        payload: {}
    }
}

function fetchAction(response) {
    return {
        type   : CONSTANTS.EVENT_FETCH,
        payload: response
    };
}

export function detailEvent(id) {
    return dispatch => {
        dispatch(detailActionLoading())
        dispatch(apiGet(`events/${id}`, {}, {}, detailAction))
    };
}

function detailAction(response) {
    return {
        type   : CONSTANTS.EVENT_DETAIL,
        payload: response
    };
}

function detailActionLoading() {
    return {
        type   : CONSTANTS.EVENT_DETAIL_LOADING,
        payload: null
    };
}