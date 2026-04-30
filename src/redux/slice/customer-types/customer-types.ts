import { createSlice } from "@reduxjs/toolkit";


export const initialCustomerTypes = [
  { id: "#001", name: "VIP", description: "High-value enterprise clients with dedic...", customers: 0, date: "Oct 24, 2023" },
  { id: "#002", name: "Regular", description: "Standard active accounts on monthly o...", customers: 0, date: "Nov 12, 2023" },
  { id: "#003", name: "New", description: "Onboarding phase accounts (first 30 d...", customers: 0, date: "Dec 01, 2023" },
  { id: "#004", name: "Returning", description: "Previously churned customers who hav...", customers: 0, date: "Jan 15, 2024" },
];

const customerTypes = createSlice({
    name: "customer-types",
    initialState : {
        types : initialCustomerTypes
    },
    reducers: {
        addNewType: (state, action) => {
            state.types.push(action.payload)
        }
    }
})

export const { addNewType } = customerTypes.actions;
export default customerTypes.reducer;