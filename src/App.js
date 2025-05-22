import './App.css';
import React from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { useEffect } from 'react';
import { auth } from './firebase';
import Login from './Login';
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ToastContainer } from "react-toastify";
import Orders from './Orders';
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const promise = loadStripe(
  "pk_test_51HPvTBIOljmntfcQC1n0EJpWiklLHfLLbvIRmbtahMdllY6NNLF5vu7hw9O5PYBaTZdmf3ppAtWbhTbCzPZnx0o500tCU9bjNq"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("[USER] ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
      //BEM
      <Router>
        <div className="app">
          <Routes>
          <Route path='/checkout' element={
            <>
            <Header/>
            <Checkout/>
            </>
          }
          />

          <Route path="/login" element={
            <>
            <Login/>
            </>
          }
          />
          
          <Route path='/orders' element={
            <>
            <Header/>
            <Orders/>
            </>
          }
          />

          <Route path='/payment' element={
            <>
            <Header/>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            </>
          }
          />

          <Route path='/' element={
              <>
              <Header/>
              <Home/>
              </>
            }
              />
          </Routes>
      </div>
      <ToastContainer style={{ marginTop: "45px" }} />
      </Router>
   
  );
}

export default App;
