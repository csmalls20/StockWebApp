import './App.css';

import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import Layout from './hoc/Layout';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './hoc/PrivateRoute';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}
export default App;
