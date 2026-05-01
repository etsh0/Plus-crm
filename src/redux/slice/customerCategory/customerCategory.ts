import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CustomerCategory {
  id: number;
  name: string;
  description: string;
  customers: number;
  date: string;
}

const savedData =
  typeof window !== "undefined"
    ? localStorage.getItem("customer-category")
    : null;

export const initialCustomerCategories: CustomerCategory[] =
  savedData ? JSON.parse(savedData) : [];

const customerCategory = createSlice({
  name: "customer-category",
  initialState: {
    categories: initialCustomerCategories,
    searchTerm: "",
  },
  reducers: {
    addNewCategory: (
      state,
      action: PayloadAction<CustomerCategory>
    ) => {
      state.categories.push(action.payload);

      localStorage.setItem(
        "customer-category",
        JSON.stringify(state.categories)
      );
    },

    deleteCategory: (
      state,
      action: PayloadAction<number>
    ) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );

      localStorage.setItem(
        "customer-category",
        JSON.stringify(state.categories)
      );
    },

    editCategory: (
      state,
      action: PayloadAction<CustomerCategory>
    ) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id
          ? action.payload
          : category
      );

      localStorage.setItem(
        "customer-category",
        JSON.stringify(state.categories)
      );
    },

    setSearchTerm: (
      state,
      action: PayloadAction<string>
    ) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addNewCategory,
  deleteCategory,
  editCategory,
  setSearchTerm,
} = customerCategory.actions;

export default customerCategory.reducer;