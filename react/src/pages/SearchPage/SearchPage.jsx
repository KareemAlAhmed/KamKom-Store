
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import "./SearchPage.css";
import { useSelector } from "react-redux";

import { useState } from "react";

const SearchPage = () => {
    const location = useLocation();

    const products = useSelector((state) => state?.products?.allProds);
    const [prodName,setProdName]=useState("");
    const items = products?.filter((product) =>
        product?.name?.toLowerCase().includes(location?.state?.toLowerCase()),
    );
    const itemsMobileVersion= products?.filter((product) =>
        product?.name?.toLowerCase().includes(prodName.toLowerCase()),
    );
    const isMobileVersion=()=>{
        let body=document.querySelector("body")
        return body.offsetWidth < 480;
    }
    return (
        <>
            <Navbar type="search" />
            <div className="searchPage">

                    <div className="shoppingCart">

                        {
                            !isMobileVersion() ? (location.state?.length !== 0 ? (
                                items?.length == 0 ? (
                                    <h1>
                                        Your search is not match any product name
                                    </h1>
                                ) : (
                                    <div className="cartItems">
                                        {items?.map((item, index) => (
                                            <Link to={`/product/${item?.id}`} key={item?.id}>
                                                <div
                                                    key={index}
                                                    className="productSearchList"
                                                >
                                                    <div className="itemImg">
                                                        <img
                                                            src={item.thumbnail_url}
                                                            alt={item.name}
                                                        />
                                                    </div>
                                                    <div className="productSearchName">
                                                        <p>{item?.name}</p>
                                                        <p>
                                                            Price : {item?.price}$
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <h1>What are you searching for</h1>
                            )):
                            (
                            
                                <>
                                 <div className="search " >
        
                                    <span className="icon">         
                                        <i className="bi bi-search"></i>     
                                    </span>
                                    <input id="search-input" type="text" placeholder="search"
                                    value={prodName}
                                    onChange={(e) => {
                                        
                                        setProdName(e.target.value),
                                        itemsMobileVersion
                                    }}
                                    />
                                </div>
                                {
                                    prodName?.length !== 0 ? (
                                        itemsMobileVersion?.length == 0 ? (
                                            <h1>
                                                Your search does not match any product name
                                            </h1>
                                        ) : (
                                            <div className="cartItems">
                                                {itemsMobileVersion?.map((item, index) => (
                                                    <Link to={`/product/${item?.id}`} key={item?.id}>
                                                        <div
                                                            key={index}
                                                            className="productSearchList"
                                                        >
                                                            <div className="itemImg">
                                                                <img
                                                                    src={item.thumbnail_url}
                                                                    alt={item.name}
                                                                />
                                                            </div>
                                                            <div className="productSearchName">
                                                                <p>{item?.name}</p>
                                                                <p>
                                                                    Price : {item?.price}$
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    ) : (
                                        <h1>What are you searching for</h1>
                                    )
                                }
                                
                                </>
                        
                        
                        
                        )
                        }
                    </div>

            </div>
        </>
    );
};
export default SearchPage;
