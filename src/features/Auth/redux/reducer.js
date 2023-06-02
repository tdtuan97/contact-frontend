import initialState from "./initialState";
import {
    SET_TOKEN_ACTION, CLEAR_TOKEN_ACTION, ARG_TOKEN, LOGIN_LOADING, UPDATE_TOKEN_ACTION
} from "./constants";

export function reducer(state = initialState, action) {
    const stateLocal = loadStateFromLocal();
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: true
                }
            };
        case UPDATE_TOKEN_ACTION:
            updateStateLocal(action.payload)
            return {
                ...state,
                ...stateLocal,
            };
        case SET_TOKEN_ACTION:
        case CLEAR_TOKEN_ACTION:
            return {
                ...state,
                ...stateLocal,
                login: {
                    loading: false
                }
            };
        default:
            return {
                ...state,
                ...stateLocal,
            };
    }
}

function updateStateLocal(dataNew = {}) {
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        let nameNew = dataNew.name ?? null
        let logoUrlNew = dataNew.logoUrl ?? null

        let portfolioCurrent = dataLocal.data.portfolio ?? {}
        portfolioCurrent = {
            ...portfolioCurrent,
            name: nameNew,
            logoUrl: logoUrlNew,
        }
        dataLocal.data.portfolio = portfolioCurrent;

        // Update local storage
        localStorage.setItem(ARG_TOKEN, JSON.stringify(dataLocal))
    } catch (e) {
        console.log(e)
    }
}

export function loadStateFromLocal() {
    let stateFromLocal;
    try {
        // Load data from local
        let dataLocal = JSON.parse(localStorage.getItem(ARG_TOKEN));

        // Load data auth
        let data = dataLocal.data ?? {}
        let token = data.token ?? '';

        stateFromLocal = {
            user: {
                id: data.id,
                email: data.email,
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                full_name: data.full_name,
            },
            meta: {
                token: token,
            },
        }
    } catch (e) {
        localStorage.removeItem(ARG_TOKEN)
        stateFromLocal = {
            ...initialState
        }
    }
    return stateFromLocal;
}