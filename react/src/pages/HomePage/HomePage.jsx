

import Banner from "../../components/banner/Banner";

import Products from "../../components/products/Products";
import App from "../../App";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/product/productAction";



export default function HomePage() {
    const dispatch = useDispatch();
    if (sessionStorage.getItem("allProds") == null) {
        dispatch(getProducts());
    }

    return (

        <App>
            <ToastContainer />
            <div className="home">
                <Banner />

                {/* <CategoriesSection /> */}
                <Products />
            </div>
        </App>

    );
}
