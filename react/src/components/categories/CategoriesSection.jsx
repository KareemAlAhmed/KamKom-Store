import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CategoriesSection.css";
// import { fetchProductByCategoryAction } from "../../../redux/slices/Product";

const CategoriesSection = () => {
    const [selectedCateg, setSelectedCateg] = useState("Laptops");
    const dispatch = useDispatch();
    const data = [
        "Laptops",
        "Desktops",
        "Furniture",
        "Gaming",
        "Fashion",
        "Mobile",
        "Property",
        "Tablet",
        "Computer-Parts",
        "Networking",
    ];

    // useEffect(() => {
    //     fetchProductByCategoryAction(selectedCateg);
    // }, []);

    // const selectCateg = (categ) => {
    //     setSelectedCateg(categ);
    //     dispatch(fetchProductByCategoryAction(categ));
    // };

    return (
        <>
            <div className="categories">
                {data?.map((categ) => (
                    <div
                        key={categ}
                        className={`categorie ${
                            categ === selectedCateg ? "selectedCat" : ""
                        }`}
                        // onClick={() => selectCateg(categ)}
                    >
                        <div>{categ}</div>
                    </div>
                ))}
            </div>

            <div className="selectedCateg">
                <div>{selectedCateg}</div>
            </div>
        </>
    );
};
export default CategoriesSection;
