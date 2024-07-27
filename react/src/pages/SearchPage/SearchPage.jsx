import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import "./SearchPage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const SearchPage = () => {
    const location = useLocation();

    const products = useSelector((state) => state?.products?.allProds);

    const items = products?.filter((product) =>
        product?.name?.toLowerCase().includes(location?.state?.toLowerCase()),
    );
    return (
        <>
            <Navbar type="search" />
            <div className="searchPage">

                    <div className="shoppingCart">
                        {location.state?.length !== 0 ? (
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
                        )}
                    </div>

            </div>
        </>
    );
};
export default SearchPage;
