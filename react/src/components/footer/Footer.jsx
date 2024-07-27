import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "../containers/Container";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo"></div>

                <div className="footerContainer">
                    <nav className="footer-navigation">
                        <ul className="footerUl">
                            <li>
                                <a href="#">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Shipping Information</a>
                            </li>
                            <li>
                                <a href="#">Returns & Refunds</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="contact-info">
                        <p>Contact Us: kamkom-Store@gmail.com</p>
                        <p>Phone: 01-03 60 90</p>
                    </div>
                    <div className="social-media">
                        <a href="#">
                            <FaFacebook />{" "}
                        </a>
                        <a href="#">
                            <FaInstagram />
                        </a>
                        <a href="#">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

        </div>
    );
};
export default Footer;
