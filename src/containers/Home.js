import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';
import { add_stock_price, get_stock_price } from '../actions/stock';
import StockTable from '../components/StockTable';

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

    const [money_to_invest, setMoneyToInvest] = useState('');

    const [dropdownValue, setDropdownValue] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        get_stock_price(dropdownValue);
    };

    const onSelectChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        console.log(e.target.value);
        setDropdownValue(value);
    }

    const [open, setOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [stocks, setStocks] = useState([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        type: 'success',
        body: ''
    })

    const [chart1, setChart1] = useState([])
    const [chart2, setChart2] = useState([])

    const [, forceUpdate] = useState();
    useEffect(() => {
        fetchStocks()
        forceUpdate()
    }, [])
    useEffect(() => {
        chartSync()
    }, [loading])
    const chartSync = () => {
        if (chart2.length === 0 || chart2.length !== stocks.length) {
            stocks.forEach((el) => {
                setChart2(old => [...old, {
                    x: el.symbol,
                    y: el.currPPS - el.broughtPPS
                }])
            })
        }
        console.log(chart2)
    }
    const addStock = async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Auth ${localStorage.getItem('access')}`,
                }
            };
            const body = JSON.stringify({
                symbol: dropdownValue,
                moneyToInvest: money_to_invest,
                broughtPPS: regular_market_price,
                shares: (money_to_invest / regular_market_price).toFixed(4)
            });

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/addStock`, body, config);
                console.log(res.data);
                console.log(res.status);

                if (res.status === 201) {
                    setMessage({
                        type: 'success',
                        body: 'Stock added'
                    })
                    setShowAlert(true)
                    console.log(body)
                    fetchStocks()
                } else {
                    setMessage({
                        type: 'success',
                        body: 'Updated'
                    })
                    setShowAlert(true)
                    fetchStocks()
                }
            } catch (err) {
                setMessage({
                    type: 'danger',
                    body: 'Some Error Occurred'
                })
                setShowAlert(true)
                fetchStocks()
            }
            setOpen(false)
        }
    }
    const fetchStocks = async () => {
        setLoading(true)
        console.log(localStorage.getItem('access'))
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Auth ${localStorage.getItem('access')}`,
                }
            };

            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/getStocks`, config);
                console.log(res.data);
                if (res.status === 200) {
                    setStocks(res.data)
                } else {
                    console.log("Some error occurred")
                }
                if (res.data) {
                    setLoading(false)
                }
            } catch (err) {
                console.log("Some error occurred")
                setLoading(false)
            }
        }
    }
    const iconLegend1 = {
        width: '10px',
        height: '10px',
        background: 'red',
        display: 'inline-block',
        marginRight: '4px'
    }
    const iconLegend2 = {
        width: '10px',
        height: '10px',
        background: 'black',
        display: 'inline-block',
        marginRight: '4px'
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Home of servey app"
                />
                <title>Stock Web App | Home</title>
            </Helmet>
            <div className='container mt-5 p-2'>
                <h1>Welcome</h1>
                {/* <p style={{ marginBottom: '4px' }}>Welcome</p> */}
                <span className="badge rounded-pill bg-dark">
                    <div className='text-light' style={{ fontSize: '18px' }}>
                        {username}
                    </div>
                </span>
                {showAlert && <Alert variant={message.type} onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>{message.body}</Alert.Heading>
                </Alert>}

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ width: '300px', margin: 'auto' }}>
                        <h4>Overview</h4>
                        <hr />
                        <p><div style={iconLegend1}></div> Profit / Loss</p>
                        {/* <p><span style={iconLegend2}></span> Bought price</p> */}
                    </div>
                    <div style={{ maxWidth: '500', height: '400px', margin: 'auto' }}>
                        {!loading ? (
                            stocks.length === 0 ? (
                                <h3 style={{ marginTop: '100px' }}>No stocks</h3>
                            ) : (
                                <>
                                    <VictoryChart
                                        domainPadding={10}
                                        theme={VictoryTheme.material}>
                                        <VictoryBar
                                            style={{ data: { fill: "#c43a31" } }}
                                            data={chart2}
                                        />
                                    </VictoryChart>
                                    <p style={{ textAlign: 'center' }}><b>Profit / Loss chart</b></p>
                                </>
                            )
                        ) : (<Spinner animation="border" size='md' style={{ display: 'block', margin: '20px' }} />)}
                    </div>
                </div>

                {/* Modal */}
                <Modal show={open} onHide={() => setOpen(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {regular_market_price ? (
                            <p className='text-success'>
                                <span className='text-dark m-1'>Stock Price: </span>
                                {regular_market_price}
                            </p>
                        ) : (<p>
                            Select a Stock Symbol
                        </p>
                        )}
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
                        <Form.Group className="mt-3 mb-3" controlId="formMOI">
                            <Form.Label>Money to invest</Form.Label>
                            <Form.Control type="number" placeholder="Money to invest" value={money_to_invest}
                                onChange={(e) => {
                                    setMoneyToInvest(e.target.value)
                                }} />
                            <Form.Text className="text-muted">
                                Amount is in $
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={() => addStock(true)}>Submit</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button style={{ display: 'block', margin: '20px 0 20px auto' }} onClick={() => setOpen(true)}>Add Stock</Button>

                {!loading ? (
                    <StockTable stocks={stocks} />
                ) : (
                    <Spinner animation="border" size='md' style={{ display: 'block', margin: '20px' }} />
                )}
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
