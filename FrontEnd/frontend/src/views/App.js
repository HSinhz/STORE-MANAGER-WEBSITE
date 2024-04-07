import './App.scss';
// import Nav from '../components/Navigation/Nav';
import Nav from '../components/Navigation/Nav.js';
import Login from '../components/Login/Login.js'
import Home from '../components/Home/Home';
import Register from '../components/Register/Register.js';
import Employee from '../components/Manager/Employee/Employee.js';
import Product from '../components/Manager/Product/Product.js';
import Order from '../components/Order/Order.js';
import ShowOrder from '../components/Order/ShowOrder.js';
import CreateOrder from '../components/Order/CreateOrder/CreateOrder.js';
import DetailEmplyee from '../components/Manager/Employee/DetailEmployee.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from 'react-toastify';
import _ from 'lodash';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
function App() { 
  const [account, setAccount] = useState({});

  useState( () => {
    let session = sessionStorage.getItem("account");
    if(session){
      setAccount(JSON.parse(session));

    }
  }, []) // [] chỉ chạy một lần
  return (
    <Router>
      <div className="App">
        { 
          account && !_.isEmpty(account) && account.isAuthenticated
          && <Nav/>
        }
        <Switch>
          <Route path="/mgr/employee/:employeeId">
            <DetailEmplyee/>
          </Route>
          <Route path="/mgr/order/show">
            <ShowOrder/>
          </Route>
          <Route path="/mgr/order/create">
            <CreateOrder/>
          </Route>
          <Route path="/new">
            <h1>New 123213123123</h1>
          </Route>
          
          <Route path="/mgr/product">
            <Product/>
          </Route>
          <Route path="/mgr/employee">
            <Employee/>
          </Route>
          
          <Route path="/mgr/order">
            <Order/>
          </Route>
          
          <Route path="/about">
            User
          </Route>
          <Route path="/contact">
            <Home/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
          <Route path="*">
            404 Not Found
          </Route>
          
        </Switch>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
