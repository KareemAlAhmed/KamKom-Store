import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const SearchPage = () => {
    const location = useLocation();

    console.log(location.state);
    const products = useSelector((state) => state?.product?.products?.prods);

    const items = products?.filter((product) =>
        product?.name?.toLowerCase().includes(location?.state?.toLowerCase())
    );
    return (
        <>
            <Navbar />
            <div className="searchPage">
                <Container>
                    <div className="shoppingCart">
                        {location.state?.length == 0 ? (
                            <h1>What are you searching for</h1>
                        ) : { items }?.length === 0 ? (
                            <></>
                        ) : (
                            <div className="cartItems">
                                {items?.map((item, index) => (
                                    <Link to={`/product/${item?.id}`}>
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
                                                <p>Price : {item?.price}$</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}{" "}
                        ( )}
                    </div>
                </Container>
            </div>
        </>
    );
};
