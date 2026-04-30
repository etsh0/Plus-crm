import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CustomerCategory {
    id:string,
    name:string,
    description:string,
    customers: number,
    date:string
};

const savedData = localStorage.getItem("customer-category")

export const initialCustomerCategories: CustomerCategory[] = savedData ? JSON.parse(savedData) : [] ;

  const customerCategory = createSlice({
    name : "customer-category",
    initialState : {
        categories : initialCustomerCategories
    },
    reducers : {
        addNewCategory: (state, action : PayloadAction<CustomerCategory> ) => {
            state.categories.push(action.payload)
            localStorage.setItem("customer-category" , JSON.stringify(state.categories))
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter( category => category.id !== action.payload)
            localStorage.setItem("customer-category", JSON.stringify(state.categories));
        
    }}
  })


  export const { addNewCategory , deleteCategory } = customerCategory.actions;
  export default customerCategory.reducer;