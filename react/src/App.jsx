
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

// const style = { position: "relative", top: "70px" };

export default function App(props) {
    return (
        <>
            <Navbar />
            {props.children}
            <Footer />
        </>
    );
}
