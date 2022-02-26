import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';



const Dashboard = ({
    username, first_name,
    last_name, profile_pic
}) => {

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="dashboard of servey app"
                />
                <title>StockWebApp | Dashboard</title>
            </Helmet>
            <div className='container mt-5'>
                <h1>Dashboard</h1>
                <span className="badge rounded-pill bg-success">
                    <span className='text-light'>
                        {username.toUpperCase()}
                    </span>
                </span>
                <img src={profile_pic} alt="" width='50px' height='50px' className='rounded-circle' />
            </div>
        </div>
    );
}


const mapStateToProps = (state) => ({
    username: state.profile.username,
    first_name: state.profile.first_name,
    last_name: state.profile.last_name,
    profile_pic: state.profile.profile_pic
})
export default connect(mapStateToProps, {})(Dashboard);