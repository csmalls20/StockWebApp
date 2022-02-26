import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    profile_pic: ''
}

export default function Profile(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                user_id: payload.user_id,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                profile_pic: payload.profile_pic
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state
            }
        case LOGOUT:
            return {
                ...state,
                user_id: '',
                username: '',
                first_name: '',
                last_name: '',
                profile_pic: ''
            }
        default:
            return state
    };
}

