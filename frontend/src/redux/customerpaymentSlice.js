import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const API_URL="http://localhost:5000/api/cus_payments"

export const fetchpayments=createAsyncThunk("cus_payments/fetchAll",async () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new Error("Token missing")
    const res=await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const addpayment=createAsyncThunk("cus_payments/add",async (payment) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new Error("Token missing")
    const res=await axios.post(API_URL,payment,{headers:{Authorization:`Bearer ${token}`}})
    return res.data
})

export const deletepayment=createAsyncThunk("cus_payments/delete",async (id) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new Error("Token missing")
    await axios.delete(`${API_URL}/${id}`,{headers:{Authorization:`Bearer ${token}`}})
    return id
})


export const updatePayment=createAsyncThunk("cus_payments/update",async ({id, updatedData}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new Error("Token Missing")
    const res=await axios.put(`${API_URL}/${id}`,updatedData,{headers:{Authorization:`Bearer ${token}`}})
    return res.data
})

const customerPaymentSlice = createSlice({
    name:"cus_payments",
    initialState:{
        items:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>
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
    .addCase(updatePayment.fulfilled,(state,action)=>{
        const index=state.items.findIndex((c)=> c._id === action.payload)
        if(index !== -1)
            state.items[index]=action.payload
    })
    
})

export default customerPaymentSlice.reducer