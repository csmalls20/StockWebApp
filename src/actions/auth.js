import axios from 'axios';
import { user_profile } from './profile';
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
} from './types';

export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Auth ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/authenticated`, config);

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
                console.log('Auth Success');
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}


export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config);
        console.log(res.data.message);
        console.log(res.data.user.username);

        if (res.status === 200) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
}


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, body, config);

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(user_profile());
            console.log('Login');
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/token/refresh/`, body, config);

            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        } catch (error) {
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    console.log('Logout');
};