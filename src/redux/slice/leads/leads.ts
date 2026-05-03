import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Lead {
  id: number;
  lead_title: string;

  customer_id?: number;
  expected_value?:number;

  status: string,
  source: string,
  user_id?: number,
  createdAt?: string;
}




const savedData = typeof window !== "undefined" ? localStorage.getItem("leads") : null

export const initialLeads: Lead[] = savedData ? JSON.parse(savedData) : [];


const leads = createSlice({
  name: "leads",
  initialState: {
    leads: initialLeads
  },
  reducers: {
    updateLeadStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const lead = state.leads.find(l => l.id === action.payload.id);
      if (lead) {
        lead.status = action.payload.status;
        localStorage.setItem("leads", JSON.stringify(state.leads));
      }
    },
    addNewLead: (state, action: PayloadAction<Lead>) => {
      state.leads.push(action.payload)
      localStorage.setItem("leads", JSON.stringify(state.leads));
    }
  }
})


export const { updateLeadStatus, addNewLead } = leads.actions;
export default leads.reducer;

