import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice.js"
import quantityReducer from "./quantitySlice.js"

const appStore = configureStore({
    reducer:{
        cart : cartReducer,
        quantity : quantityReducer,
    }
});

export default appStore;