import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL="http://localhost:5000/api/sup_payments"

export const fetchpayments=createAsyncThunk("sup_payments/fetchAll",async () => {
    const res=await axios.get(API_URL)
    return res.data
})

export const addpayment=createAsyncThunk("sub_payments/add",async (payment) => {
    const res=await axios.post(API_URL,payment)
    return res.data
})

export const deletepayment=createAsyncThunk("sub_payments/delete",async (id) => {
await axios.delete(`${API_URL}/${id}`)
return id
})

const suppilerpaymentSlice=createSlice({
    name:"sup_payments",
    initialState:{
        items:[],
        status:"idle",
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchpayments.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchpayments.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchpayments.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addpayment.fulfilled,(state,action)=>{
           state.items.push(action.payload)
        })
        .addCase(deletepayment.fulfilled,(state,action)=>{
            state.items=state.items.filter((p)=>p._id !== action.payload)
        })
    }

})

export default suppilerpaymentSlice.reducer