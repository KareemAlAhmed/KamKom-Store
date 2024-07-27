import { useEffect, useState } from "react";
import { productsList } from "../../../../utils/baseUrl";
import "./DashboardItem.css";
import { useDispatch, useSelector } from "react-redux";
// import {
//     deleteProductAction,
//     fetchProductByCategoryAction,
// } from "../../../../redux/slices/Product";
import { truncateText } from "../../../../utils/truncate";
import { DELETE_PROD } from "../../../../redux/product/productAction";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(10);
    const [entrie, setEntrie] = useState(10);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(fetchProductByCategoryAction("Laptops"));
    }, []);
    const navigate=useNavigate();
    const  products  = useSelector((state) => state?.products.allProds);

    const setEntries = (entrie) => {
        setFirstIndex(0);
        setLastIndex(entrie);
        setEntrie(entrie);
    };

    const moveToNext = (index) => {
        
        if (lastIndex >= products?.length) return null;
        setFirstIndex(firstIndex + entrie);
        setLastIndex(lastIndex + entrie);
    };
    const moveToPrev = (index) => {
        if (firstIndex == 0) return;
        setFirstIndex(firstIndex - entrie);
        setLastIndex(lastIndex - entrie);
    };

    const deleteProduct = (id) => {
        dispatch(DELETE_PROD(id));
        // dispatch(fetchProductByCategoryAction("Laptops"));
    };

    return (
        <div className="dashboardTable">
            <table>
                <tr>
                    <td>
                        <h5>Name</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Brand</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Price</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Quantity</h5>
                    </td>
                    {/* <td>
                        {" "}
                        <h5>Category</h5>
                    </td> */}
                    <td>
                        <h5>Action</h5>
                    </td>
                </tr>

                {products.slice(firstIndex, lastIndex)
                    .map((product, index) => (
                        <tr className="dashboardDesc" key={index} onClick={()=>navigate("/product/" + product?.id)}>
                            <td>{truncateText(product.name)}</td>
                            <td>{product.brand_name}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            {/* <td>{product.category}</td> */}
                            <td>
                                <button
                                    className="dashBtn"
                                    onClick={() => deleteProduct(product?.id)}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
            </table>
            <div className="lastRow">
                <div className="lastRowPart">
                    <h4>show entries:</h4>
                    <div
                        onClick={() => setEntries(10)}
                        className={10 == entrie ? "selectedSlider" : ""}
                    >
                        10
                    </div>
                    <div
                        onClick={() => setEntries(15)}
                        className={15 == entrie ? "selectedSlider" : ""}
                    >
                        15
                    </div>
                    <div
                        onClick={() => setEntries(20)}
                        className={20 == entrie ? "selectedSlider" : ""}
                    >
                        20
                    </div>
                </div>
                <div className="lastRowPart">
                    <div
                        onClick={() => {
                            moveToPrev();
                        }}
                        className={`slider ${
                            firstIndex != 0 ? "noMoreItem" : ""
                        }`}
                    >
                        Prev
                    </div>
                    <div
                        onClick={() => {
                            moveToNext();
                        }}
                        className={`slider ${
                            lastIndex <= products?.length
                                ? "noMoreItem"
                                : ""
                        }`}
                    >
                        Next
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Products;
