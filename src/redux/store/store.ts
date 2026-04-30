import { configureStore } from "@reduxjs/toolkit";
import customerTypes from "../slice/customer-types/customer-types"
import customerCategory from "../slice/customerCategory/customerCategory"

export const myStore = configureStore({
    reducer:{
        customerTypes:customerTypes,
        customerCategory:customerCategory
    }
});
