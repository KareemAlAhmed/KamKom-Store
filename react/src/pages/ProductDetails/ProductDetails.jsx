import { Link, useNavigate, useParams } from "react-router-dom";
import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
// import { productsList } from "../../../utils/baseUrl";
import "./ProductDetails.css";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {ADD_PROD_TO_WISHLIST, ADD_PROD_TO_WISHLIST_FAILED, GET_PRODUCT, GET_RELATED_PRODUCTS, REMOVE_PROD_FROM_WISHLIST } from "../../../redux/product/productAction";
import { ADD_PROD_TO_CART, REMOVE_PROD_TO_CART } from "../../../redux/user/userAction";
import SectionBlock from "../../components/products/featureCategory/SectionBlock";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ReviewBlock from "../../components/reviews/ReviewBlock";
// import { getProductDetailsAction } from "../../../redux/slices/Product";

const ProductDetails = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [items, setItems] = useState([]);
    const [wantedQt,setWantedQt]=useState(1);
    const id = useParams().id;
    let images = [];
    let product = null;
    let isLoading = useSelector(state=>state.products.loading);
    // let [relatedproducts,setRelatedProds] = useState([]);
    const navigate=useNavigate()
    const dispatch = useDispatch();
    const currentUserId=useSelector(state=>state.users.currentUserId)
    let wishlist=JSON.parse(sessionStorage.getItem("user-wishlist"))
    let wishlistIds=JSON.parse(sessionStorage.getItem("wishProdsId"))
    const relatedproducts=useSelector(state=>state.products.relatedProdToCurrentProd)
    useEffect(() => {
        dispatch(GET_RELATED_PRODUCTS(id));
        dispatch(GET_PRODUCT(id));
        setItems(JSON.parse(sessionStorage.getItem("user-cart")));
        window.scroll({
            top: 0, 
            left: 0, 
            // behavior: 'smooth'
          });
    }, [id]);

    

    product = useSelector((state) => state.products?.currentViewedProd);

    if (product != null && product?.images_url ) images = JSON.parse(product?.images_url);
    
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
        let imgs=JSON.parse(product.images_url)
        const item = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: wantedQt,
            images_url:Array.isArray(imgs)  ? imgs[0] : imgs
        };
           
        dispatch(ADD_PROD_TO_CART(currentUserId,id,item,wantedQt));
        setWantedQt(1)
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
      let user=useSelector((state) => state.users?.currentUser)
      let inWishlist=false
      useEffect(()=>{
        if(wishlist != null){
          // console.log(wishlistIds.includes(item.id))
          inWishlist=wishlistIds.includes(product.id)
          let loved=document.querySelectorAll(".love")
          if(inWishlist){
            loved.forEach(e=>e.classList.add("loved"))
          }
          
        }
        
      },[wishlist,inWishlist])
    return (
        <>
            <Navbar />
            
            <div className="productDetailsPage">
                {!isLoading  ? (
                    <div  className="loading self-center">
                    <p>
                        Loading
                    </p>
                    <div className="col-3">
                        <div className="snippet" data-title="dot-pulse">
                        <div className="stage">
                            <div className="dot-pulse"></div>
                        </div>
                        </div>
                    </div>
              
                </div>
                ) : (
                        <>
                            <div className="productAllImages">
                            <div className="productImg">
                                <img src={
                                    
                                    Array.isArray(images) ?    images[selectedImage] : images} alt={product?.name} />
                            </div>
                            {Array.isArray(images)  ? 
                            <div className="productImages">
                                {images?.map((image, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            className={
                                                selectedImage == index
                                                    ? "imagesOfProduct selectedImage"
                                                    : "imagesOfProduct"
                                            }
                                            src={image}
                                            alt={product?.name}
                                        />
                                    </div>
                                )) 
                                }
                            </div> :
                            null
                        }            
                        </div>
                        
                        <div className="prodcutDetails">
                            <h1>{product?.name}</h1>
                            <p className="prodPrice">{product?.price}$</p>
                            <div className="purchasingProd">
                                <div className="prodQty">
                                    <button className="incbtn"
                                        onClick={()=>setWantedQt(wantedQt + 1)}
                                    >
                                                        +
                                                    </button>
                                                    <span>{wantedQt}</span>
                                                    <button className="decbtn"
                                                        onClick={()=> wantedQt == 1 ? null : setWantedQt(wantedQt - 1)}
                                                    >
                                                        -
                                                    </button>
    
                                </div>
                                <button
                                onClick={() => {
                                    addToCart();
                                }}
                                className="cartBtn"
                            >
                                Add To Cart
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill addToWish love" viewBox="0 0 16 16" onClick={e=>addToWishList(e,product)}>
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" className='love' onClick={e=>addToWishList(e,product)} />
                            </svg>
                            </div>
                            <p className="prodDesc">{product?.description}</p>
                            <p className="prodCat">Category: <span className="prodCatName">{product?.category?.name}</span>.</p>                          
                            <div className="sellerUser">
                                <p>Seller:</p>
                                <div className="content">
                                    <Link to={"/profile/"+product?.owner.id}><img src={product?.owner.image_url} alt="" /></Link>
                                    <Link to={"/profile/"+product?.owner.id}><span className="prodCatName">{product?.owner.FullName}</span>.</Link>
                                </div>
                            </div>
                            <button onClick={()=>navigate("/")}>back to shop</button>
                        </div>
                        <ReviewBlock  user={user != null ? user[0] : null} prod={product} />
                        <SectionBlock for="prodP" type="RELATED PRODUCTS" prods={relatedproducts} />
                             
                        </>    
                           
                    )}
                    </div>
                
                <ToastContainer />
            <Footer />
        </>
    );
};
export default ProductDetails;
