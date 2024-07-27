import { useEffect, useState } from "react";
import "./DashboardItem.css";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_USR, GET_ALL_USERS_INFO } from "../../../../redux/user/userAction";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(10);
    const [entrie, setEntrie] = useState(10);

    let users=useSelector(state=>state.users.allUsers);

    const dispatch=useDispatch();
    useEffect(()=>{dispatch(GET_ALL_USERS_INFO())},[]);
    const navigate=useNavigate();
    const setEntries = (entrie) => {
        setFirstIndex(0);
        setLastIndex(entrie);
        setEntrie(entrie);
    };

    const moveToNext = () => {
        
        if (lastIndex >= users?.length) return null;
        setFirstIndex(firstIndex + entrie);
        setLastIndex(lastIndex + entrie);
    };
    const moveToPrev = () => {
        if (firstIndex == 0) return;
        setFirstIndex(firstIndex - entrie);
        setLastIndex(lastIndex - entrie);
    };
    const deleteUser=(id)=>{
        dispatch(DELETE_USR(id))
    }
    // const users = splitedArrays[selectedIndex];

    return (
        <div className="dashboardTable">
            <table>
                <tr>
                    <td>
                        <h5>Name</h5>
                    </td>
                    <td>
                        {" "}
                        <h5>Email</h5>
                    </td>
                    <td className="notImp">
                        {" "}
                        <h5>Mobile Number</h5>
                    </td>
                    <td className="notImp">
                        {" "}
                        <h5>Balance</h5>
                    </td>
                    <td className="notImp">
                        {" "}
                        <h5>Country</h5>
                    </td>
                    <td className="notImp">
                        <h5>City</h5>
                    </td>
                    <td>
                        <h5>Action</h5>
                    </td>
                </tr>
                {users?.slice(firstIndex, lastIndex)
                .map((user, index) => (
                    <tr className="dashboardDesc" key={index} onClick={()=>navigate("/profile/"+user?.id)} >
                        <td>{user.FullName}</td>
                        <td>{user.email}</td>
                        <td className="notImp">+961 {user.kamkom_number}</td>
                        <td className="notImp">{user.balance}</td>
                        <td className="notImp">{user.country}</td>
                        <td className="notImp">{user.city}</td>
                        <td>
                            <button className="dashBtn" onClick={()=>{
                                    deleteUser(user?.id)
                            }}>X</button>
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
                            lastIndex <= users?.length
                                ? "noMoreItem"
                                : ""
                        }`}
                    >
                        Next
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Users;
