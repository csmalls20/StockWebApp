import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { check_authenticated } from '../actions/auth';
import { user_profile } from '../actions/profile';
import Navbar from '../components/Navbar';


const Layout = ({
    children,
    user_profile,
    check_authenticated
}) => {
    useEffect(() => {
        user_profile();
        check_authenticated();
    }, [])

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}

export default connect(null, {
    user_profile,
    check_authenticated,
})(Layout);