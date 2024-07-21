import { createSlice } from "@reduxjs/toolkit";


export const scheduleSlice=createSlice({
    name:'schedule',
    initialState:{
        doctorId:'',
        visitFees:0
    },
    reducers:{
        setSchedule:(state,action)=>{
            state.doctorId=action.payload.doctorId;
            state.visitFees=action.payload.visitFees;
        }
    }
})
export const {setSchedule}=scheduleSlice.actions;
export default scheduleSlice.reducer;