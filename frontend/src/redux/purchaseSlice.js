import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL="http://localhost:5000/api/purchases"

export const fetchpurchases=createAsyncThunk("purchases/fetchAll",async () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    const res=await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const addpurchase=createAsyncThunk("purchases/add",async (purchase) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token Missing")
    const res=await axios.post(API_URL,purchase,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const deletepurchase=createAsyncThunk("purchases/delete",async (id) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token Missing")
    await axios.delete(`${API_URL}/${id}`,{headers:{Authorization:`Bearer ${token}`},})
    return id
})

const purchaseSlice=createSlice({
  name:"purchases",
  initialState:{
    items:[],
    status:"idle",
    error:null,
  },
  reducers:{},
  extraReducers:
       (builder)=>{
        builder
        .addCase(fetchpurchases.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchpurchases.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchpurchases.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addpurchase.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletepurchase.fulfilled,(state,action)=>{
            state.items=state.items.filter((p)=>p._id !== action.payload)
        })
       }
  
})

export default purchaseSlice.reducer