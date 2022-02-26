import axios from "axios";
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL
} from "./types";


export const user_profile = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Authorization': `Auth ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/profile/`, config);
            console.log(res.data[0]);
            if (res.status === 200) {
                dispatch({
                    type: LOAD_USER_PROFILE_SUCCESS,
                    payload: res.data[0]
                });
            } else {
                dispatch({
                    type: LOAD_USER_PROFILE_FAIL
                });
            }
        } catch (error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        });
    }
}
