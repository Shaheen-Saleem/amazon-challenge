import React, { useEffect, useState } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {
  const history = useNavigate();
  const [{ user, basket }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try{
        //Stripe expects the total in a currencies subunits
        const response = await axios.post(`/payments/create?total=${getBasketTotal(basket) * 100}`);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      }
    };

    getClientSecret();
  }, [basket]);

  console.log("[CLIENTSECRET]", clientSecret);

  const onBuy = (e) => {
    toast("Order placed successfully!");
    history("/orders");
  }
  const handleSubmit = async (e) => {
    // do all the fancy stripe stuff...
    e.preventDefault();
    setProcessing(true);

    if (!clientSecret){
      setError('Client secret not set. Please try again.');
      setProcessing(false);
      return;
    }
    try{
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if(payload.error){
        setError('Payment failed: ${payload.error.message}');
        setProcessing(false);
        return;
      }
  
      const { paymentIntent } = payload;
      
          await db.collection("users").doc(user?.uid).collection("orders").doc(paymentIntent.id).set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
  
          setSucceeded(true);
          setError(null);
          setProcessing(false);
  
          dispatch({
            type: "EMPTY_BASKET",
          });
  
          history("/orders", { replace: true });
        } catch(error){
          setError(`Payment processing error: ${error.message}`);
          setProcessing(false);
        };
  };

  const handleChange = (e) => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React</p>
            <p>Nagpur</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Methods</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic goes here */}
            <form onSubmit={handleSubmit}>
              <h4>Cash on Delivery</h4>
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType="text"
                  thousandSeperator={true}
                  prefix="$"
                />
                <button onClick={onBuy}>Buy Now!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;