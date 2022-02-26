import {
    GET_STOCK_PRICE_SUCCESS,
    GET_STOCK_PRICE_FAIL,
    ADD_STOCK_SUCCESS,
    ADD_STOCK_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    regular_market_price: ''
}

export default function Stock(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_STOCK_SUCCESS:
            return {
                ...state
            }
        case GET_STOCK_PRICE_SUCCESS:
            return {
                ...state,
                regular_market_price: payload.regularMarketPrice
            }
        case GET_STOCK_PRICE_FAIL:
        case ADD_STOCK_FAIL:
        case LOGOUT:
            return {
                ...state,
                regular_market_price: ''
            }
        default:
            return state
    };
}

