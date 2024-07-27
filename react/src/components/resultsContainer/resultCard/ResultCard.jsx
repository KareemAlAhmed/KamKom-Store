import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { ADD_PROD_TO_CART } from '../../../../redux/user/userAction';
import { ADD_PROD_TO_WISHLIST, ADD_PROD_TO_WISHLIST_FAILED, REMOVE_PROD_FROM_WISHLIST, removeCurrentProd } from '../../../../redux/product/productAction';

export default function ResultCard({item,type}) {
    const imgs=JSON.parse(item.images_url);
    const alterImg=Array.isArray(imgs) ? imgs[0] : imgs;
    const currentUserId=useSelector(state=>state.users.currentUserId)
    const dispatch = useDispatch();
    const navigate=useNavigate();
    let wishlist=JSON.parse(sessionStorage.getItem("user-wishlist"))

    let wishlistIds=JSON.parse(sessionStorage.getItem("wishProdsId"))
    const nagivateToDetails = (e) => {

        e.target.classList.contains("cartBtn") || e.target.classList.contains("love")? null : 
        (dispatch(removeCurrentProd()),
        sessionStorage.getItem("current-viewed-prod") != null ? sessionStorage.removeItem("current-viewed-prod") : null,
        sessionStorage.getItem("related-prods-to-current-prod") != null ? sessionStorage.removeItem("related-prods-to-current-prod") : null,
        navigate("/product/" + item.id));
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
      
      const item2 = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          images_url:Array.isArray(imgs)  ? imgs[0] : imgs
      };
         
      dispatch(ADD_PROD_TO_CART(currentUserId,item.id,item2));
     
  };
  const addToWishList=(e,prod)=>{
    if(currentUserId != null ){
        e.stopPropagation();
        const isAlreadyAdded = wishlist.some(obj => obj.id === prod.id);
        if(!isAlreadyAdded){
          if(e.target.classList.contains("addToWish")){
            e.target.classList.toggle("loved")
            dispatch(ADD_PROD_TO_WISHLIST(currentUserId,prod.id))
          }else{
            e.target.parentElement.classList.toggle("loved")
            dispatch(ADD_PROD_TO_WISHLIST(currentUserId,prod.id))
          }
          let product={
              id:prod.id,
              images_url:prod.images_url,
              name:prod.name,
              price:prod.price,
              thumnail:prod.thumbnail_url
          }
          wishlist.push(product)
          wishlistIds.push(prod.id)
          sessionStorage.setItem("user-wishlist",JSON.stringify(wishlist))
          sessionStorage.setItem("wishProdsId",JSON.stringify(wishlistIds))
        }else{
            wishlist.forEach((element,index) => {
              if(element.id == prod.id){
                  wishlist.splice(index, 1);
              }
          });
          wishlistIds.forEach((element,index) => {
              if(element == prod.id){
                  wishlistIds.splice(index, 1);
              }
          });
          if(e.target.classList.contains("addToWish")){
            e.target.classList.remove("loved")
          }else{
            e.target.parentElement.classList.remove("loved")
          }
          sessionStorage.setItem("user-wishlist",JSON.stringify(wishlist))
          sessionStorage.setItem("wishProdsId",JSON.stringify(wishlistIds))
          dispatch(REMOVE_PROD_FROM_WISHLIST(currentUserId,prod.id))
        }
      
    }else{
      dispatch(ADD_PROD_TO_WISHLIST_FAILED())
    }
  }
  let inWishlist=false
  useEffect(()=>{
    if(wishlist != null){
      // console.log(wishlistIds.includes(item.id))
      inWishlist=wishlistIds.includes(item.id)
      let loved=document.querySelectorAll(".prod-"+item.id+" .love")
      if(inWishlist){
        loved.forEach(e=>e.classList.add("loved"))
      }
    }
  },[wishlist,inWishlist])
  return (
    <div className={"card prod-"+item.id} onClick={nagivateToDetails}>
          <div className="img-wrapper">
            <img src={alterImg} alt={alterImg} />
          </div>

          <span className="rate">
            <i className="bi bi-star-fill"></i>
            <p>{parseFloat(item.rating)}</p>
          </span>

          <div className="card-info">
            <div className="flex justify-between">
              <p className="title">
                {item.name.length > 52 ? item.name.slice(0,52) +"..." : item.name}
              </p>
              <p>${item.price} </p>
            </div>

            <div className="flex justify-end gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill addToWish love" viewBox="0 0 16 16" onClick={e=>addToWishList(e,item)}>
              <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" className='love' onClick={e=>addToWishList(e,item)} />
            </svg>
            {type == "purchased" ? ( <button
                       
                        className="cartBtn purchased"
                    >
                        X {item.quantity}
            </button>) : (
              <button
                        onClick={(e) => {
                            addToCart();
                        }}
                        className="cartBtn"
                    >
                        Add To Cart
            </button>
            )}
            
            </div>
          </div>

        </div>
  )
}
