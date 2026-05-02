import { configureStore } from "@reduxjs/toolkit";
import customerTypes from "../slice/customer-types/customer-types"
import customerCategory from "../slice/customerCategory/customerCategory"
import leadStatus from "../slice/lead-status/lead-status"
import customers from "../slice/customers/customers"

export const myStore = configureStore({
    reducer:{
        customerTypes:customerTypes,
        customerCategory:customerCategory,
        leadStatus: leadStatus,
        customers: customers
    }
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
