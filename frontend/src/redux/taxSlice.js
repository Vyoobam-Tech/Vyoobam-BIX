import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/taxes"

export const fetchtaxes = createAsyncThunk("taxes/fetchAll",async () => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    const res = await axios.get(API_URL,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const addtax=createAsyncThunk("taxes/add",async (tax) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    const res = await axios.post(API_URL,tax,{headers:{Authorization:`Bearer ${token}`},})
    return res.data
})

export const deletetax=createAsyncThunk("tax/delete",async (id) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const token=user?.token
    if(!token)
        throw new error("Token missing")
    await axios.delete(`${API_URL}/${id}`,{headers:{Authorization:`Bearer ${token}`},})
    return id
})

const taxSlice = createSlice({
    name:"taxes",
    initialState:({
         items:[],
         status:"idle",
         error:null

    }),
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchtaxes.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchtaxes.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchtaxes.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addtax.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletetax.fulfilled,(state,action)=>{
            state.items= state.items.filter((t)=>t._id !== action.payload)
        })
    }
})

export default taxSlice.reducer