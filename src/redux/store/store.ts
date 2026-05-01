import { configureStore } from "@reduxjs/toolkit";
import customerTypes from "../slice/customer-types/customer-types"
import customerCategory from "../slice/customerCategory/customerCategory"
import leadStatus from "../slice/lead-status/lead-status"

export const myStore = configureStore({
    reducer:{
        customerTypes:customerTypes,
        customerCategory:customerCategory,
        leadStatus: leadStatus
    }
});
