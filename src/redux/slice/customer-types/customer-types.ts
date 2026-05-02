import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CustomerType {
    id:string,
    name:string,
    description:string,
    customers: number,
    date:string
}

const savedData = localStorage.getItem("customer-types")

export const initialCustomerTypes: CustomerType[] = savedData ? JSON.parse(savedData) : [] ;



const customerTypes = createSlice({
    name: "customer-types",
    initialState : {
        types : initialCustomerTypes
    },
    reducers: {
        addNewType: (state, action: PayloadAction<CustomerType>) => {
            state.types.push(action.payload)
            localStorage.setItem("customer-types", JSON.stringify(state.types));
        },
        deleteType: (state, action: PayloadAction<string>) => {
            state.types = state.types.filter( type => type.id !== action.payload)
            localStorage.setItem("customer-types", JSON.stringify(state.types));
        }
    }
})

export const { addNewType, deleteType } = customerTypes.actions;
export default customerTypes.reducer;



