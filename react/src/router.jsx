import { createBrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Dashboard from "./pages/dashboard/Dashboard";
// import UserProfile from "./pages/userProfile/UserProfile";
import Auth from "./pages/auth/Auth";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

import WishListPage from "./pages/wishlistPage/WishListPage";
import UserPage from "./pages/userPage2/UserPage";
// const rootLoader = async () => {
   
//     const response = await fetch('http://127.0.0.1:8000/api/category/1');
//     const products = await response.json();
//     console.log(sessionStorage.getItem("intendentValue"))
//     return products.products; // Return the fetched data

// };

// const childLoader=async ()=>{
//     const id=sessionStorage.getItem("intendentValue")
//     const response = await fetch('http://127.0.0.1:8000/api/category/'+id);
//     const products = await response.json();
//     console.log(response)
//     console.log(products)

//     sessionStorage.setItem("items-searched",JSON.stringify(products))
//     return products.products; // Return the fetched data
// }
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/auth",
        element: <Auth />,
    },
    {
        path: "/cart",
        element: <ShoppingCart />,
    },
    {
        path: "/search",
        element: <SearchPage />,
    },
    {
        path: "/product/:id",
        element: <ProductDetails />,
    },
    {
        path: "/dashboard/:item",
        element: <Dashboard />,
    },
    {
        path: "/profile/:id",
        element: <UserPage />,
    },
    {
        path: "/wishlist",
        element: <WishListPage />,
    },
    {
        path: "/:item/",
        element: <ResultsPage />,
        // loader:childLoader,
        children: [
            {
                path: "results",
                element: <ResultsPage />,
            },
            {
              path: ":subitem/results",
              element: <ResultsPage />,
            },
          ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
