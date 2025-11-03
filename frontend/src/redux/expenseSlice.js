import { createSlice,createAsyncThunk,  } from "@reduxjs/toolkit";
import API from "../api/axiosInstance";


const API_URL = "/expenses"

export const fetchexpenses = createAsyncThunk("expenses/fetchAll",async () => {
    
    const res=await API.get(API_URL)
    return res.data
})

export const addexpense=createAsyncThunk("expenses/add",async (expense) => {
    
    const res = await API.post(API_URL,expense)
    return res.data
})

export const deleteexpense=createAsyncThunk("expenses/delete",async (id) => {
    
    await API.delete(`${API_URL}/${id}`)
    return id
})

export const updateexpense=createAsyncThunk("expenses/update",async ({id,updatedData}) => {
   
    const res=await API.put(`${API_URL}/${id}`,updatedData)
    return res.data
})


const expenseSlice=createSlice({
    name:"expenses",
    initialState:{
        items:[],
        status:"idle",
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchexpenses.pending,(state)=>{
            state.status="loading"
        })
        .addCase(fetchexpenses.fulfilled,(state,action)=>{
            state.status="succeeded"
            state.items=action.payload
        })
        .addCase(fetchexpenses.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message
    })
    .addCase(addexpense.fulfilled,(state,action)=>{
        state.items.push(action.payload)
    })
    .addCase(deleteexpense.fulfilled,(state,action)=>{
        state.items=state.items.filter((c)=>c._id !== action.payload)
    })
    .addCase(updateexpense.fulfilled,(state,action)=>{
        const index=state.items.findIndex((e)=>e._id === action.payload._id)
        if(index !== -1){
            state.items[index]=action.payload
        }
    })
    }
        
})

export default expenseSlice.reducer