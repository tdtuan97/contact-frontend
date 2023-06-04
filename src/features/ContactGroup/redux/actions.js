import {apiGet, apiPost, apiPut} from "@common/crud";
import * as CONSTANTS from "./constants";
import {apiDelete} from "@common/crud/actions";

/**
 * Paginate
 * @param params
 * @returns
 */
export function getContactGroups(params = {}) {
    let queries = {
        page : params.page ?? 1,
        limit: params.limit ?? 15,
    }
    let name    = params.name ?? "";
    if (name) {
        queries.name = name
    }

    return dispatch => {
        dispatch(getContactGroupsLoadingAction())
        dispatch(apiGet(`contact-groups`, queries, {}, getContactGroupsAction))
    };
}

function getContactGroupsAction(response) {
    return {
        type   : CONSTANTS.GET_CONTACT_GROUP_LIST,
        payload: response
    };
}

function getContactGroupsLoadingAction() {
    return {
        type   : CONSTANTS.GET_CONTACT_GROUP_LIST_LOADING,
        payload: null
    };
}

/**
 * Detail
 * @param id
 * @returns
 */
export function getContactGroup(id) {
    return dispatch => {
        id = id ?? ""
        dispatch(getContactGroupLoadingAction())
        dispatch(apiGet(`contact-groups/${id}`, {}, {}, getContactGroupAction))
    };
}

function getContactGroupAction(response) {
    return {
        type   : CONSTANTS.GET_CONTACT_GROUP_DETAIL,
        payload: response
    };
}

function getContactGroupLoadingAction() {
    return {
        type   : CONSTANTS.GET_CONTACT_GROUP_DETAIL_LOADING,
        payload: null
    };
}

/**
 * Create
 * @param params
 * @returns
 */
export function createContactGroup(params) {
    return dispatch => {
        dispatch(createContactGroupLoadingAction())
        dispatch(apiPost(`contact-groups`, params, {}, createContactGroupAction))
    };
}

function createContactGroupAction(response) {
    return {
        type   : CONSTANTS.CREATE_CONTACT_GROUP,
        payload: response
    };
}

function createContactGroupLoadingAction() {
    return {
        type   : CONSTANTS.CREATE_CONTACT_GROUP_LOADING,
        payload: null
    };
}

/**
 * Update
 * @param id
 * @param params
 * @returns
 */
export function updateContactGroup(id, params) {
    id = id ?? ""
    return dispatch => {
        dispatch(updateContactGroupLoadingAction())
        dispatch(apiPut(`contact-groups/${id}`, params, {}, updateContactGroupAction))
    };
}

function updateContactGroupAction(response) {
    return {
        type   : CONSTANTS.UPDATE_CONTACT_GROUP,
        payload: response
    };
}

function updateContactGroupLoadingAction() {
    return {
        type   : CONSTANTS.UPDATE_CONTACT_GROUP_LOADING,
        payload: null
    };
}

/**
 * Delete
 * @param id
 * @returns
 */
export function deleteContactGroup(id) {
    id = id ?? ""
    return dispatch => {
        dispatch(deleteContactGroupLoadingAction())
        dispatch(apiDelete(`contact-groups/${id}`, {}, deleteContactGroupAction))
    };
}

function deleteContactGroupAction(response) {
    return {
        type   : CONSTANTS.DELETE_CONTACT_GROUP,
        payload: response
    };
}

function deleteContactGroupLoadingAction() {
    return {
        type   : CONSTANTS.DELETE_CONTACT_GROUP_LOADING,
        payload: null
    };
}

/**
 * Clear form rule
 * @returns {{payload: null, type: string}}
 */
export function clearFormContactGroup() {
    return {
        type   : CONSTANTS.CLEAR_FORM_CONTACT_GROUP,
        payload: null
    };
}