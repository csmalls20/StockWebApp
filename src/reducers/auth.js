import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null
}

export default function Auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('access'),
                refresh: localStorage.getItem('refresh')
            }
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: localStorage.getItem('access')
            }
        case AUTHENTICATED_FAIL:
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case REFRESH_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false
            }
        default:
            return state
    };
}

