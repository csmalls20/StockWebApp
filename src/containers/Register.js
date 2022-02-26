import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../actions/auth';
import { connect } from "react-redux";



const Register = ({ register, isAuthenticated }) => {
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setformData] = useState({
        username: '',
        password: '',
        re_password: ''
    });

    const { username, password, re_password } = formData;

    const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        if (password === re_password) {
            register(username, password, re_password);
            setAccountCreated(true);
        } else {
            console.log('Password Wrong');
        }
    };

    if (isAuthenticated)
        return <Navigate replace to='/' />;
    else if (accountCreated)
        return <Navigate replace to='/login' />;


    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="register page of servey app"
                />
                <title>StockWebApp | Register</title>
            </Helmet>
            <div className='container mt-5'>
                <h1>Register</h1>
                <p>Create your Account</p>
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
                    <div className="form-group">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Confirm Password*"
                            name="re_password"
                            value={re_password}
                            onChange={(e) => onChange(e)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Register
                    </button>
                </form>
                <p className="mt-3">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);