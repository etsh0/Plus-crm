import { configureStore } from "@reduxjs/toolkit";
import customerTypes from "../slice/customer-types/customer-types"
import customerCategory from "../slice/customerCategory/customerCategory"
import leadStatus from "../slice/lead-status/lead-status"
import customers from "../slice/customers/customers"
import contacts from "../slice/contacts/contacts"
import auth from "../slice/auth/authSlice"
import leads from "../slice/leads/leads"

export const myStore = configureStore({
    reducer:{
        customerTypes:customerTypes,
        customerCategory:customerCategory,
        leadStatus: leadStatus,
        customers: customers,
        contacts: contacts,
        auth: auth,
        leads: leads
    }
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
