import Container from "../containers/Container";
import Slider from "../slider/Slider";
import "./Banner.css";

const Banner = () => {
    return (
        <div className="Banner">     
                <div className="bannerContainer">
                    <Slider />
                </div>
        </div>
    );
};
export default Banner;
