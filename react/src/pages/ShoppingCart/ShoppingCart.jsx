import "./ShoppingCart.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ADD_PROD_TO_CART, PURCHASE_CART, purchaseFinished, REMOVE_PROD_TO_CART } from "../../../redux/user/userAction";
import { ToastContainer } from "react-toastify";
// import {
//     addOrderAction,
//     addToCartAction,
//     deleteFromCartAction,
// } from "../../../redux/slices/Order";
const ShoppingCart = () => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [showToast, setShowToast] = useState(false);
    let isCartEmpty =false;
    const currentUserId=useSelector(state=>state.users.currentUserId)
    const purchaseSuccessed=useSelector(state=>state.users.purchaseSuccessed)
    const dispatch = useDispatch();

    const getTotal = (itemsList) => {
        setTotal(0);
        itemsList?.map((item) => {
            setTotal((prev) => (prev += item.quantity * item.price));
        });
    };
    useEffect(() => {
        setItems(JSON.parse(sessionStorage.getItem("user-cart")));
        getTotal(JSON.parse(sessionStorage.getItem("user-cart")));
        console.log(document.querySelector("body").offsetWidth)
    }, []);
    const isMobileVersion=()=>{
        let body=document.querySelector("body")
        return body.offsetWidth < 480;
    }
    const incQty = (item) => {
        dispatch(ADD_PROD_TO_CART(currentUserId,item.id,item));

        items?.map((item, index) => {
            if (item?.id === item.id) {
                items[index].quantity++;
                sessionStorage.setItem("user-cart", JSON.stringify(items));
                setItems(JSON.parse(sessionStorage.getItem("user-cart")));
            }
        });
        getTotal(items);
    };
    const decQty = (id) => {
        dispatch(REMOVE_PROD_TO_CART(currentUserId,id));
        items?.map((item, index) => {
            if (item?.id === id) {
                if (item.quantity == 1) items.splice(index, 1);
                else items[index].quantity--;
                sessionStorage.setItem("user-cart", JSON.stringify(items));
                setItems(JSON.parse(sessionStorage.getItem("user-cart")));
            }
        });
        getTotal(items);
        if (JSON.parse(sessionStorage.getItem("user-cart"))?.length == 0) {
            isCartEmpty=true;
        }
    };

    const deleteItem = (id) => {
        items?.map((item, index) => {
            if (item?.id === id) {
                items.splice(index, 1);
                sessionStorage.setItem("user-cart", JSON.stringify(items));
                setItems(JSON.parse(sessionStorage.getItem("user-cart")));
            }
        });
        getTotal(items);
        if (JSON.parse(sessionStorage.getItem("user-cart"))?.length == 0) {
            isCartEmpty=true;
        }
    };

    const makeOrder = () => {
        document.querySelector(".checkoutsection button").innerHTML="Purchasing..."
        document.querySelector(".checkoutsection button").classList.toggle("purchasing")
        const isUserLogin = JSON.parse(sessionStorage.getItem("user-auth"));
        if (!isUserLogin) {
            return <Navigate to="auth" />;
        } else {
            dispatch(PURCHASE_CART(isUserLogin[0]?.id,total));
        }
    };

    if (items != null){
        if(items.length == 0){
            isCartEmpty=true;
        }
    }else{
        isCartEmpty=true;
        setItems([])
      
    }

    if(purchaseSuccessed){

        dispatch(purchaseFinished())
        document.querySelector(".checkoutsection button").classList.toggle("purchasing")
         document.querySelector(".checkoutsection button").innerHTML="Purchased"
        setItems([])
    }
    return (
        <>
            <Navbar />

                <div className="shoppingCart">
                    {isCartEmpty ? (
                        <div className="emptyCart">
                            <span>Your Cart Is Empty !!</span>
                            <Link to="/">To Shop</Link>
                        </div>
                    ) : (
                        <>
                            <h1>My Shopping Cart</h1>
                            <hr  className="breakLine"/>

                            <div className="cartItems">
                                {items?.map((item, index) => (
                                    <div key={index} className="cartItem">
                                        
                                        <span
                                            className="deleteItem"
                                            onClick={() => {
                                                deleteItem(item?.id);
                                            }}
                                        >
                                            X
                                        </span>
                                        <div className="itemImg">
                                            <img
                                                src={item.images_url}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="itemDetails">
                                            <p>{isMobileVersion ? item?.name.length > 78 ?  item?.name.slice(0,78)+"..." : item?.name : item?.name}</p>
                                        </div>
                                        <div>Price : {item?.price}$</div>
                                        <div className="itemQty">
                                            <button
                                                onClick={() => incQty(item)}
                                            >
                                                +
                                            </button>
                                            <span>{item?.quantity}</span>
                                            <button
                                                onClick={() => decQty(item?.id)}
                                            >
                                                -
                                            </button>
                                        </div>
                                        <div>
                                            <p>
                                                Total Price:{" "}
                                                {item?.price * item?.quantity}$
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="checkoutsection">
                                    <div>
                                        {" "}
                                        <p>Total: {total}$</p>
                                    </div>
                                    <div>
                                        {showToast ? (
                                            <div className="Toast">
                                                Please Login First
                                            </div>
                                        ) : (
                                            <button onClick={() => makeOrder()}>
                                                Checkout
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                    <ToastContainer />
            <Footer />
        </>
    );
};
export default ShoppingCart;
