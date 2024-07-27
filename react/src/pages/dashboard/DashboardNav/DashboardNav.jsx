import { Link, useParams } from "react-router-dom";
import { IoAddCircle } from "react-icons/io5";
import { FaUser, FaTshirt } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import "./DashboardNav.css";

const DashboardNav = () => {
    const item = useParams().item;
    return (

            <div className="DashboardNav">
                <Link to="/dashboard/products" className="dashboardLink">
                    <div
                        className={`dashoardItem ${
                            item == "products" ? "selectedDashItem" : ""
                        }`}
                    >
                        <FaTshirt size={25} /> Products
                    </div>
                </Link>
                <Link to="/dashboard/categories" className="dashboardLink">
                    <div
                        className={`dashoardItem ${
                            item == "categories" ? "selectedDashItem" : ""
                        }`}
                    >
                        <BiSolidCategoryAlt size={25} /> Categories
                    </div>
                </Link>
                <Link to="/dashboard/orders" className="dashboardLink">
                    <div
                        className={`dashoardItem ${
                            item == "orders" ? "selectedDashItem" : ""
                        }`}
                    >
                        <FaClipboardList size={25} /> Orders
                    </div>
                </Link>
                <Link to="/dashboard/users" className="dashboardLink">
                    <div
                        className={`dashoardItem ${
                            item == "users" ? "selectedDashItem" : ""
                        }`}
                    >
                        <FaUser size={25} /> Users
                    </div>
                </Link>
                <Link to="/dashboard/administrators" className="dashboardLink">
                    <div
                        className={`dashoardItem ${
                            item == "administrators" ? "selectedDashItem" : ""
                        }`}
                    >
                        <IoAddCircle size={25} /> Add Product
                    </div>
                </Link>
            </div>

    );
};
export default DashboardNav;
