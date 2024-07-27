import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
import "./UserProfile.css";
import { useDispatch } from "react-redux";
// import { userLogoutAction } from "../../../redux/slices/User";
import { Link, Navigate } from "react-router-dom";
// import { deleteCartAction } from "../../../redux/slices/Order";

const UserProfile = () => {
    if (!localStorage.getItem("user-auth")) return <Navigate to="/" />;
    const user = JSON.parse(localStorage.getItem("user-auth"))[0];
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(deleteCartAction());
        dispatch(userLogoutAction());
    };

    return (
        <>
            <Navbar />
            <div className="UserProfile">
                <Container>
                    <div className="profileDetails">
                        <div className="userProfileInfo1">
                            <img src={user?.imageUrl} alt="image of user" />
                            <p>
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                        <div className="userProfileInfo2">
                            <ul>
                                <li>Bio : {user?.bio}</li>
                                <li>Country : {user?.country}</li>
                                <li>City : {user?.city}</li>
                                <li>Province : {user?.province}</li>
                                <li>Street Address : {user?.streetAddress}</li>
                                {user?.id == 1 ? (
                                    <li className="adminProfile">
                                        Admin Account
                                    </li>
                                ) : (
                                    <li className="clientProflie">
                                        Client Account
                                    </li>
                                )}
                                <li className="logoutBtn">
                                    <Link
                                        to="/"
                                        onClick={() => {
                                            logout();
                                        }}
                                    >
                                        Log Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};
export default UserProfile;
