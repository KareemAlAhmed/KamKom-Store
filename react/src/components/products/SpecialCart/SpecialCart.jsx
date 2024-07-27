// import React from 'react'
import "./SpecialCart.css"
export default function SpecialCart(props) {
  const info=props.info;
  const imgs=JSON.parse(props.info.images_url)

  return (
    <div className="specialCart" >
          <div className="imgBlock">
            <img src={Array.isArray(imgs)  ? imgs[0] : imgs} alt="" />
          </div>
          <div className="prodInfo">
              <h2>{info.name}</h2>
              <p className="price">{info.price}$</p>
              <p className="description">{info.description}</p>
              <p className="cate">Category: <span className="cateName">{info.category.name}</span>.</p>
              <button
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     addToCart();
                        // }}
                        className="cartBtn"
                    >
                        Add To Cart
                    </button>
          </div>
    </div>
  )
}
