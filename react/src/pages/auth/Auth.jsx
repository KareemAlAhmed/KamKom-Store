import Container from "../../components/containers/Container";
import Navbar from "../../components/navbar/Navbar";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "Yup";
import "./Auth.css";
import { useState } from "react";

import { Navigate } from "react-router-dom";
import { LoginUser, registerUSer } from "../../../redux/user/userAction";
import UploadWidget from "../../cloudinary";
import { Bounce, toast } from "react-toastify";
const formSchemaRegister = Yup.object({
    firstName: Yup.string().required("Firstname is required"),
    secondName: Yup.string().required("secondName is required"),
    email: Yup.string().required("Email is required"),
    bio: Yup.string().required("Bio is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    streetAddress: Yup.string().required("Street address is required"),
    password: Yup.string()
        .min(8)
        .required("password is required & at least 8 characters"),
});

const formSchemaLogin = Yup.object({
    email: Yup.string().required("email is required"),
    password: Yup.string().min(8).required("password is required"),
});

const Auth = () => {
    const [isUserRegister, setIsUserRegister] = useState(true);

    const [imageError, setImageError] = useState(false);
    let userAuth=false;
    const dispatch = useDispatch();

    const formSchema = isUserRegister ? formSchemaRegister : formSchemaLogin;


    const formik = useFormik({
        initialValues: {
            firstName: "",
            secondName: "",
            email: "",
            bio: "",
            country: "",
            city: "",
            province: "",
            streetAddress: "",
            password: "",
        },
        onSubmit: (values) => {
            if (isUserRegister) {
                if (!sessionStorage.getItem("image_uploaded")) {
                    // setImageError(true);
                    return;
                }

                dispatch(
                    registerUSer({
                        ...values,
                        image_url: sessionStorage.getItem("image_uploaded"),
                    })
                );
                sessionStorage.removeItem("image_uploaded");
                toast.success("Welcome User.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                    });

            } else {
                dispatch(LoginUser(values));
                toast.success("Welcome Back.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce
                    });
            }
            formik.resetForm();
            
        },
        validationSchema: formSchema,
        
    });
   
    const toggleAuth = (e) => {
        e.preventDefault();
        setIsUserRegister(!isUserRegister);
    };

    const currentUser = useSelector((state) => state.users.currentUser);
    const currentUserError = useSelector((state) => state.users.currentUserError);

    if( currentUser != null && currentUserError == ""){
        if ( currentUser[0].FullName !='' ) {
            return <Navigate to="/" />;
        }
    }

    return (
        <>
            <Navbar />
            <Container>
                <div className="authPage">
                    <Form
                        onSubmit={formik.handleSubmit}
                        title={isUserRegister ? "Register" : "Login"}
                        withCloseBtn
                    >
                        <div className="toggleAuth">
                            {isUserRegister ? (
                                <>
                                    Already Have An Account?{" "}
                                    <span onClick={(e) => toggleAuth(e)}>
                                        Login
                                    </span>
                                </>
                            ) : (
                                <>
                                    Create Account?{" "}
                                    <span onClick={(e) => toggleAuth(e)}>
                                        Register
                                    </span>
                                </>
                            )}
                        </div>
                        {isUserRegister ? (
                            <>                               
                                <Input
                                    type="text"
                                    name="firstName"
                                    label="FirstName"
                                    placeholder="FirstName"
                                    fullWidth
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange("firstName")}
                                    onBlur={formik.handleBlur("firstName")}
                                />
                                {formik.errors.firstName &&
                                formik.touched.firstName ? (
                                    <p className="inputError">
                                        {formik.errors.firstName}
                                    </p>
                                ) : (
                                    <></>
                                )}
                               
                                <Input
                                    type="text"
                                    name="secondName"
                                    label="secondName"
                                    placeholder="secondName"
                                    fullWidth
                                    value={formik.values.secondName}
                                    onChange={formik.handleChange("secondName")}
                                    onBlur={formik.handleBlur("secondName")}
                                />
                                 {formik.errors.secondName &&
                                formik.touched.secondName ? (
                                    <p className="inputError">
                                        {formik.errors.secondName}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                
                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className="inputError">
                                        {formik.errors.email}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                {imageError ? (
                                    <p className="inputError">
                                        {" "}
                                        please provide the product images
                                    </p>
                                ) : (
                                    <></>
                                )}
                               <div className="inputContainer">
                                    <UploadWidget text="+ Add your image here" onChange={(event)=> event.preventDefault()} />
                                </div>
                                

                                <Input
                                    value={formik.values.bio}
                                    onChange={formik.handleChange("bio")}
                                    onBlur={formik.handleBlur("bio")}
                                    type="text"
                                    name="bio"
                                    label="Bio"
                                    placeholder="Bio"
                                    fullWidth
                                />
                                {formik.errors.bio && formik.touched.bio ? (
                                    <p className="inputError">
                                        {formik.errors.bio}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                

                                <Input
                                      value={formik.values.country}
                                      onChange={formik.handleChange("country")}
                                    onBlur={formik.handleBlur("country")}
                                    type="text"
                                    name="country"
                                    label="Country"
                                    placeholder="Country"
                                    fullWidth
                                />
                                {formik.errors.country &&
                                formik.touched.country ? (
                                    <p className="inputError">
                                        {formik.errors.country}
                                    </p>
                                ) : (
                                    <></>
                                )}
                              

                                <Input
                                    type="text"
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    fullWidth
                                    value={formik.values.city}
                                    onChange={formik.handleChange("city")}
                                    onBlur={formik.handleBlur("city")}
                                />
                              
                              {formik.errors.city && formik.touched.city ? (
                                    <p className="inputError">
                                        {formik.errors.city}
                                    </p>
                                ) : (
                                    <></>
                                )}
                               

                                <Input
                                    type="text"
                                    name="streetAddress"
                                    label="Street Address"
                                    placeholder="Street Address"
                                    fullWidth
                                    value={formik.values.streetAddress}
                                    onChange={formik.handleChange(
                                        "streetAddress"
                                    )}
                                    onBlur={formik.handleBlur("streetAddress")}
                                />
                                 {formik.errors.streetAddress &&
                                formik.touched.streetAddress ? (
                                    <p className="inputError">
                                        {formik.errors.streetAddress}
                                    </p>
                                ) : (
                                    <></>
                                )}
                               

                                <Input
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Password"
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}

                                    onBlur={formik.handleBlur("password")}
                                />
                                 {formik.errors.password &&
                                formik.touched.password ? (
                                    <p className="inputError">
                                        {formik.errors.password}
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                

                                <Input
                                    type="email"
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    fullWidth
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}

                                    onBlur={formik.handleBlur("email")}
                                />
                                {formik.errors.email && formik.touched.email ? (
                                    <p className="inputError">
                                        {formik.errors.email}
                                    </p>
                                ) : (
                                    <></>
                                )}
                                

                                <Input
                                    type="password"
                                    name="password"
                                    label="Password"
                                    placeholder="Password"
                                    fullWidth
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}

                                    onBlur={formik.handleBlur("password")}
                                />
                                {formik.errors.password &&
                                formik.touched.password ? (
                                    <p className="inputError">
                                        {formik.errors.password}
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                        {currentUserError != '' ?
                         <p className="inputError">
                         *****{currentUserError}
                     </p>
                     : null }
                     
                        <div className="submitBtn">
                            <input
                                type="submit"
                                value="submit"
                                className="inputSubmitBtn"
                            />
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    );
};
export default Auth;
