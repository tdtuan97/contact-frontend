import * as CONSTANTS from './constants'

/**
 * Reset store
 * @returns
 */
export function resetStore() {
    return {
        type: CONSTANTS.RESET_ACTION,
        payload: null
    };
}

/* ============== Action toggle sider ============== */
export function toggleSider() {
    return dispatch => {
        dispatch(toggleSiderAction())
    }
}

function toggleSiderAction() {
    return {
        type: CONSTANTS.TOGGLE_SIDER_ACTION,
        payload: null
    };
}

/* ============== Action when click Full screen / Exit full screen ============== */

/* ============== Action when click Full screen / Exit full screen ============== */
export function fullScreen(elementId) {
    return dispatch => {
        dispatch(fullScreenAction(elementId))
    }
}

function fullScreenAction(elementId) {
    return {
        type: CONSTANTS.FULL_SCREEN_ACTION,
        payload: elementId
    };
}

export function exitFullScreen() {
    return dispatch => {
        dispatch(exitFullScreenAction())
    }
}

function exitFullScreenAction() {
    return {
        type: CONSTANTS.EXIT_FULL_SCREEN_ACTION,
        payload: null
    };
}

export function setBrowserFullScreen() {
    document.body.requestFullscreen()
    return dispatch => {
        dispatch(setBrowserFullScreenAction())
    }
}

function setBrowserFullScreenAction() {
    return {
        type: CONSTANTS.BROWSER_FULL_SCREEN_ACTION,
        payload: null
    };
}

export function setBrowserExitFullScreen() {
    document.exitFullscreen()
    return dispatch => {
        dispatch(browserExitFullScreenAction())
    }
}

function browserExitFullScreenAction() {
    return {
        type: CONSTANTS.BROWSER_EXIT_FULL_SCREEN_ACTION,
        payload: null
    };
}

