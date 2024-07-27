import  { useRef } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Cart from '../Cart/Cart';
import "./ProductSlider.css"
import ResultCard from '../../resultsContainer/resultCard/ResultCard';


export default function ProductSlider(props) {

    const options = {
        loop: true,
        autoplay: true,
        autoplayTimeout: 2500, // Adjust autoplay interval here
        items: 12,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 4,
          },
        },
        pagination: false, // Disable pagination if needed
      };
      const carouselRef = useRef(null);

      const handleNext = () => {
        if (carouselRef.current) {
          carouselRef.current.next(); // Trigger `next` method
        }
      };
    
      const handlePrev = () => {
        if (carouselRef.current) {
          carouselRef.current.prev(); // Trigger `prev` method
        }
      };

      
  return ( props.prods?.length >0 ?

    <>
   
        <div className="actions">
            <button className="prev" onClick={handlePrev}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </button>
            <button className="next" onClick={handleNext}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </button>
        </div>
        <OwlCarousel className="owl-theme" ref={carouselRef} {...options}>
        
        {props.prods.length > 0 ? ( // Handle empty FeaturedProducts
            props.prods.map((e, index) => {
              if (!e.id) { // Check for missing ID (optional)
                console.log('Featured product at index', index, 'has missing ID');
                return null; // Prevent rendering invalid items
              }
              
              // return  <Cart key={e.id} info={e} nb={e.id} /> // Assuming Cart component exists and expects info and nb props
              return  <ResultCard key={e.id} item={e}  /> // Assuming Cart component exists and expects info and nb props
              
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
