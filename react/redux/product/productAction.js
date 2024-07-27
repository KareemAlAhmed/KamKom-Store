import axios from "axios";
import {FETCH_FEATURED_PRODUCTS_FAILED, FETCH_FEATURED_PRODUCTS_SUCCEED, FETCH_PRODUCTS, FETCH_PRODUCTS_FAILED, FETCH_PRODUCTS_SUCCEED, GET_PRODUCT_INFO, GET_PRODUCT_INFO_FAILED, GET_PRODUCT_INFO_SUCCESSED, GET_RELATED_PRODUCT, GET_RELATED_PRODUCT_FAILED, GET_RELATED_PRODUCT_SUCCESSED, GET_CATEGORY_PRODUCTS, GET_CATEGORY_PRODUCTS_FAILED, GET_CATEGORY_PRODUCTS_SUCCESSED, REMOVE_CURRENT_PRODUCT, GET_LATEST_PRODUCTS, GET_LATEST_PRODUCTS_SUCCESSED, GET_LATEST_PRODUCTS_FAILED, GET_HOTDEALS_PRODUCTS, GET_HOTDEALS_PRODUCTS_SUCCESSED, GET_HOTDEALS_PRODUCTS_FAILED, ADD_REVIEW, ADD_REVIEW_SUCCESSED, ADD_REVIEW_FAILED, DELETE_REVIEW, DELETE_REVIEW_SUCCESSED, DELETE_REVIEW_FAILED, EDIT_REVIEW, EDIT_REVIEW_SUCCESSED, EDIT_REVIEW_FAILED, ADD_PRODUCT, ADD_PRODUCT_SUCCESSED, ADD_PRODUCT_FAILED, DELETE_PRODUCT, DELETE_PRODUCT_SUCCESSED, DELETE_PRODUCT_FAILED } from "./actionType";
import { Bounce, toast } from "react-toastify";


function fetchProducts(){
    return {
        type:FETCH_PRODUCTS
    }
}

function fetchProductsSucceed(products){
    return {
        type:FETCH_PRODUCTS_SUCCEED,
        payload:products
    }
}
function fetchProductsFailed(error){
    return {
        type:FETCH_PRODUCTS_FAILED,
        payload:error
    }
}
function fetchFeaturedProductsSucceed(products){
    return {
        type:FETCH_FEATURED_PRODUCTS_SUCCEED,
        payload:products
    }
}
function fetchFeaturedProductsFailed(error){
    return {
        type:FETCH_FEATURED_PRODUCTS_FAILED,
        payload:error
    }
}
function getProductInfo(){
    return {
        type:GET_PRODUCT_INFO,
    }
}
function getProductInfoSucceed(product){
    return {
        type:GET_PRODUCT_INFO_SUCCESSED,
        payload:product
    }
}
function getProductInfoFailed(error){
    return {
        type:GET_PRODUCT_INFO_FAILED,
        payload:error
    }
}
function getRelatedProduct(){
    return {
        type:GET_RELATED_PRODUCT,
    }
}
function getRelatedProductSucceed(product){
    return {
        type:GET_RELATED_PRODUCT_SUCCESSED,
        payload:product
    }
}
function getRelatedProductFailed(error){
    return {
        type:GET_RELATED_PRODUCT_FAILED,
        payload:error
    }
}
function getLatestProduct(){
    return {
        type:GET_LATEST_PRODUCTS,
    }
}
function getLatestProductSucceed(product){
    return {
        type:GET_LATEST_PRODUCTS_SUCCESSED,
        payload:product
    }
}
function getLatestProductFailed(error){
    return {
        type:GET_LATEST_PRODUCTS_FAILED,
        payload:error
    }
}
function getHotDealsProduct(){
    return {
        type:GET_HOTDEALS_PRODUCTS,
    }
}
function getHotDealsProductSucceed(product){
    return {
        type:GET_HOTDEALS_PRODUCTS_SUCCESSED,
        payload:product
    }
}
function getHotDealsProductFailed(error){
    return {
        type:GET_HOTDEALS_PRODUCTS_FAILED,
        payload:error
    }
}
export function removeCurrentProd(){
    return {
        type:REMOVE_CURRENT_PRODUCT,
    }
}
export function getCategoryProducts(){
    return {
        type:GET_CATEGORY_PRODUCTS,
    }
}
function allProductLoaded(prods){


    return{
        type:"ALL_PRODS_LOADED",
        payload:prods
    }
}
function addReview(){
    return {
        type:ADD_REVIEW,
    }
}
function addReviewSucceed(review,starNb,user){
    let prod=JSON.parse(sessionStorage.getItem("current-viewed-prod"))
    prod.reviews_number +=1;
    prod.star_number +=parseFloat(starNb);
    prod.rating = prod.star_number / prod.reviews_number;
    review.reviewer=user
    prod.reviewList.unshift(review)
    sessionStorage.setItem("current-viewed-prod",JSON.stringify(prod))
    return {
        type:ADD_REVIEW_SUCCESSED,
        payload:prod
    }
}
function addReviewFailed(error){
    return {
        type:ADD_REVIEW_FAILED,
        payload:error
    }
}
function deleteReview(){
    return {
        type:DELETE_REVIEW,
    }
}
function deleteReviewSucceed(rev){

    let prod=JSON.parse(sessionStorage.getItem("current-viewed-prod"))
    prod.reviews_number -=1;
    prod.star_number -= rev.starNb;
    prod.rating = prod.star_number / prod.reviews_number;
    prod.reviewList=prod.reviewList.filter((e)=> e.id != rev.id);


    sessionStorage.setItem("current-viewed-prod",JSON.stringify(prod))
    toast.success("The Review Has Been Deleted", {
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
    return {
        type:DELETE_REVIEW_SUCCESSED,
        payload:prod
    }
}
function deleteReviewFailed(error){
    return {
        type:DELETE_REVIEW_FAILED,
        payload:error
    }
}
function editReview(){
    return {
        type:EDIT_REVIEW,
    }
}
function editReviewSucceed(index,data){

    let prod=JSON.parse(sessionStorage.getItem("current-viewed-prod"))
    let rev=prod.reviewList[index]
    prod.star_number -= parseInt(rev.star_numbers);

    prod.reviewList[index].content=data.editText;
    prod.reviewList[index].star_numbers=parseFloat(data.nbStar);

    prod.star_number += parseFloat(data.nbStar);
    prod.rating = prod.star_numbers / prod.reviews_numbers;



    sessionStorage.setItem("current-viewed-prod",JSON.stringify(prod))
    toast.success("The Review Has Been Edited", {
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
    return {
        type:EDIT_REVIEW_SUCCESSED,
        payload:prod
    }
}
function editReviewFailed(error){
    return {
        type:EDIT_REVIEW_FAILED,
        payload:error
    }
}
export function getProducts(){
    return function(dispatch){
    axios.get("http://127.0.0.1:8000/api/products")
    .then(re=>{sessionStorage.setItem("allProds",JSON.stringify(re.data.prods)),dispatch(allProductLoaded(re.data.prods))})
    .catch(err=>console.log(err))
    }
}
export function getCategoryProductsSucceed(product,filerOn=false,specificCat=false){
    
    return {
        type:GET_CATEGORY_PRODUCTS_SUCCESSED,
        payload:product,
        filer: filerOn ? true : false,
        specificCat:specificCat ? true : false
    }
}
function getCategoryProductsFailed(error){
    return {
        type:GET_CATEGORY_PRODUCTS_FAILED,
        payload:error
    }
}
function addProduct(){
    return {
        type:ADD_PRODUCT,
    }
}
function addProductSucceed(prod){
    let prods=JSON.parse(sessionStorage.getItem("allProds"))
    prods.push(prod)
    sessionStorage.setItem("allProds",JSON.stringify(prods))

    if(sessionStorage.getItem("latestProds") != null){
        let latest=JSON.parse(sessionStorage.getItem("latestProds"))
        latest.pop()
        latest.unshift(prod);
        sessionStorage.setItem("latestProds",JSON.stringify(latest))
    }
    toast.success("The Product Added Successfully", {
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
    return {
        type:ADD_PRODUCT_SUCCESSED,
        payload:prod
    }
}
function addProductFailed(error){
    return {
        type:ADD_PRODUCT_FAILED,
        payload:error
    }
}
function deleteProduct(){
    return {
        type:DELETE_PRODUCT,
    }
}
function deleteProductSucceed(prodId){
    let prods=JSON.parse(sessionStorage.getItem("allProds"))
    let newProds=prods.filter(ele=>ele.id != prodId)
    sessionStorage.setItem("allProds",JSON.stringify(newProds))

    if(sessionStorage.getItem("latestProds") != null){
        let latest=JSON.parse(sessionStorage.getItem("latestProds"))
        let newLatest=latest.filter(ele=>ele.id != prodId)
        sessionStorage.setItem("latestProds",JSON.stringify(newLatest))
    }
    toast.success("The Product Deleted Successfully", {
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
    return {
        type:DELETE_PRODUCT_SUCCESSED,
        payload:newProds
    }
}
function deleteProductFailed(error){
    return {
        type:DELETE_PRODUCT_FAILED,
        payload:error
    }
}
export function GET_PRODUCTS(){
    return function(dispatch){
        dispatch(fetchProducts())
        axios.get("http://127.0.0.1:8000/api/products")
        .then(re=>{
            dispatch(fetchProductsSucceed(re.data.prods),
        )})
        .catch(err=>dispatch(fetchProductsFailed(err.message)))
    }
}
export function GET_PRODUCT(id){
    return function(dispatch){
        dispatch(getProductInfo())
        axios.get("http://127.0.0.1:8000/api/product/"+id)
        .then(re=>{
            dispatch(getProductInfoSucceed(re.data.product),
            sessionStorage.setItem("current-viewed-prod",JSON.stringify(re.data.product))
        )})
        .catch(err=>dispatch(getProductInfoFailed(err.response.data.error)))
    }
}
export function GET_RELATED_PRODUCTS(id){
    return function(dispatch){
        dispatch(getRelatedProduct())
        axios.get("http://127.0.0.1:8000/api/product/"+id+"/relatedProds")
        .then(re=>{
            dispatch(getRelatedProductSucceed(re.data.relatedProds),
            sessionStorage.setItem("related-prods-to-current-prod",JSON.stringify(re.data.relatedProds))
        )})
        .catch(err=>dispatch(getRelatedProductFailed(err.response.data.error)))
    }
}

export function GET_FEATURED_PRODUCTS(){
    return function(dispatch){
        dispatch(fetchProducts())
        axios.get("http://127.0.0.1:8000/api/featuredProds")
        .then(re=>{
            dispatch(fetchFeaturedProductsSucceed(re.data)
        )})
        .catch(err=>{
            dispatch(fetchFeaturedProductsFailed(err.response.data.error))
        })
    }
}
export function FETCH_CATEGORY_PRODS(id){
    return function(dispatch){
        dispatch(getCategoryProducts())
        axios.get("http://127.0.0.1:8000/api/category/"+id)
        .then(re=>{
            dispatch(getCategoryProductsSucceed(re.data.products,true,true),
        )})
        .catch(err=>{
            dispatch(getCategoryProductsFailed(err.response.data.error))
        })
    }
}
export function FETCH_CATEGORY_RANDOM_PRODS(){
    return function(dispatch){
        dispatch(getCategoryProducts())
        axios.get("http://127.0.0.1:8000/api/categories/randomProducts")
        .then(re=>{
            dispatch(getCategoryProductsSucceed(re.data.products,false,false),
        )})
        .catch(err=>{
            dispatch(getCategoryProductsFailed(err.response.data.error))
        })
    }
}
export function FETCH_LATEST_PRODS(){
    return function(dispatch){
        dispatch(getLatestProduct())
        axios.get("http://127.0.0.1:8000/api/getLatestProds")
        .then(re=>{
            dispatch(getLatestProductSucceed(re.data.prods),
        )})
        .catch(err=>{
            dispatch(getLatestProductFailed(err.response.data.error))
        })
    }
}
export function FETCH_HOTDEALS_PRODS(){
    return function(dispatch){
        dispatch(getHotDealsProduct())
        axios.get("http://127.0.0.1:8000/api/getHotDealsProds")
        .then(re=>{
            dispatch(getHotDealsProductSucceed(re.data.prods),
        )})
        .catch(err=>{
            dispatch(getHotDealsProductFailed(err.response.data.error))
        })
    }
}
export function ADD_REVIEW_TO_PROD(userId,prodId,data){
    return function(dispatch){
        dispatch(addReview())
        axios.post("http://127.0.0.1:8000/api/review/create/"+userId+"/"+prodId,{content:data.reviewText,star_numbers:data.starNb})
        .then(re=>{
            dispatch(addReviewSucceed(re.data.rev,data.starNb,data.user),
        )})
        .catch(err=>{
            dispatch(addReviewFailed(err.response.data.error))
        })
    }
}
export function DELETE_REVIEW_FROM_PROD(rev){
    return function(dispatch){
        dispatch(deleteReview())
        axios.delete("http://127.0.0.1:8000/api/review/delete/"+rev.id)
        .then(()=>{
            dispatch(deleteReviewSucceed(rev),
            
        )})
        .catch(err=>{
            dispatch(deleteReviewFailed(err.response.data.error))
        })
    }
}
export function EDIT_REVIEW_OF_PROD(id,index,data){
    return function(dispatch){
        dispatch(editReview())
        axios.patch("http://127.0.0.1:8000/api/review/edit/"+id,{content:data.editText,star_numbers:data.nbStar})
        .then(()=>{
            dispatch(editReviewSucceed(index,data),
        )})
        .catch(err=>{
            dispatch(editReviewFailed(err.response.data.error))
        })
    }
}
export function ADD_PROD_TO_WISHLIST(userId,prodId){
    return function(){
        axios.post("http://127.0.0.1:8000/api/wishlist/add/"+prodId+"/to/"+userId)
        .then(()=>{
                toast.success("The Item Added To The WishList", {
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
        })
        .catch((err)=>{
            console.log(err.response.data.error)
        })
    }
}
export function REMOVE_PROD_FROM_WISHLIST(userId,prodId){
    return function(){
        axios.delete("http://127.0.0.1:8000/api/wishlist/remove/"+prodId+"/from/"+userId)
        .then((re)=>{
            console.log(re)
                toast.success("The Item Deleted From Your WishList", {
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
        })
        .catch((err)=>{
            console.log(err.response.data.error)
        })
    }
}
export function CLEAR_WISHLIST(userId){
    return function(){
        axios.delete("http://127.0.0.1:8000/api/wishlist/"+userId+"/clear")
        .then(()=>{
                toast.success("Your WishList Is Empty Now", {
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
        })
        .catch((err)=>{
            console.log(err.response.data.error)
        })
    }
}
export function ADD_PROD_TO_WISHLIST_FAILED(){
    return function(){
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
}
export function ADD_PROD(data){
    return function(dispatch){
        dispatch(addProduct())
        axios.post("http://127.0.0.1:8000/api/product/create/user/"+data.ownerId+"/cate/"+data.category,{...data})
        .then((re)=>{
            dispatch(addProductSucceed(re.data.product),
        )})
        .catch(err=>{
            console.log(err)
            dispatch(addProductFailed(err.response.data.error))
        })
    }
}
export function DELETE_PROD(prodId){
    return function(dispatch){
        dispatch(deleteProduct())
        axios.delete("http://127.0.0.1:8000/api/product/"+prodId+"/delete")
        .then(()=>{
            dispatch(deleteProductSucceed(prodId),
        )})
        .catch(err=>{
            console.log(err)
            dispatch(deleteProductFailed(err.response.data.error))
        })
    }
}

