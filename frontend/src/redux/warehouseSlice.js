import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";

const API_URL="/warehouses"

export const fetchwarehouses=createAsyncThunk("warehouses/fetchAll",async () => {
    
    const res=await API.get(API_URL)
    return res.data
})

export const addwarehouse=createAsyncThunk("warehouses/add",async (warehouse) => {
  
const res = await API.post(API_URL,warehouse)
return res.data
})

export const deletewarehouse=createAsyncThunk("warehouses/delete",async (id) => {
   
    await API.delete(`${API_URL}/${id}`)
    return id
})

export const updateWarehouse=createAsyncThunk("warehouses/update",async ({id,updatedData}) => {
    
    const res=await API.put(`${API_URL}/${id}`,updatedData)
    return res.data
})

const warehouseSlice=createSlice({
    name:"warehouses",
    initialState:{
        items:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:
        (builder)=>{
             builder
             .addCase(fetchwarehouses.pending,(state)=>{
                state.status="loading"
             })
             .addCase(fetchwarehouses.fulfilled,(state,action)=>{
                  state.status="succeeded"
                  state.items=action.payload
        })
        .addCase(fetchwarehouses.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addwarehouse.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletewarehouse.fulfilled,(state,action)=>{
            state.items=state.items.filter((w)=>w._id !== action.payload)
        })
        .addCase(updateWarehouse.fulfilled,(state,action)=>{
            const index=state.items.findIndex((w)=>w._id  === action.payload)
            if(index !== -1){
                state.items[index]=action.payload
            }
        })
        }
    
})

export default warehouseSlice.reducer