import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface contacts {
  id: number;
  name: string;
  phone: string;               
  email: string;
  contact_method: "phone" | "email";              
  job_title: string;          
  customer_id: number;         
  createdAt: string;
}


const savedData = localStorage.getItem("contacts")

export const initialContacts: contacts[] = savedData ? JSON.parse(savedData) :[];

const contacts = createSlice({
    name: "contact",
    initialState: {
        contacts: initialContacts
    },
    reducers: {
        addNewContact:(state, action: PayloadAction<contacts>) => {
            state.contacts.push(action.payload)
            localStorage.setItem("contacts", JSON.stringify(state.contacts));
        },
        deleteContact: (state, action: PayloadAction<number>) => {
          state.contacts = state.contacts.filter( type => type.id !== action.payload)
          localStorage.setItem("contacts", JSON.stringify(state.contacts));
      },
    }
})


export const { addNewContact, deleteContact } = contacts.actions;
export default contacts.reducer;


