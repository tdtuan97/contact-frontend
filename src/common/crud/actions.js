import axios from "axios";
import {RESPONSE_ACTION, PENDING_ACTION} from './constants'
import {clearToken} from "@features/Auth/redux/actions";
import {loadStateFromLocal} from "@features/Auth/redux/reducer";
import helpers from "@ultis/helpers";
import * as CONSTANTS_COMMON from "@features/Common/redux/constants";

export const CODE_BAD_REQUEST     = 400;
export const CODE_NOT_FOUND       = 404;
export const CODE_SERVER_ERROR    = 500;
export const CODE_SUCCESS         = 200;
export const CODE_UNAUTHENTICATED = 401;

export const MESSAGE_BAD_REQUEST     = "Bad Request";
export const MESSAGE_NOT_FOUND       = "Not Found";
export const MESSAGE_SERVER_ERROR    = "Internal Server Error";
export const MESSAGE_SUCCESS         = "OK";
export const MESSAGE_UNAUTHENTICATED = "Unauthorized";

export function reset() {
    return dispatch => {
        dispatch(resetAction())
    }
}

export function resetAction() {
    return {
        type   : CONSTANTS_COMMON.RESET_ACTION,
        payload: null
    };
}

export function pendingAction() {
    return {
        type   : PENDING_ACTION,
        payload: null
    };
}

function generateUrl(endPoint) {
    return helpers.getEndPointAPI() + endPoint;
}

/*
    Apply token
 */
export function applyToken(config) {
    const state = loadStateFromLocal();
    config      = {};
    if (state.meta.token !== null) {
        config = {
            headers: {Authorization: `Bearer ${state.meta.token}`}
        }
    }

    return config
}

/*
    Apply query string to URL
 */
function applyQueryString(url, params) {
    const queryString = new URLSearchParams(params).toString();
    url               = url + '?' + queryString;
    url               = url.replace('/?', '?')
    return url;
}

/*
    Mockup for test
 */
export function mockup(mockData, callback, delay = 1000) {
    return dispatch => {
        dispatch(pendingAction())
        return new Promise(function (resolvePromise) {
            setTimeout(() => {
                resolvePromise(mockData);
            }, delay)
        }).then(data => {
            resolve(dispatch, {
                "status": CODE_SUCCESS,
                "data"  : {
                    "code"   : CODE_SUCCESS,
                    "message": MESSAGE_SUCCESS,
                    "data"   : data
                }
            }, callback)
        });
    }
}

/*
    Get data
 */
export function apiGet(endPoint = '', params = {}, config = {}, callback = null) {
    let url = generateUrl(endPoint)
    url     = applyQueryString(url, params);
    config  = applyToken();

    return dispatch => {
        dispatch(pendingAction())
        return axios.get(url, config).then(response => {
            resolve(dispatch, response, callback)
        }).catch(reason => {
            reject(dispatch, reason, callback)
        });
    }
}

/*
    Post data
 */
export function apiPost(endPoint = '', params = {}, config = {}, callback = null) {
    let url = generateUrl(endPoint)
    config  = applyToken();

    return dispatch => {
        dispatch(pendingAction())
        return axios.post(url, params, config).then(response => {
            resolve(dispatch, response, callback)
        }).catch(reason => {
            reject(dispatch, reason, callback)
        });
    }
}

/*
    Put data
 */
export function apiPut(endPoint = '', params = {}, config = {}, callback = null) {
    let url = generateUrl(endPoint)
    config  = applyToken();

    return dispatch => {
        dispatch(pendingAction())
        return axios.put(url, params, config).then(response => {
            resolve(dispatch, response, callback)
        }).catch(reason => {
            reject(dispatch, reason, callback)
        });
    }
}

/*
    Post form data
 */
export function apiPostForm(endPoint = '', params = {}, config = {}, callback = null) {
    let url = generateUrl(endPoint)
    config  = applyToken();

    // Overwrite header
    let headers             = config.headers;
    headers['Content-Type'] = "multipart/form-data";
    config.headers          = headers;

    // Create form data
    const form = new FormData();
    params     = params ?? {}
    for (let paramsKey in params) {
        form.append(paramsKey, params[paramsKey]);
    }

    return dispatch => {
        dispatch(pendingAction())
        return axios.post(url, form, config).then(response => {
            resolve(dispatch, response, callback)
        }).catch(reason => {
            reject(dispatch, reason, callback)
        });
    }
}

/*
    Post delete
 */
export function apiDelete(endPoint = '', config = {}, callback = null) {
    let url = generateUrl(endPoint)
    config  = applyToken();

    return dispatch => {
        dispatch(pendingAction())
        return axios.delete(url, config).then(response => {
            resolve(dispatch, response, callback)
        }).catch(reason => {
            reject(dispatch, reason, callback)
        });
    }
}

/*
    Resolve promise
 */
export function resolve(dispatch, response, callback) {
    dispatch(responseAction(response))
    if (typeof callback === "function") {
        dispatch(callback(response.data))
    }
}

/*
    Reject promise
 */
export function reject(dispatch, reason, callback) {
    const responseError = reason.response;
    const dateError     = responseError ? responseError.data : {}

    let responseData = {
        data      : [],
        code      : null,
        message   : MESSAGE_SERVER_ERROR,
        errors    : {},
        status    : CODE_SERVER_ERROR,
        statusText: MESSAGE_SERVER_ERROR,
        ...reason.response,
        ...dateError
    };

    dispatch(responseAction(responseData))

    // Need callback function
    if (typeof callback === "function") {
        dispatch(callback(responseData.data))
    }

    // For case auth
    if (responseData.status === CODE_UNAUTHENTICATED || responseData.code === CODE_UNAUTHENTICATED) {
        dispatch(clearToken())
    }
}

/*
    Response action
 */
function responseAction(response) {
    const data = response.data ?? {}

    const payload = {
        data      : data.data !== undefined ? data.data : [],
        code      : data.code,
        message   : data.message,
        errors    : data.errors,
        status    : response.status !== undefined ? response.status : CODE_SERVER_ERROR,
        statusText: response.statusText !== undefined ? response.statusText : MESSAGE_SERVER_ERROR,
    }

    return {
        type   : RESPONSE_ACTION,
        payload: payload
    };
}