import { combineReducers } from "redux";
import auth from './auth';
import profile from './profile';
import stock from './stock';

export default combineReducers({
    auth,
    profile,
    stock
});