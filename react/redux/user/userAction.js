// import { json } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { ADDING_PRODUCT_TO_CART, ADDING_PRODUCT_TO_CART_FAILED, ADDING_PRODUCT_TO_CART_SUCCESSED, DELETE_USER, DELETE_USER_FAILED, DELETE_USER_SUCCESSED, FETCH_USER_INFO, FETCH_USER_INFO_FAILED, FETCH_USER_INFO_SUCCESSED, FOLLOW_USER, FOLLOW_USER_FAILED, FOLLOW_USER_SUCCESSED, GET_ALL_PURCHASES, GET_ALL_PURCHASES_FAILED, GET_ALL_PURCHASES_SUCCESSED, GET_ALL_USERS, GET_ALL_USERS_FAILED, GET_ALL_USERS_SUCCESSED, GET_USER, LOGIN_USER, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, LOGOUT_USER, PURCHASE_CART_FAILED, PURCHASE_CART_SUCCESSED, PURCHASING_CART, REGISTERING_USER, REGISTERING_USER_FAILED, REGISTERING_USER_SUCCESS, UNFOLLOW_USER, UNFOLLOW_USER_FAILED, UNFOLLOW_USER_SUCCESSED } from "./actionsType";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { getProducts } from "../product/productAction";

export function get_user(){
    return{
        type:GET_USER
    }
}
export function registeringUser(){
    return{
        type:REGISTERING_USER
    }
}
export function registeringUserSuccuessed(user){

    sessionStorage.setItem("user-auth",JSON.stringify(user.user))
    sessionStorage.setItem("user-wishlist",JSON.stringify([]))
    sessionStorage.setItem("wishProdsId",JSON.stringify([]))
    sessionStorage.setItem("user-cart",JSON.stringify([]))

    return{
        type:REGISTERING_USER_SUCCESS,
        payload:{user:user.user,cart:[],}
    }
}
export function registeringUserFailed(error){
    return{
        type:REGISTERING_USER_FAILED,
        payload:error
    }
}
export function loginUser(){
    return{
        type:LOGIN_USER
    }
}
export function loginUserSuccuessed(user){
    let cart=[];
    let oldCart=user.cart[1]
    for(let i =0;i<oldCart.length;i++){
        let item={
            id:parseInt(oldCart[i][0]),
            name:oldCart[i][1],
            price:oldCart[i][2],
            quantity:oldCart[i][3],
            images_url:oldCart[i][4],
        }
        cart.push(item)
    }

    let wishProdId=[]
    let list=JSON.parse(user.wishlist.productIds)
    list.map(ele=>wishProdId.push(ele.id))
    sessionStorage.setItem("wishProdsId",JSON.stringify(wishProdId))

    sessionStorage.setItem("user-cart",JSON.stringify(cart))
    return{
        type:LOGIN_USER_SUCCESS,
        payload:{user:user.user,cart:cart}
    }
}

export function loginUserFailed(error){
    return{
        type:LOGIN_USER_FAILED,
        payload:error
    }
}
export function logoutUser(){
    return{
        type:LOGOUT_USER,
    }
}

function addingProductToCart(){
    return {
        type:ADDING_PRODUCT_TO_CART,
    }
}
function addingProductToCartSuccess(cart,item,wantedQut){
    let prodInCart=false;
    let prods = JSON.parse(sessionStorage.getItem("user-cart"));
    if(prods == null){
        prods=[]          
    }else{
        for(let i =0;i<prods.length;i++){
            if(prods[i].id == item.id){
                prods[i].quantity +=wantedQut;
                prodInCart=true;
            }
        }
    }
    prodInCart ? null : prods.push(item);
    sessionStorage.setItem("user-cart", JSON.stringify(prods));
    toast.success("The Item Added To The Cart", {
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
    return {
        type:ADDING_PRODUCT_TO_CART_SUCCESSED,
        payload:cart
    }
}
function addingProductToCartFailed(cart){
    toast.error("You Cant Buy Your Product", {
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
    return {
        type:ADDING_PRODUCT_TO_CART_FAILED,
        payload:cart
    }
}

function purchasingCart(){
    return{
        type:PURCHASING_CART
    }
}
function purchasingCartSuccessed(cost){

    let user=JSON.parse(sessionStorage.getItem("user-auth"));
    user[0].balance -=cost;
    sessionStorage.setItem("user-auth",JSON.stringify(user));
    sessionStorage.setItem("user-cart",JSON.stringify([]));

    return{
        type:PURCHASE_CART_SUCCESSED
    }
}
function purchasingCartFailed(error){
    return{
        type:PURCHASE_CART_FAILED,
        payload:error
    }
}
export function purchaseFinished(){
    toast.success("Purchase Completed", {
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
    return{
        type:"purchaseFinished",
    }
}

function getUserInfo(){
    return{
        type:FETCH_USER_INFO
    }
}
function getUserInfoSuccessed(info){

    return{
        type:FETCH_USER_INFO_SUCCESSED,
        payload:info
    }
}
function getUserInfoFailed(error){
    return{
        type:FETCH_USER_INFO_FAILED,
        payload:error
    }
}
function followUser(){
    return{
        type:FOLLOW_USER
    }
}
function followUserSuccessed(followedUser){
    let user=JSON.parse(sessionStorage.getItem("user-auth"))
    user[0].followedUsers.push(followedUser)
    sessionStorage.setItem("user-auth",JSON.stringify(user))
    let currentViewedUser=JSON.parse(sessionStorage.getItem("current-viewed-user"))
    currentViewedUser.isFollowed=true
    sessionStorage.setItem("current-viewed-user",JSON.stringify(currentViewedUser))
    return{
        type:FOLLOW_USER_SUCCESSED,
        payload:user
    }
}
function followUserFailed(){
    return{
        type:FOLLOW_USER_FAILED,
    }
}
function unfollowUser(){
    return{
        type:UNFOLLOW_USER
    }
}
function unfollowUserSuccessed(followedUser){
    let user=JSON.parse(sessionStorage.getItem("user-auth"))
    user[0].followedUsers=user[0].followedUsers.filter(ele=>ele.id != followedUser.id);
    sessionStorage.setItem("user-auth",JSON.stringify(user))

    let currentViewedUser=JSON.parse(sessionStorage.getItem("current-viewed-user"))
    currentViewedUser.isFollowed=false
    sessionStorage.setItem("current-viewed-user",JSON.stringify(currentViewedUser))
    return{
        type:UNFOLLOW_USER_SUCCESSED,
        payload:user
    }
}
function unfollowUserFailed(){
    return{
        type:UNFOLLOW_USER_FAILED,
    }
}
function getAllPurchases(){
    return{
        type:GET_ALL_PURCHASES
    }
}
function getAllPurchasesSuccessed(info){
    sessionStorage.setItem("all-purchases",JSON.stringify(info))
    return{
        type:GET_ALL_PURCHASES_SUCCESSED,
        payload:info
    }
}
function getAllPurchasesFailed(error){
    return{
        type:GET_ALL_PURCHASES_FAILED,
        payload:error
    }
}
function getAllUsers(){
    return{
        type:GET_ALL_USERS
    }
}
function getAllUsersSuccessed(info){
    sessionStorage.setItem("all-users",JSON.stringify(info))
    return{
        type:GET_ALL_USERS_SUCCESSED,
        payload:info
    }
}
function getAllUsersFailed(error){
    return{
        type:GET_ALL_USERS_FAILED,
        payload:error
    }
}
function deleteUser(){
    return{
        type:DELETE_USER
    }
}
function deleteUserSuccessed(id){
    let users=[]
    let newUser=[]
    if(sessionStorage.getItem("all-users") != null){
        users=JSON.parse(sessionStorage.getItem("all-users"))
        newUser=users.filter(ele=>ele.id != id)
        sessionStorage.setItem("all-users",JSON.stringify(newUser))
    }

    let purchases=[]
    let newPurchases=[]
    if(sessionStorage.getItem("all-purchases") != null){
        purchases=JSON.parse(sessionStorage.getItem("all-purchases"))
        newPurchases=purchases.filter(ele=>ele.buyer_id != id)
        sessionStorage.setItem("all-purchases",JSON.stringify(newPurchases))
    }
    let allProds=[]
    let newAllProds=[]
    if(sessionStorage.getItem("allProds") != null){
        allProds=JSON.parse(sessionStorage.getItem("allProds"))
        newAllProds=allProds.filter(ele=>ele.user_id != id)
        sessionStorage.setItem("allProds",JSON.stringify(newAllProds))
    }






    toast.success("The User Deleted Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        })
    return{
        type:DELETE_USER_SUCCESSED,
        payload:newUser
    }
}
function deleteUserFailed(error){
    return{
        type:DELETE_USER_FAILED,
        payload:error
    }
}
export function registerUSer(data){
    return function(dispatch){
        dispatch(registeringUser());
        axios.post("http://127.0.0.1:8000/api/register",data)
        .then(re=>
          {  console.log(re),
            dispatch(registeringUserSuccuessed(re.data))

        }

    )
        .catch(err=>{console.log(err),dispatch(registeringUserFailed(err.response.data.error.email[0]))})
    }
}

export function LoginUser(data){
    return function(dispatch){
        dispatch(loginUser());
        axios.post("http://127.0.0.1:8000/api/login",data)
        .then(re=>{dispatch(loginUserSuccuessed(re.data)),
        sessionStorage.setItem("user-auth",JSON.stringify(re.data.user)),
        sessionStorage.setItem("user-wishlist",re.data.wishlist.productIds)}
        )
        .catch(err=>{console.log(err),dispatch(loginUserFailed(err.response.data.error))})
    }
}

export function ADD_PROD_TO_CART(userId,prodId,item,quantity = 1){
    let wantedQut=quantity == 1 ? 1 : quantity;
    return function(dispatch){
        dispatch(addingProductToCart())
        axios.post("http://127.0.0.1:8000/api/cart/add/"+prodId+"/to/"+userId,{quantity:wantedQut} )
        .then(re=>{
            dispatch(addingProductToCartSuccess(re.data,item,wantedQut),console.log(re),
            
        )})
        .catch(err=>{
            dispatch(addingProductToCartFailed(err.response.data.error),console.log(err))
        })
    }
}
export function REMOVE_PROD_TO_CART(userId,prodId){
    console.log(userId)
    return function(dispatch){
        dispatch(addingProductToCart())
        axios.delete("http://127.0.0.1:8000/api/cart/remove/"+prodId+"/from/"+userId)
        .then(re=>{
            console.log(re.data)
            
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
export function PURCHASE_CART(userId,cost){
    return function(dispatch){
        dispatch(purchasingCart())
        axios.post("http://127.0.0.1:8000/api/purchase/"+userId+"/to/"+userId)
        .then(()=>{
            dispatch(purchasingCartSuccessed(cost))
            return true;
        })
        .catch(err=>{
            dispatch(purchasingCartFailed(err.response.data.error)),
            console.log(err)
        })
    }
}
export function GET_USER_INFO(userId,currentUserId=null){
    return function(dispatch){
        dispatch(getUserInfo())
        axios.post("http://127.0.0.1:8000/api/user/"+userId,{currentUserId})
        .then(re=>{
            console.log(re.data)
            dispatch(getUserInfoSuccessed(re.data.user))
            sessionStorage.setItem("current-viewed-user",JSON.stringify(re.data.user))
        })
        .catch(err=>{
            dispatch(getUserInfoFailed(err.response.data.error))
        })
    }
}
export function FOLLOW_USER_REQ(followerId,followedUser){
    return function(dispatch){
        dispatch(followUser())
        axios.post("http://127.0.0.1:8000/api/user/"+followerId+"/follow/user/"+followedUser.id)
        .then(()=>{
            dispatch(followUserSuccessed(followedUser))
        })
        .catch(err=>{
            console.log(err)
            dispatch(followUserFailed(err.response.data.error))
        })
    }
}
export function UNFOLLOW_USER_REQ(followerId,followedUser){
    return function(dispatch){
        dispatch(unfollowUser())
        axios.delete("http://127.0.0.1:8000/api/user/"+followerId+"/unfollow/user/"+followedUser.id)
        .then(()=>{
            dispatch(unfollowUserSuccessed(followedUser))
        })
        .catch(err=>{
            console.log(err)
            dispatch(unfollowUserFailed(err.response.data.error))
        })
    }
}
export function GET_ALL_ORDERS(){
    return function(dispatch){
        dispatch(getAllPurchases())
        axios.get("http://127.0.0.1:8000/api/purchases")
        .then((re)=>{
            dispatch(getAllPurchasesSuccessed(re.data.purchases))
        })
        .catch(err=>{
            console.log(err)
            dispatch(getAllPurchasesFailed(err.response.data.error))
        })
    }
}
export function GET_ALL_USERS_INFO(){
    return function(dispatch){
        dispatch(getAllUsers())
        axios.get("http://127.0.0.1:8000/api/users")
        .then((re)=>{
            dispatch(getAllUsersSuccessed(re.data.users))
        })
        .catch(err=>{
            console.log(err)
            dispatch(getAllUsersFailed(err.response.data.error))
        })
    }
}
export function DELETE_USR(id){
    return function(dispatch){
        dispatch(deleteUser())
        axios.delete("http://127.0.0.1:8000/api/user/"+id+"/delete")
        .then(()=>{
            dispatch(deleteUserSuccessed(id))
        })
        .catch(err=>{
            console.log(err)
            dispatch(deleteUserFailed(err.response.data.error))
        })
    }
}