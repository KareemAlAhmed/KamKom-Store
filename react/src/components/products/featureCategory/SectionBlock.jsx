// import React from 'react'
import HeaderBlock from "./HeaderBlock.jsx"
// import Cart from "../Cart/Cart.jsx"
import ProductSlider from "../productSlider/ProductSlider.jsx"
import "./SectionBlock.css"
import { useSelector } from "react-redux";
export default function SectionBlock(props) {
  const relatedproducts=useSelector(state=>state.products.relatedProdToCurrentProd)

  return (
    <div className="featureSection">
        <HeaderBlock title={props.type} />
        <div className="listOfProducts">
            <ProductSlider prods={props.for != "home" ? relatedproducts : props.prods} />
        </div>
    </div>
  )
}
