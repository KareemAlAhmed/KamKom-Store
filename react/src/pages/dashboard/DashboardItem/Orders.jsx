import { useEffect, useState } from "react";
import "./DashboardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_ORDERS } from "../../../../redux/user/userAction";

const Orders = () => {
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(10);
    const [entrie, setEntrie] = useState(10);

    let orders=useSelector(state=>state.users.allPurchases);
    let allOrders=[]
    if(orders != null){
        orders.forEach(element => {
            let list=Object.values(JSON.parse(element.products));
            list=list.map(ele=>{ele.date=element.created_at;return ele})
            allOrders.push(...list)
        });
    }
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(GET_ALL_ORDERS())},[]);

    
    const setEntries = (entrie) => {
        setFirstIndex(0);
        setLastIndex(entrie);
        setEntrie(entrie);
    };
    const moveToNext = () => {
        
        if (lastIndex >= allOrders?.length) return null;
        setFirstIndex(firstIndex + entrie);
        setLastIndex(lastIndex + entrie);
    };
    const moveToPrev = () => {
        if (firstIndex == 0) return;
        setFirstIndex(firstIndex - entrie);
        setLastIndex(lastIndex - entrie);
    };

    function formatISOTimestamp(isoTimestamp) {
        const date = new Date(isoTimestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 
      
      
        return `${day}-${month}-${year}`; 
      
      }
    // const products = splitedArrays[selectedIndex];
    return (
        <div className="dashboardTable">
            <table>
                <tr>
                    <td>
                        <h5>Buyer</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Product</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Quantity</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Total Paid</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Seller</h5>
                    </td>
                    <td>
                        <h5>Date</h5>
                    </td>
                    <td>
                        <h5>Actions</h5>
                    </td>
                </tr>

                {allOrders.slice(firstIndex, lastIndex)
                .map((order, index) => (
                    <tr className="dashboardDesc" key={index}>
                        <td>{order.BuyerName}</td>
                        <td>{order.ProductName?.slice(0,80)}</td>
                        <td>{order.quantity}</td>
                        <td>${order.ProductPrice * order.quantity}</td>
                        <td>{order.seller}</td>
                        <td>{formatISOTimestamp(order.date)}</td>
                        <td>
                            <button className="dashBtn">X</button>
                        </td>
                    </tr>
                ))}
            </table>
            <div className="lastRow">
                <div className="lastRowPart">
                    <h4>show entries:</h4>
                    <div
                        onClick={() => setEntries(10)}
                        className={10 == entrie ? "selectedSlider" : ""}
                    >
                        10
                    </div>
                    <div
                        onClick={() => setEntries(15)}
                        className={15 == entrie ? "selectedSlider" : ""}
                    >
                        15
                    </div>
                    <div
                        onClick={() => setEntries(20)}
                        className={20 == entrie ? "selectedSlider" : ""}
                    >
                        20
                    </div>
                </div>
                <div className="lastRowPart">
                    <div
                        onClick={() => {
                            moveToPrev();
                        }}
                        className={`slider ${
                            firstIndex != 0 ? "noMoreItem" : ""
                        }`}
                    >
                        Prev
                    </div>
                    <div
                        onClick={() => {
                            moveToNext();
                        }}
                        className={`slider ${
                            lastIndex <= allOrders?.length
                                ? "noMoreItem"
                                : ""
                        }`}
                    >
                        Next
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Orders;
