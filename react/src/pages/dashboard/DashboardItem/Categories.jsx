import { useState } from "react";
import "./DashboardItem.css";

const Categories = () => {
 
    const [cats, setCats] = useState([
        "Laptops",
        "Computer-Parts",
        "Desktops",
        "Gaming",
        "Mobile",
        "Tablet",
        "Networking",
        "Fashion",
        "Furniture",
        "Pet",
        "Property",
        "Vehicle",
    ]);

    const style={
        padding: "15px 0"
    }

    return (
        <div className="dashboardTable">
            <table>
                <tr>
                    <td>
                        <h5>Name</h5>
                    </td>
                    {/* <td>
                        <h5>Actions</h5>
                    </td> */}
                </tr>

                {cats.map((product, index) => (
                    <tr className="dashboardDesc" key={index}>
                        <td style={style}>{product}</td>
                        {/* <td>
                            <button className="dashBtn">X</button>
                        </td> */}
                    </tr>
                ))}
            </table>
            
        </div>
    );
};
export default Categories;
