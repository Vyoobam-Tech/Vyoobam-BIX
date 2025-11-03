import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/sup_payments"

export const fetchpayments=createAsyncThunk("sup_payments/fetchAll",async () => {
   
    const res=await API.get(API_URL)
    return res.data
})

export const addpayment=createAsyncThunk("sub_payments/add",async (payment) => {
    
    const res=await API.post(API_URL,payment)
    return res.data
})

export const deletepayment=createAsyncThunk("sub_payments/delete",async (id) => {
    
await API.delete(`${API_URL}/${id}`)
return id
})

export const updatepayment=createAsyncThunk("sub_payments/update",async ({id,updatedData}) => {
    
   const res= await API.put(`${API_URL}/${id}`,updatedDatar)
    return res.data

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
        .addCase(updatepayment.fulfilled,(state,action)=>{
            const index=state.items.findIndex((p)=>p._id === action.payload._id)
            if(index !== -1)
                state.items[index]=action.payload
        })
    }

})

export default suppilerpaymentSlice.reducer