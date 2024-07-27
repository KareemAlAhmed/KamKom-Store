
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import store from "../redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition: Bounce
            />
    </Provider>
);
