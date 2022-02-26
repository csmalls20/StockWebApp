import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/auth';

const Navbar = ({ isAuthenticated, logout, profile_pic }) => {
    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>Login</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>Register</NavLink>
            </li>
        </Fragment>
    );

    const authLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
            </li>
            <li className='nav-item'>
                <a
                    className='nav-link'
                    onClick={logout}
                    href='#!'
                >
                    Logout
                </a>
            </li>
        </Fragment>
    );
    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>Stock Web App</a>
                    {isAuthenticated
                        ?
                        <a className="navbar-brand" href="/">
                            <img src={profile_pic} alt="" width="35" height="35" className='rounded-circle' />
                        </a>
                        :
                        null
                    }
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            {isAuthenticated ? authLinks : guestLinks}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    username: state.profile.username,
    profile_pic: state.profile.profile_pic
});

export default connect(mapStateToProps, { logout })(Navbar);