import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import JSONTransport from "nodemailer/lib/json-transport";

const API_URL="http://localhost:5000/api/warehouses"

export const fetchwarehouses=createAsyncThunk("warehouses/fetchAll",async () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    const res=await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const addwarehouse=createAsyncThunk("warehouses/add",async (warehouse) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
const res = await axios.post(API_URL,warehouse,{headers:{Authorization:`Bearer ${token}`},})
return res.data
})

export const deletewarehouse=createAsyncThunk("warehouses/delete",async (id) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    await axios.delete(`${API_URL}/${id}`,{headers:{Authorization:`Bearer ${token}`},})
    return id
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
        }
    
})

export default warehouseSlice.reducer