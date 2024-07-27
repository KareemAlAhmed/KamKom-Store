import { useParams } from "react-router-dom";
import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
import DashboardNav from "./DashboardNav/DashboardNav";
import Users from "./DashboardItem/Users";
import Products from "./DashboardItem/Products";
import "./Dashboard.css";
import Footer from "../../components/footer/Footer";
import Orders from "./DashboardItem/Orders";
import Categories from "./DashboardItem/Categories";
import AddProduct from "./addProduct/AddProduct";

const Dashboard = () => {
    const display = useParams()?.item;

    return (
        <>
            <Navbar />

                <div className="dashboard">
                    <DashboardNav />
                    {display == "products" && (
                        <div className="dashDisplay">
                            <Products />
                        </div>
                    )}
                    {display == "categories" && (
                        <div className="dashDisplay">
                            <Categories />
                        </div>
                    )}
                    {display == "orders" && (
                        <div className="dashDisplay">
                            <Orders />
                        </div>
                    )}
                    {display == "users" && (
                        <div className="dashDisplay">
                            <Users />
                        </div>
                    )}
                    {display == "administrators" && <AddProduct />}
                </div>
                </>
    );
};
export default Dashboard;
