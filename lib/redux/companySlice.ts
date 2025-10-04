import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pendingJoinReqs: 0
}
const companySlice = createSlice({
    name: 'CompanyJoinReqs',
    initialState,
    reducers:{
        setPendingJoinReqs:(state, action)=>{
            state.pendingJoinReqs = action.payload;
        }
    }
})

export const {setPendingJoinReqs} = companySlice.actions;
export const companyReducer = companySlice.reducer;