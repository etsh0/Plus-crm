import { configureStore } from "@reduxjs/toolkit";
import customerTypes from "../slice/customer-types/customer-types"

export const myStore = configureStore({
    reducer: customerTypes
})