import React from "react";
import './Product.css';
import { useStateValue } from "./StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product({id, title, image, price, rating}){
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = () => {
        //dispatch the item into the data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
        toast("Added item to basket!");
    };
    return (
    <div className="product">
        <div className="product_bestseller">BESTSELLER</div>
        <div className="product_info">
            <p>{title}</p>
            <div className="product_price">
                <small>$</small>
                <strong>{price}</strong>
            </div>
            <div className="product_rating">
            {Array(rating)
            .fill()
            .map((rate) => (
              <p>🌟</p>
            ))}
            </div>
            </div>
        <img src={image} alt=""/>

        <button onClick={addToBasket}>Add to Basket</button>
    </div>
    );
}

export default Product;