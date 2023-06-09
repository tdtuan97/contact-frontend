import {
    LOGIN_LOADING,
    SET_TOKEN_ACTION,
    CLEAR_TOKEN_ACTION,
    ARG_TOKEN, UPDATE_TOKEN_ACTION, REGISTER_LOADING_ACTION, REGISTER_ACTION,
} from "./constants";
import {
    CODE_SUCCESS
} from "@common/crud";

import {apiPost} from "@common/crud";

export function login(params) {
    return dispatch => {
        dispatch(loginLoadingAction())
        dispatch(apiPost('auth/login', params, {}, setTokenAction))
    }
}

export function loginLoadingAction() {
    return {
        type   : LOGIN_LOADING,
        payload: null
    };
}

export function setTokenAction(data) {
    if (data.code === CODE_SUCCESS) {
        localStorage.setItem(ARG_TOKEN, JSON.stringify(data))
    }
    return {
        type   : SET_TOKEN_ACTION,
        payload: null
    };
}

export function updateTokenAction(params){
    return {
        type   : UPDATE_TOKEN_ACTION,
        payload: params
    };
}

export function clearToken() {
    localStorage.removeItem(ARG_TOKEN)
    return dispatch => {
        dispatch(clearTokenAction())
    };
}

export function clearTokenAction() {
    return {
        type   : CLEAR_TOKEN_ACTION,
        payload: null
    };
}

export function register(data) {
    return dispatch => {
        dispatch(registerLoadingAction())
        return dispatch(apiPost('auth/register', data, {}, registerAction))
    }
}


export function registerLoadingAction() {
    return {
        type   : REGISTER_LOADING_ACTION,
        payload: null
    };
}

export function registerAction(data) {
    return {
        type   : REGISTER_ACTION,
        payload: data
    };
}
