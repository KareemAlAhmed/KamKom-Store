import  { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SpecialCart from '../SpecialCart/SpecialCart';
import "./SpecialProduct.css"

export default function SpecialProducts(props) {
    const options = {
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000, // Adjust autoplay interval here
        items: 2,
        responsive: {
          0: {
            items: 1,
          },

        },
        pagination: true, // Disable pagination if needed
      };
      const carouselRef = useRef(null);

   

      
  return ( props.prods.length >0 ?

    <>
        <OwlCarousel className="owl-theme specialProd" ref={carouselRef} {...options}>
              {props.prods.length > 0 ? ( // Handle empty FeaturedProducts
                props.prods.map((e, index) => {
                  if (!e.id) { // Check for missing ID (optional)
                    console.log('Featured product at index', index, 'has missing ID');
                    return null; // Prevent rendering invalid items
                  }
                  
                  return <SpecialCart key={e.id} info={e} />
                  // Assuming Cart component exists and expects info and nb props
                  
                })
          ) : (
            <p>No featured products to display.</p>
          )}
          </OwlCarousel>
    </> : (
      <p>No Products</p>
    )

  )
}
