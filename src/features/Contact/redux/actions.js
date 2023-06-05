import {apiGet, apiPost, apiPut} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Paginate
 * @param params
 * @returns
 */
export function getContacts(params = {}) {
    let queries = {
        ...params,
        page : params.page ?? 1,
        limit: params.limit ?? 15,
    }

    return dispatch => {
        dispatch(getContactsLoadingAction())
        dispatch(apiGet(`contacts`, queries, {}, getContactsAction))
    };
}

function getContactsAction(response) {
    return {
        type   : CONSTANTS.GET_CONTACT_LIST,
        payload: response
    };
}

function getContactsLoadingAction() {
    return {
        type   : CONSTANTS.GET_CONTACT_LIST_LOADING,
        payload: null
    };
}

/**
 * Detail
 * @param id
 * @returns
 */
export function getContact(id) {
    return dispatch => {
        id = id ?? ""
        dispatch(getContactLoadingAction())
        dispatch(apiGet(`contacts/${id}`, {}, {}, getContactAction))
    };
}

function getContactAction(response) {
    return {
        type   : CONSTANTS.GET_CONTACT_DETAIL,
        payload: response
    };
}

function getContactLoadingAction() {
    return {
        type   : CONSTANTS.GET_CONTACT_DETAIL_LOADING,
        payload: null
    };
}

/**
 * Create
 * @param params
 * @returns
 */
export function createContact(params) {
    return dispatch => {
        dispatch(createContactLoadingAction())
        dispatch(apiPost(`contacts`, params, {}, createContactAction))
    };
}

function createContactAction(response) {
    return {
        type   : CONSTANTS.CREATE_CONTACT,
        payload: response
    };
}

function createContactLoadingAction() {
    return {
        type   : CONSTANTS.CREATE_CONTACT_LOADING,
        payload: null
    };
}

/**
 * Update
 * @param id
 * @param params
 * @returns
 */
export function updateContact(id, params) {
    id = id ?? ""
    return dispatch => {
        dispatch(updateContactLoadingAction())
        dispatch(apiPut(`contacts/${id}`, params, {}, updateContactAction))
    };
}

function updateContactAction(response) {
    return {
        type   : CONSTANTS.UPDATE_CONTACT,
        payload: response
    };
}

function updateContactLoadingAction() {
    return {
        type   : CONSTANTS.UPDATE_CONTACT_LOADING,
        payload: null
    };
}

/**
 * Delete
 * @param id
 * @returns
 */
export function deleteContact(id) {
    id = id ?? ""
    return dispatch => {
        dispatch(deleteContactLoadingAction())
        dispatch(apiDelete(`contacts/${id}`, {}, deleteContactAction))
    };
}

function deleteContactAction(response) {
    return {
        type   : CONSTANTS.DELETE_CONTACT,
        payload: response
    };
}

function deleteContactLoadingAction() {
    return {
        type   : CONSTANTS.DELETE_CONTACT_LOADING,
        payload: null
    };
}

/**
 * Clear form rule
 * @returns {{payload: null, type: string}}
 */
export function clearFormContact() {
    return {
        type   : CONSTANTS.CLEAR_FORM_CONTACT,
        payload: null
    };
}