import {apiGet, apiPost, apiPostForm, apiPut} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";
import helpers from "@ultis/helpers";

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
 * Paginate
 * @param params
 * @returns
 */
export function exportContacts(params = {}) {
    let queries = {
        ...params,
        page : params.page ?? 1,
        limit: params.limit ?? 15,
        all  : '1'
    }

    return dispatch => {
        dispatch(exportContactsLoadingAction())
        dispatch(apiGet(`export/contacts`, queries, {}, exportContactsAction))
    };
}

function exportContactsAction(response) {
    let data = response.data ?? {}
    let filename = data.filename ?? null
    let url = filename ? (process.env.REACT_APP_HOST + filename) : null;
    if (url){
        helpers.download(url, url.split('/').reverse()[0])
    }
    return {
        type   : CONSTANTS.EXPORT_CONTACT_LIST,
        payload: response
    };
}

function exportContactsLoadingAction() {
    return {
        type   : CONSTANTS.EXPORT_CONTACT_LIST_LOADING,
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
 * Delete
 * @param id
 * @param status
 * @returns
 */
export function changeContactPublicStatus(id, status) {
    let url = status ? "public" : "revoke"
    return dispatch => {
        dispatch(changeContactPublicStatusLoadingAction(id))
        dispatch(apiPost(`contacts/${id}/${url}`, {}, {}, changeContactPublicStatusAction))
    };
}

function changeContactPublicStatusAction(response) {
    return {
        type   : CONSTANTS.CHANGE_CONTACT_PUBLIC_STATUS,
        payload: response
    };
}

function changeContactPublicStatusLoadingAction(id) {
    return {
        type   : CONSTANTS.CHANGE_CONTACT_PUBLIC_STATUS_LOADING,
        payload: {
            id: id
        }
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

/**
 * Create
 * @param params
 * @returns
 */
export function importContacts(params) {
    return dispatch => {
        dispatch(importContactsLoadingAction())
        dispatch(apiPost(`import/contacts`, params, {}, importContactsAction))
    };
}

function importContactsAction(response) {
    return {
        type   : CONSTANTS.IMPORT_CONTACT_LIST,
        payload: response
    };
}

function importContactsLoadingAction() {
    return {
        type   : CONSTANTS.IMPORT_CONTACT_LIST_LOADING,
        payload: null
    };
}

/**
 * Create
 * @returns
 * @param filename
 */
export function setUploadFile(filename) {
    return dispatch => {
        dispatch(setUploadFileAction(filename))
    };
}
function setUploadFileAction(filename) {
    return {
        type   : CONSTANTS.SET_UPLOAD_FILE,
        payload: filename
    };
}

/**
 * Detail
 * @param id
 * @returns
 */
export function getContactShared(id) {
    return dispatch => {
        id = id ?? ""
        dispatch(getContactSharedLoadingAction())
        dispatch(apiGet(`contacts/${id}/shared-public`, {}, {}, getContactSharedAction))
    };
}

function getContactSharedAction(response) {
    return {
        type   : CONSTANTS.GET_CONTACT_SHARED,
        payload: response
    };
}

function getContactSharedLoadingAction() {
    return {
        type   : CONSTANTS.GET_CONTACT_SHARED_LOADING,
        payload: null
    };
}