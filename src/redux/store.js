import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        cart : cartReducer,
        product : productSlice
    }
})