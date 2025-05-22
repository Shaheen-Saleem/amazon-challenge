import React from "react";
import './CheckoutProduct.css';
import { useState, useStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CheckoutProduct({ id, image, title, price, rating, hideButton }){
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        //remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
        toast("Item removed from basket!");
    };

    return(
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" src={image} alt=""/>

            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct_rating">
                    {Array(rating).fill().map((rate) => (
                        <p>🌟</p>
                    ))}
                </p>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from Basket</button>
                )}
            </div>
        </div>
    )
}

export default CheckoutProduct;
export function dispatch(){
    
}