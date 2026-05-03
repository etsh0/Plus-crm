import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export interface leadStatus {
    id:string,
    name:string,
    color:string
}

const savedData = typeof window !== "undefined" ? localStorage.getItem("lead-status") : null

export const initialLeadStatus: leadStatus[] = savedData ? JSON.parse(savedData) : [];

const leadStatus = createSlice({
    name: "lead-status",
    initialState : {
        status: initialLeadStatus
    },
    reducers: {
        addNewStatus: (state, action: PayloadAction<leadStatus>) => {
            state.status.push(action.payload)
            localStorage.setItem("lead-status", JSON.stringify(state.status));
        },
        deleteStatus: (state, action: PayloadAction<string>) => {
            state.status = state.status.filter( type => type.id !== action.payload)
            localStorage.setItem("lead-status", JSON.stringify(state.status));
        },
        updateStatus: (state, action: PayloadAction<leadStatus>) => {
            const index = state.status.findIndex(type => type.id === action.payload.id);
            if (index !== -1) {
                state.status[index] = action.payload;
                localStorage.setItem("lead-status", JSON.stringify(state.status));
            }
        },
    }
})

export const { addNewStatus, deleteStatus, updateStatus } = leadStatus.actions;
export default leadStatus.reducer;



