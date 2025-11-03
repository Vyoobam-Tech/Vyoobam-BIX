import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/stockledger"

export const fetchstocks=createAsyncThunk("stockledger/fetchAll",async () => {
    
    const res=await API.get(API_URL)
    return res.data
})

export const addstock=createAsyncThunk("stockledger/add",async (stock) => {
   
    const res=await API.post(API_URL,stock)
    return res.data
})

export const deletestock=createAsyncThunk("stockledger/delete",async (id) => {
   
    await API.delete(`${API_URL}/${id}`)
    return id
})

export const updatestock=createAsyncThunk("stockledger/update",async ({id,updatedData}) => {
    
    const res=await API.put(`${API_URL}/${id}`,updatedData)
    return res.data
})

const stockledgerSlice=createSlice({
  name:"stockss",
  initialState:{
    items:[],
    status:"idle",
    error:null,
  },
  reducers:{},
  extraReducers:
       (builder)=>{
        builder
        .addCase(fetchstocks.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchstocks.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchstocks.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addstock.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletestock.fulfilled,(state,action)=>{
            state.items=state.items.filter((p)=>p._id !== action.payload)
        })
       .addCase(updatestock.fulfilled,(state,action)=>{
               const index=state.items.findIndex((s)=>s._id === action.payload._id)
               if(index !== -1){
                   state.items[index]=action.payload
               }
           })
       }
  
})

export default stockledgerSlice.reducer