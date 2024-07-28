import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Cart from "./Cart/Cart";
// import { fetchProductByCategoryAction } from "../../../redux/slices/Product";
import SectionBlock from "./featureCategory/SectionBlock";
import SpecialProducts from "./specialProduct/SpecialProduct";
import "./Products.css";
import { GET_FEATURED_PRODUCTS } from "../../../redux/product/productAction";

const Products = () => {
    const dispatch = useDispatch();
    // let user=JSON.parse(sessionStorage.getItem("user-auth"))
    let user=useSelector(state=>state.users.currentUser);
    useEffect(() => dispatch(GET_FEATURED_PRODUCTS()),[dispatch,user]);
    

    const bestSelling = useSelector(state => state.products.bestSelling);
    const latestProds = useSelector(state => state.products.latestProds);
    const newestProds = useSelector(state => state.products.newestProds);
    const highestPriceProds = useSelector(state => state.products.highestPriceProds);

    return (

            <div className="products mobileVerProd">

                <SectionBlock for="home" type="NEW PRODUCTS" prods={newestProds} />
                <SectionBlock for="home" type="LATEST PRODUCTS" prods={latestProds}/>
                <SpecialProducts  prods={highestPriceProds} />
                <SectionBlock for="home" type="BEST SELLING" prods={bestSelling}/>

            </div>

    );
};
export default Products;
