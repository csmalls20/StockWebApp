import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../actions/auth';


const Login = ({ login, isAuthenticated }) => {

    const [formData, setformData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    if (isAuthenticated)
        return <Navigate replace to='/' />;

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="login page of servey app"
                />
                <title>StockWebApp | Login</title>
            </Helmet>
            <div className='container mt-5'>
                <h1>Login</h1>
                <p>Login to your Account</p>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username*"
                            name="username"
                            value={username}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password*"
                            name="password"
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                </form>
                <p className="mt-3">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);