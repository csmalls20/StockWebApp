import axios from 'axios';
import {
    GET_STOCK_PRICE_SUCCESS,
    GET_STOCK_PRICE_FAIL,
    ADD_STOCK_SUCCESS,
    ADD_STOCK_FAIL
} from './types';


export const get_stock_price = (symbol) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'LsprnNVi5G7KA8siNAbkr63lB1ysS46X6HgkUzw6'
        }
    };

    try {
        const res = await axios.get(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`, config);

        console.log(res.data.quoteResponse.result[0].regularMarketPrice);

        if (res.status === 200) {
            dispatch({
                type: GET_STOCK_PRICE_SUCCESS,
                payload: res.data.quoteResponse.result[0]
            });
        } else {
            dispatch({
                type: GET_STOCK_PRICE_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: GET_STOCK_PRICE_FAIL
        });
    }
}


export const add_stock_price = (author, company, money_to_invest, stock_price, profit_or_loss) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Auth ${localStorage.getItem('access')}`
            }
        };
        const body = JSON.stringify({ author, company, money_to_invest, stock_price, profit_or_loss });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/stock/`, body, config);
            console.log(res.data);
            console.log(res.status);

            if (res.status === 201) {
                dispatch({
                    type: ADD_STOCK_SUCCESS,
                    payload: res.data
                });

            } else {
                dispatch({
                    type: ADD_STOCK_FAIL
                });
            }
        } catch (error) {
            dispatch({
                type: ADD_STOCK_FAIL
            });
        }
    } else {
        dispatch({
            type: ADD_STOCK_FAIL
        });
    }
}
