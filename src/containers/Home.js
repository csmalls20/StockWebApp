import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { add_stock_price, get_stock_price } from '../actions/stock';



const Home = ({
    get_stock_price,
    add_stock_price,
    regular_market_price,
    user_id,
    username
}) => {
    useEffect(() => {
        get_stock_price();
    }, [])

    const [formData, setformData] = useState({
        money_to_invest: ''
    });

    const { money_to_invest } = formData;


    const [dropdownValue, setDropdownValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        get_stock_price(dropdownValue);
    };

    const onInputChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

    const onAddStock = (e) => {
        e.preventDefault();
        add_stock_price(user_id, dropdownValue, money_to_invest, regular_market_price, profit_or_loss);
        console.log(user_id);
        console.log(dropdownValue);
        console.log(money_to_invest);
        console.log(regular_market_price);
        console.log(profit_or_loss);
    }

    const onSelectChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(e.target.value);
        setDropdownValue(value);
    }

    const profit_or_loss = money_to_invest > regular_market_price ? 'Profit' : 'Loss';
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Home of servey app"
                />
                <title>StockWebApp | Home</title>
            </Helmet>
            <div className='container m-5 p-5'>
                <span className="badge rounded-pill bg-dark">
                    <div className='text-light'>
                        {username}
                    </div>
                </span>
                <h3 className='text-success'>
                    <span className='text-dark m-1'>Stock Price</span>
                    {regular_market_price}
                </h3>
                <form onSubmit={(e) => onSubmit(e)}>
                    <select
                        className="form-control"
                        onChange={onSelectChange}
                    >
                        <option value='Select'>Select</option>
                        <option value='AAPL'>AAPL</option>
                        <option value='MSFT'>MSFT</option>
                        <option value='TSLA'>TSLA</option>
                        <option value='INTC'>INTC</option>
                        <option value='HPQ'>HPQ</option>
                        <option value='DELL'>DELL</option>
                        <option value='GOOGL'>GOOGL</option>
                        <option value='FB'>FB</option>
                        <option value='TWTR'>TWTR</option>
                        <option value='NFLX'>NFLX</option>
                    </select>
                    <button type='submit' className='btn btn-primary mt-2'>GET VALUE</button>
                </form>
                <hr />
                <form onSubmit={(e) => onAddStock(e)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="User Id"
                            name="author"
                            value={user_id}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Money to Invest"
                            name="money_to_invest"
                            value={money_to_invest}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Profit or Loss"
                            name="profit_or_loss"
                            value={profit_or_loss}
                            onChange={(e) => onInputChange(e)}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Stock Price"
                            name="stock_price"
                            value={regular_market_price}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Comany Sign"
                            name="company"
                            value={dropdownValue}
                            readOnly
                        />
                    </div>
                    <button type='submit' disabled={regular_market_price ? false : true} className='btn btn-primary mr-2'>ADD STOCK</button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user_id: state.profile.user_id,
    username: state.profile.username,
    regular_market_price: state.stock.regular_market_price
});

export default connect(
    mapStateToProps, {
    get_stock_price,
    add_stock_price
})(Home);