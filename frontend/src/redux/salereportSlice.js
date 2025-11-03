import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/reports/sales"

export const fetchsalereports=createAsyncThunk("reports/sales/fetchAll",async () => {
    
    const res=await API.get(API_URL)
    return res.data
})

export const addsalereport=createAsyncThunk("reports/sales/add",async (salereport) => {
      
    const res=await API.post(API_URL,salereport)
    return res.data
})

export const deletesalereport=createAsyncThunk("reports/sales/delete",async (id) => {
     
    await API.delete(`${API_URL}/${id}`)
    return id
})

const salereportSlice = createSlice({
    name:"salereports",
    initialState:{
        items:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchsalereports.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchsalereports.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchsalereports.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addsalereport.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletesalereport.fulfilled,(state,action)=>{
            state.items=state.items.filter((s)=>s._id !== action.payload)
        })
    }
    

})

export default salereportSlice.reducer
