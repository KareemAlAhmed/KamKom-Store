import { Slide } from "react-slideshow-image";

import slideImages from "./images";

import "react-slideshow-image/dist/styles.css";
import  "./Slider.modle.css";

export default function Slider() {
  return (
    <div className="slideContainer">
      <Slide easing="ease">
        {slideImages.map((slide, index) => {
          return (
            <div className="slide" key={slide}>
              <div style={{ backgroundImage: `url(${slideImages[index]})` }}>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
}
