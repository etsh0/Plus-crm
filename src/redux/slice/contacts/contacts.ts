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

const getInitialData = () => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("contacts");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse contacts from local storage");
      }
    }
  }
  return [];
};

export const initialContacts: contacts[] = getInitialData();

const contactsSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: initialContacts
    },
    reducers: {
        addNewContact:(state, action: PayloadAction<contacts>) => {
            state.contacts.push(action.payload)
            if (typeof window !== "undefined") {
                localStorage.setItem("contacts", JSON.stringify(state.contacts));
            }
        },
        updateContact: (state, action: PayloadAction<contacts>) => {
            const index = state.contacts.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
                if (typeof window !== "undefined") {
                    localStorage.setItem("contacts", JSON.stringify(state.contacts));
                }
            }
        },
        deleteContact: (state, action: PayloadAction<number>) => {
          state.contacts = state.contacts.filter( type => type.id !== action.payload)
          if (typeof window !== "undefined") {
              localStorage.setItem("contacts", JSON.stringify(state.contacts));
          }
      },
    }
})

export const { addNewContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
