import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface customers {
  id: number;

    // 🧾 Basic Information
  company_name: string;
  email: string;
  primary_phone: string;
  additional_phone?: string;

  // 📍 Location Information
  main_address: string;
  additional_address?: string;

    // 🏢 Business Information
  job_title?: string;
  commercial_register?: string;
  tax_certificate?: string;

    // 👤 Contact Person
  contact_person_name: string;
  contact_person_phone: string;

    // 📝 Additional
  notes?: string;

    // 🔗 Relations
  customer_type_id: number;
  customer_category_id: number;
  user_id?: number;

   // 📊 Status
  status: string;

    // 📅 Meta
  createdAt: string;
}

const savedData = typeof window !== "undefined" ? localStorage.getItem("customers") : null;

export const initialCustomers: customers[] = savedData ? JSON.parse(savedData) : [];

const customers = createSlice({
    name: "customer",
    initialState: {
        customers: initialCustomers
    },
    reducers: {
      addNewCustomer:(state, action: PayloadAction<customers>) => {
        state.customers.push(action.payload)
        localStorage.setItem("customers", JSON.stringify(state.customers));
      },
      deleteCustomer: (state, action: PayloadAction<number>) => {
          state.customers = state.customers.filter( type => type.id !== action.payload)
          localStorage.setItem("customers", JSON.stringify(state.customers));
      },
      updateCustomer: (state, action: PayloadAction<customers>) => {
          const index = state.customers.findIndex(type => type.id === action.payload.id);
          if (index !== -1) {
              state.customers[index] = action.payload;
              localStorage.setItem("customers", JSON.stringify(state.customers));
          }
      },
    }
})

export const { addNewCustomer, deleteCustomer, updateCustomer } = customers.actions;
export default customers.reducer;


