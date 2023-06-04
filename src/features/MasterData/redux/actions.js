import {apiGet} from "@common/crud";
import * as CONSTANTS from "./constants";

/**
 * Paginate
 * @param params
 * @returns
 */
export function getAllContactGroups(params = {}) {
    return dispatch => {
        dispatch(getAllContactGroupsLoadingAction())
        dispatch(apiGet(`contact-groups`, {
            all: 1
        }, {}, getAllContactGroupsAction))
    };
}

function getAllContactGroupsAction(response) {
    return {
        type   : CONSTANTS.MASTER_CONTACT_GROUP_LIST,
        payload: response
    };
}

function getAllContactGroupsLoadingAction() {
    return {
        type   : CONSTANTS.MASTER_CONTACT_GROUP_LIST_LOADING,
        payload: null
    };
}