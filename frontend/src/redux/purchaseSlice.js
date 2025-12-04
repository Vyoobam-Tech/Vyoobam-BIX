import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";


const API_URL="/purchases"

export const fetchpurchases=createAsyncThunk("purchases/fetchAll",async () => {
    
    const res=await API.get(API_URL)
    return res.data
})

export const addpurchase=createAsyncThunk("purchases/add",async (purchase) => {
  
    const res=await API.post(API_URL,purchase)
    return res.data
})

export const deletepurchase=createAsyncThunk("purchases/delete",async (id) => {
   
    await API.delete(`${API_URL}/${id}`)
    return id
})

export const updatePurchase = createAsyncThunk(
  "purchases/update",
  async ({ id, updatedData }) => {
    const res = await API.put(`${API_URL}/${id}`, updatedData);
    return res.data;
  }
);


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
        .addCase(updatePurchase.fulfilled,(state,action)=>{
              const index=state.items.findIndex((p)=>p._id === action.payload._id)
              if( index !== -1){
                state.items[index]=action.payload
              }
        })
       }
  
})

export default purchaseSlice.reducer