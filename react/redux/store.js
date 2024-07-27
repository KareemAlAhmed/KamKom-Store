import userReducer from "./user/userReducer.js";
import { combineReducers, createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import productReducer from "./product/productReducer.js";
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';
const rootReducer=combineReducers({
    products:productReducer,
    users:userReducer
})

const store=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,logger)));
export default store;