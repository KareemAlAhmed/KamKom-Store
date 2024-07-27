import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_WISHLIST, REMOVE_PROD_FROM_WISHLIST } from '../../../redux/product/productAction';
import "./WishList.css"
export default function WishListPage() {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const currentUserId=useSelector(state=>state.users.currentUserId)
    const [user,setUser] = useState(JSON.parse(sessionStorage.getItem("user-auth")));
    let isListEmpty=true
    const [toClear,setToClear]=useState(false)
    let [itemDeleted,setItemdeleted]=useState(false);
    
    let wishlist=JSON.parse(sessionStorage.getItem("user-wishlist"))
    let wishlistIds=JSON.parse(sessionStorage.getItem("wishProdsId"))
    const deleteItemFromList=(id)=>{
        wishlist.forEach((element,index) => {
            if(element.id == id){
                wishlist.splice(index, 1);
            }
        });
        wishlistIds.forEach((element,index) => {
            if(element == id){
                wishlistIds.splice(index, 1);
            }
        });
        setItemdeleted(!itemDeleted)
        sessionStorage.setItem("user-wishlist",JSON.stringify(wishlist))
        sessionStorage.setItem("wishProdsId",JSON.stringify(wishlistIds))
        dispatch(REMOVE_PROD_FROM_WISHLIST(currentUserId,id))
    }
    const clearWishList=()=>{
        wishlist=[]
        wishlistIds=[]
        sessionStorage.setItem("user-wishlist",JSON.stringify([]))
        sessionStorage.setItem("wishProdsId",JSON.stringify([]))
        dispatch(CLEAR_WISHLIST(currentUserId))
        isListEmpty=true
        setToClear(!toClear)
    }

    useEffect(()=>{
        if(currentUserId == null){
            navigate("/auth")
        }
        wishlist.length > 0 ?  isListEmpty = true : false;
    },[isListEmpty])
    return (
    <>
            <Navbar />

                <div className="shoppingCart">
                    {wishlist?.length == 0 ? (
                        <div className="emptyCart">
                            <span>Your List is Empty !! </span>
                            <Link to="/"> To Shop</Link>
                        </div>
                    ) : (
                        <>
                            <h1>My WishList</h1>
                            <hr  className="breakLine"/>

                            <div className="cartItems">
                                {wishlist?.map((item, index) => (
                                    <div key={index} className="cartItem">
                                        
                                        <span
                                            className="deleteItem"
                                            onClick={() => {
                                                deleteItemFromList(item.id);
                                            }}
                                        >
                                            X
                                        </span>
                                        <div className="itemImg">
                                            <img
                                                src={item.thumnail}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="itemDetails">
                                            <p>{item?.name}</p>
                                        </div>
                                        <div>Price : {item?.price}$</div>

                                        
                                    </div>
                                ))}
                                
                            </div>
                            <div className="clearsection">

                                    <div>
                                       
                                            <button onClick={clearWishList}>
                                                Clear
                                            </button>
                                       
                                    </div>
                                </div>
                        </>
                    )}
                </div>
                    <ToastContainer />
            <Footer />
        </>
  )
}
