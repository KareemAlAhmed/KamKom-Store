import { useState } from "react";
import Form from "../../../components/form/Form";
import Input from "../../../components/input/Input";
import Select from "react-select";
// import { Image, Video, Transformation, CloudinaryContext } from 'cloudinary-react';
// import { fetchPhotos } from './Utils';
// import UploadWidget from "../../../cloudinary";
import UploadWidgetMultiple from "../../../cloudinaryMultiple";
import * as Yup from "Yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "./AddProduct.css";
import { ADD_PROD } from "../../../../redux/product/productAction";
import { ToastContainer } from "react-toastify";
// import { addProductAction } from "../../../../redux/slices/Product";

const formSchema = Yup.object({
    name: Yup.string().min(4).required("Name of product is required"),
    brand: Yup.string().min(4).required("Brand name is required"),
    description: Yup.string().min(4).required("description is required"),
    price: Yup.number().required("price is required & should be number"),
    quantity: Yup.number().required("quantity is required & should be number"),
    vendor: Yup.string().required("vendor of product is required"),
});


const category = [
    { value: 1, label: "Laptops" },
    { value: 3, label: "Desktops" },
    { value: 9, label: "Furniture" },
    { value: 4, label: "Gaming" },
    { value: 8, label: "Fashion" },
    { value: 5, label: "Mobile" },
    { value: 11, label: "Property" },
    { value: 6, label: "Tablet" },
    { value: 2, label: "Computer-Parts" },
    { value: 7, label: "Networking" },
    { value: 10, label: "Pet" },
    { value: 12, label: "Vehicle" },
];

const AddProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState({
        value: "Laptops",
    });
 


    const [notSubmited, setNotSubmited] = useState(true);
    const [images, setImages] = useState([]);
    const [imagesError, setImagesError] = useState(false);
    let user=useSelector(state=>state.users.currentUser);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            brand: "",
            quantity: "",
            description: "",
            price: "",
            vendor: user[0]?.FullName,
        },
        onSubmit: (values) => {
            if(notSubmited){
                return;
            }
            if (!sessionStorage.getItem("image_uploaded")) {
                setImagesError(true);
                return;
            }
            console.log({
                ...values,
                category: selectedCategory.value,
                images_url: JSON.parse(sessionStorage.getItem("image_uploaded")),
                ownerId : user[0]?.id,
            });

            dispatch(
                ADD_PROD({
                    ...values,
                    category: selectedCategory.value,
                    images_url: sessionStorage.getItem("image_uploaded"),
                    ownerId : user[0]?.id,
                })
            );
            sessionStorage.removeItem("image_uploaded");
            setImages([]);
            // setSelectedCategory({ value: "Laptops" });
            formik.resetForm();
            setImagesError(false);
            setNotSubmited(true);
        },
        validationSchema: formSchema,
    });

    return (
        <div className="addProductContainer">
            <div className="addProductPage">
                <Form title="Add Product" onSubmit={formik.handleSubmit}>
                    
                    <Input
                        type="text"
                        name="Name"
                        label="Name"
                        placeholder="Name"
                        fullWidth
                        value={formik.values.name}
                        onChange={formik.handleChange("name")}
                        onBlur={formik.handleBlur("name")}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <p className="inputError">{formik.errors.name}</p>
                    ) : (
                        <></>
                    )}
                    <Input
                        type="text"
                        name="Brand"
                        label="Brand"
                        placeholder="Brand"
                        fullWidth
                        value={formik.values.brand}
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                    />
                    {formik.errors.brand && formik.touched.brand ? (
                        <p className="inputError">{formik.errors.brand}</p>
                    ) : (
                        <></>
                    )}

                    <UploadWidgetMultiple text="+ Add your image here" list={[]} onChange={(event)=> event.preventDefault()} />
                    {imagesError ? (
                        <p className="inputError">
                            {" "}
                            please provide the product images
                        </p>
                    ) : (
                        <></>
                    )}
                    

                    <Input
                        type="text"
                        name="Description"
                        label="Description"
                        placeholder="Description"
                        fullWidth
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        onBlur={formik.handleBlur("description")}
                    />
                    {formik.errors.description && formik.touched.description ? (
                        <p className="inputError">
                            {formik.errors.description}
                        </p>
                    ) : (
                        <></>
                    )}
                    
                    <Input
                        type="text"
                        name="Price"
                        label="Price"
                        placeholder="Price in $"
                        fullWidth
                        value={formik.values.price}
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleBlur("price")}
                    />

                    {formik.errors.price && formik.touched.price ? (
                        <p className="inputError">{formik.errors.price}</p>
                    ) : (
                        <></>
                    )}
                    <Input
                        type="text"
                        name="Quantity"
                        label="Quantity"
                        placeholder="Quantity"
                        fullWidth
                        value={formik.values.quantity}
                        onChange={formik.handleChange("quantity")}
                        onBlur={formik.handleBlur("quantity")}
                    />
                    
                    {formik.errors.quantity && formik.touched.quantity ? (
                        <p className="inputError">{formik.errors.quantity}</p>
                    ) : (
                        <></>
                    )}
                    <label>Category</label>
                    <Select
                        defaultValue={null}
                        onChange={setSelectedCategory}
                        options={category}
                        className="Input selectInput"
                        placeholder="Please Select Category , default (Laptops)..."
                    />

                    <Input
                        type="text"
                        name="Vendor"
                        label="Vendor"
                        // placeholder="Vendor"
                        fullWidth
                        value={user[0]?.FullName}
                        readOnly

                    />
                    <div className="submitBtn">
                        <input
                            type="submit"
                            value="submit"
                            className="disabledInputSumbitBtn"
                            onClick={()=>setNotSubmited(false)}
                        />
                    </div>
                </Form>
            </div>
            <ToastContainer />
        </div>
    );
};
export default AddProduct;
