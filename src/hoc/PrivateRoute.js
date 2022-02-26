import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(PrivateRoute);