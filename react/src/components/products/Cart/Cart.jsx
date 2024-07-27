import {  useState } from "react";
// import { json, useNavigate } from "react-router-dom";
// import { truncateText } from "../../../../utils/truncate";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
// import { addToCartAction } from "../../../../redux/slices/Order";
import logo from "./images.jpeg"


import { Bounce, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { ADD_PROD_TO_CART } from "../../../../redux/user/userAction";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
    const navigate = useNavigate();
    const {id,name,price,brand_name}=props.info;
    const imgs=JSON.parse(props.info.images_url)
    const currentUserId=useSelector(state=>state.users.currentUserId)
    const dispatch = useDispatch();
   
    const nagivateToDetails = (e) => {
        // if(e.target.class)
        // navigate("/product/" + props.info.id);
       
        e.target.classList.contains("cartBtn")? null : navigate("/product/" + props.info.id);
    };

    const addToCart = () => {
        if(currentUserId == null){
            toast.error("Login First!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
                });
            return null;
        }
        
        const item = {
            id: id,
            name: name,
            price: price,
            quantity: 1,
            images_url:Array.isArray(imgs)  ? imgs[0] : imgs
        };
           
        dispatch(ADD_PROD_TO_CART(currentUserId,id,item));
       
    };
    const style={
        color:"#efefef52"
    }
    return (
        <div className="cart"
         onClick={nagivateToDetails}
         >
            
            <div>
                <img src={Array.isArray(imgs)  ? imgs[0] : imgs} alt={logo} />
            </div>

            <div className="porductdetails">
                <p className="cartDescription">{name}</p>
                <p style={style}>{brand_name}</p>
                <p>{price}$</p>
                
                    <button
                        onClick={(e) => {
                            addToCart();
                        }}
                        className="cartBtn"
                    >
                        Add To Cart
                    </button>
                
            </div>
        </div>
    );
};
export default Cart;
