import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Deal {
  id: number;
  deal_title: string;

  customer_id?: number;
  value:number;

  status: "NEW" | "PROPOSAL" | "WON" | "LOST"; 

  expectedCloseDate?: string;
  user_id?: number,
  createdAt: string;
}


const savedData = typeof window !== "undefined" ? localStorage.getItem("deals") : null

export const initialDeals: Deal[] = savedData ? JSON.parse(savedData) : [];


const deals = createSlice({
  name: "deals",
  initialState: {
    deals: initialDeals
  },
  reducers: {
    addNewDeal: (state, action: PayloadAction<Deal>) => {
      state.deals.push(action.payload)
      localStorage.setItem("deals", JSON.stringify(state.deals));
    },
    updateDealStatus: (
      state,
      action: PayloadAction<{ id: number; status: Deal["status"] }>
    ) => {
      const deal = state.deals.find(d => d.id === action.payload.id);
      if (deal) {
        deal.status = action.payload.status;
        localStorage.setItem("deals", JSON.stringify(state.deals));
      }
    },
  }
})


export const { addNewDeal, updateDealStatus } = deals.actions;
export default deals.reducer;

