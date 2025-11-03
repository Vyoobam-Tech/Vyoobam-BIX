import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";


const API_URL="/reports/gst"

export const fetchgstreports=createAsyncThunk("reports/gst/fetchAll",async () => {
    const res=await API.get(API_URL)
    return res.data
})

export const addgstreport=createAsyncThunk("reports/gst/add",async (gstreport) => {
    const res=await API.post(API_URL,gstreport)
    return res.data
})

export const deletegstreport=createAsyncThunk("reports/gst/delete",async (id) => {
    await API.delete(`${API_URL}/${id}`)
    return id
})

const gstreportSlice=createSlice({
    name:"gstreports",
    initialState:{
        items:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchgstreports.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchgstreports.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchgstreports.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
        })
        .addCase(addgstreport.fulfilled,(state,action)=>{
            state.items.push(action.payload)
        })
        .addCase(deletegstreport.fulfilled,(state,action)=>{
            state.items=state.items.filter((g)=>g._id !== action.payload)
        })
    }
})

export default gstreportSlice.reducer