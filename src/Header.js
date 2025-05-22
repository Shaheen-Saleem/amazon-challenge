import React from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { Drawer } from "@mui/material";
import Checkout from "./Checkout";
import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";

function Header(){
    const [{ basket, user, drawer }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    return(
        <div className="header">
            <Link to="/">
            <img className="header_logo" src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
            </Link>
            

            <div className="header_search">
                <input className="header_searchInput" type="text"/>
                <SearchIcon className="header_searchIcon"></SearchIcon>
            </div>

            <div className="header_nav">
                <Link to={!user && '/login'}>
                    <div onClick={handleAuthentication} className="header_option">
                        <span className="header_optionLineOne">
                            {user ? user.email: "Hello Guest"}</span>
                        <span className="header_optionLineTwo">
                            {user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>

                <Link to='/orders'>
                    <div className="header_option">
                        <span className="header_optionLineTwo">
                           Orders
                        </span>
                    </div>
                </Link>

                <Link to="/checkout">
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon/>
                        <span className="header_basketCount header_optionLineTwo" 
                         style={{ marginLeft: "5px" }}
                    >{basket?.length}
                    </span>
                    </div>
                </Link>
                <Drawer open={drawer} style={{ width: "50%" }}>
                    <Checkout/>
                </Drawer>
            </div>
        </div>
    );
}

export default Header;